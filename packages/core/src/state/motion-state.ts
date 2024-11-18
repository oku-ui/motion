import { invariant } from 'hey-listen'
import { visualElementStore } from 'framer-motion/dist/es/render/store.mjs'
import { createDOMVisualElement } from 'framer-motion/dist/es/animation/utils/create-visual-element.mjs'
import { isDef } from '@vueuse/core'
import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'framer-motion'
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

  private baseTarget: DOMKeyframesDefinition

  private target: DOMKeyframesDefinition
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
    // Initialize baseTarget and target
    this.initTarget(initialVariantSource)
  }

  reset(options: Options, parent?: MotionState) {
    this.options = options
    this.parent = parent
    this.depth = parent ? parent.depth + 1 : 0
    this.initContext()
    const initialVariantSource = options.initial === false ? 'animate' : 'initial'
    this.featureManager = new FeatureManager(this)
    // Initialize baseTarget and target
    this.initTarget(initialVariantSource)
  }

  private initContext() {
    for (const name of STATE_TYPES) {
      // Set context for each state type
      // If the corresponding state type in options is a string, use it directly
      // Otherwise, try to get the corresponding state type value from the parent context
      this.context[name as keyof typeof this.context]
        = typeof this.options[name] === 'string'
          ? this.options[name]
          : this.parent?.context[name]
    }
  }

  private initTarget(initialVariantSource: string) {
    this.baseTarget = resolveVariant(this.options[initialVariantSource] || this.context[initialVariantSource], this.options.variants) || {}
    this.target = { ...this.baseTarget }
  }

  get initial() {
    return isDef(this.options.initial) ? this.options.initial : this.context.initial
  }

  mount(element: Element) {
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
    if (typeof this.initial === 'object') {
      for (const key in this.initial)
        visualElement?.setStaticValue(key, this.initial[key])
    }
    else if (typeof this.initial === 'string' && this.options.variants) {
      for (const key in this.options.variants[this.initial])
        visualElement?.setStaticValue(key, this.options.variants[this.initial][key])
    }

    // Mount features
    this.featureManager.mount()
  }

  unmount() {
    this.mountedStates.delete(this.id)
    unscheduleAnimation(this as any)
    visualElementStore.get(this.element)?.unmount()
    // Unmount features
    this.featureManager.unmount()
  }

  update(
    options: Options,
    parent?: MotionState,
  ) {
    this.parent = parent
    this.options = options
    // Update features
    this.featureManager.update()
    // Update animation
    scheduleAnimation(this as any)
  }

  setActive(name: StateType, isActive: boolean) {
    if (!this.element)
      return
    this.activeStates[name] = isActive
    scheduleAnimation(this as any)
  }

  * animateUpdates() {
    const prevTarget = this.target
    this.target = {}
    const resolvedVariants: { [key: string]: DOMKeyframesDefinition } = {}
    const enteringInto: { [key: string]: string } = {}
    const animationOptions: { [key: string]: DynamicAnimationOptions } = {}

    for (const name of STATE_TYPES) {
      if (!this.activeStates[name])
        continue

      const variant = resolveVariant(
        isDef(this.options[name]) ? this.options[name] : this.context[name],
        this.options.variants,
      )
      if (!variant)
        continue

      resolvedVariants[name] = variant

      const allTarget = { ...prevTarget, ...variant }
      for (const key in allTarget) {
        if (key === 'transition')
          continue

        this.target[key] = variant[key]

        animationOptions[key] = getOptions(
          variant.transition ?? this.options.transition ?? {},
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
    allTargetKeys.forEach((key: any) => {
      if (this.target[key] === undefined)
        this.target[key] = this.baseTarget[key]

      if (hasChanged(prevTarget[key], this.target[key])) {
        this.baseTarget[key] ??= style.get(this.element, key) as string
        animationFactories.push(
          () => {
            return animate(
              this.element,
              {
                [key]: this.target[key] === 'none' ? transformResetValue[key] : this.target[key],
              },
              (animationOptions[key] || {}) as any,
            )
          },
        )
      }
    })

    // Wait for all animation states to read from the DOM
    yield

    const animations = animationFactories
      .map(factory => factory())
      .filter(Boolean)

    if (!animations.length)
      return

    this.mountedStates.set(this.id, {
      ...this.mountedStates.get(this.id),
      animations,
    })

    const animationTarget = this.target
    this.element.dispatchEvent(motionEvent('motionstart', animationTarget))
    const isExit = this.activeStates.exit
    Promise.all(animations)
      .then(() => {
        this.element.dispatchEvent(motionEvent('motioncomplete', {
          ...animationTarget,
        }, isExit))
      })
      .catch(noop)
  }

  isMounted() {
    return Boolean(this.element)
  }

  getDepth() {
    return this.depth
  }

  getOptions() {
    return this.options
  }

  getElement() {
    return this.element
  }

  getTarget() {
    return this.target
  }

  getAnimationControls() {
    return this.mountedStates.get(this.id)?.animations
  }
}
