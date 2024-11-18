import { invariant } from 'hey-listen'
import { visualElementStore } from 'framer-motion/dist/es/render/store.mjs'
import { createDOMVisualElement } from 'framer-motion/dist/es/animation/utils/create-visual-element.mjs'
import { isDef } from '@vueuse/core'
import type {
  AnimationPlaybackControls,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ValueKeyframesDefinition,
} from 'framer-motion'
import { animate } from 'framer-motion/dom'
import type { AnimationFactory, MotionStateContext, MountedStates, Options } from '@/state/types'
import { getOptions, hasChanged, noop, resolveVariant } from '@/state/utils'
import { FeatureManager } from '@/state/features'
import { style } from '@/state/style'
import { transformResetValue } from '@/state/transform'
import { scheduleAnimation, unscheduleAnimation } from '@/state/schedule'
import { motionEvent } from '@/state/event'

// List of state types
const STATE_TYPES = ['initial', 'animate', 'inView', 'hover', 'press', 'exit'] as const
type StateType = typeof STATE_TYPES[number]

interface MountedState {
  element: Element
  state: MotionState
  animations: AnimationPlaybackControls[]
}

export class MotionState {
  private id: string
  private element: Element | null = null
  private context: MotionStateContext = {}
  mountedStates: MountedStates

  private parent?: MotionState
  private options: Options
  private activeStates: Partial<Record<StateType, boolean>> = {
    initial: true,
    animate: true,
  }

  private depth: number

  private baseTarget!: DOMKeyframesDefinition
  private target!: DOMKeyframesDefinition
  private featureManager: FeatureManager

  constructor(options: Options, mountedStates: MountedStates, parent?: MotionState) {
    this.id = options.id || Math.random().toString(36).substring(2, 9)
    this.mountedStates = mountedStates
    if (!parent && options.initial === false)
      options.initial = 'animate'

    this.options = options
    this.parent = parent
    this.depth = parent ? parent.depth + 1 : 0
    this.initContext()
    const initialVariantSource = options.initial === false ? 'animate' : 'initial'
    this.featureManager = new FeatureManager(this)
    this.initTarget(initialVariantSource)
  }

  reset(options: Options, parent?: MotionState): void {
    this.options = options
    this.parent = parent
    this.depth = parent ? parent.depth + 1 : 0
    this.initContext()
    const initialVariantSource = options.initial === false ? 'animate' : 'initial'
    this.featureManager = new FeatureManager(this)
    this.initTarget(initialVariantSource)
  }

  private initContext(): void {
    for (const name of STATE_TYPES) {
      this.context[name] = typeof this.options[name] === 'string'
        ? this.options[name]
        : this.parent?.context[name]
    }
  }

  private initTarget(initialVariantSource: string): void {
    this.baseTarget = resolveVariant(this.options[initialVariantSource] || this.context[initialVariantSource], this.options.variants) || {}
    this.target = { ...this.baseTarget }
  }

  get initial(): string | boolean | object | undefined {
    return isDef(this.options.initial) ? this.options.initial : this.context.initial
  }

  mount(element: Element): void {
    invariant(
      Boolean(element),
      'Animation state must be mounted with valid Element',
    )
    this.element = element

    this.mountedStates.set(this.id, {
      element: this.element,
      state: this,
      animations: [],
    })
    if (!visualElementStore.get(element))
      createDOMVisualElement(element)

    const visualElement = visualElementStore.get(element)
    visualElement?.update(this.options as any, this.parent?.context as any)
    if (typeof this.initial === 'object' && this.initial !== null) {
      for (const key in this.initial)
        visualElement?.setStaticValue(key, (this.initial as Record<string, any>)[key])
    }
    else if (typeof this.initial === 'string' && this.options.variants) {
      const variant = this.options.variants[this.initial]
      for (const key in variant)
        visualElement?.setStaticValue(key, variant[key])
    }

    this.featureManager.mount()
  }

  unmount(): void {
    this.mountedStates.delete(this.id)
    unscheduleAnimation(this as any)
    visualElementStore.get(this.element)?.unmount()
    this.featureManager.unmount()
  }

  update(
    options: Options,
    parent?: MotionState,
  ): void {
    this.parent = parent
    this.options = options
    this.featureManager.update()
    scheduleAnimation(this as any)
  }

  setActive(name: StateType, isActive: boolean): void {
    if (!this.element)
      return
    this.activeStates[name] = isActive
    scheduleAnimation(this as any)
  }

  * animateUpdates(): Generator<void, void, unknown> {
    const prevTarget = this.target
    this.target = {}
    const resolvedVariants: Record<string, DOMKeyframesDefinition> = {}
    const enteringInto: Record<string, string> = {}
    const animationOptions: Record<string, DynamicAnimationOptions> = {}

    for (const name of STATE_TYPES) {
      if (!this.activeStates[name])
        continue

      const variant = resolveVariant(
        isDef(this.options[name]) ? this.options[name] : this.context[name],
        this.options.variants,
      )
      if (!variant)
        continue

      resolvedVariants[name] = variant as DOMKeyframesDefinition

      const allTarget = { ...prevTarget, ...variant }
      for (const key in allTarget) {
        if (key === 'transition')
          continue

        this.target[key as keyof typeof this.target] = variant[key as keyof typeof variant]

        animationOptions[key] = getOptions(
          (variant as any)?.transition ?? this.options.transition ?? {},
          key,
        )

        enteringInto[key] = name
      }
    }

    const allTargetKeys = new Set([
      ...Object.keys(this.target),
      ...Object.keys(prevTarget),
    ])

    const animationFactories: AnimationFactory[] = []
    allTargetKeys.forEach((key) => {
      if (this.target[key as keyof typeof this.target] === undefined)
        this.target[key as keyof typeof this.target] = this.baseTarget[key as keyof typeof this.baseTarget] as ValueKeyframesDefinition

      if (hasChanged(prevTarget[key as keyof typeof prevTarget], this.target[key as keyof typeof this.target])) {
        if (this.element)
          this.baseTarget[key as keyof typeof this.baseTarget] ??= style.get(this.element, key) as string

        animationFactories.push(
          () => {
            return animate(
              this.element!,
              {
                [key]: this.target[key as keyof typeof this.target] === 'none'
                  ? transformResetValue[key as keyof typeof transformResetValue]
                  : this.target[key as keyof typeof this.target],
              },
              (animationOptions[key] || {}) as any,
            )
          },
        )
      }
    })

    yield

    const animations = animationFactories
      .map(factory => factory())
      .filter((animation): animation is AnimationPlaybackControls => animation !== undefined)

    if (!animations.length)
      return

    this.mountedStates.set(this.id, {
      ...this.mountedStates.get(this.id),
      animations,
    } as MountedState)

    const animationTarget = this.target
    this.element?.dispatchEvent(motionEvent('motionstart', animationTarget))
    const isExit = this.activeStates.exit
    Promise.all(animations)
      .then(() => {
        this.element?.dispatchEvent(motionEvent('motioncomplete', {
          ...animationTarget,
        }, isExit))
      })
      .catch(noop)
  }

  isMounted(): boolean {
    return Boolean(this.element)
  }

  getDepth(): number {
    return this.depth
  }

  getOptions(): Options {
    return this.options
  }

  getElement(): Element | null {
    return this.element
  }

  getTarget(): DOMKeyframesDefinition {
    return this.target
  }

  getAnimationControls(): AnimationPlaybackControls[] | undefined {
    return this.mountedStates.get(this.id)?.animations
  }
}
