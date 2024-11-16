import { onMounted, reactive, useId } from 'vue'
import type { AnimationPlaybackControls, DynamicAnimationOptions, ValueAnimationOptions } from 'motion/react'
import { animate as okuAnimate } from 'motion'
import { type DirectiveValue, getDefaultTransition } from '../share'
import { invariant } from '../utils/errors'

export function useAnimate(): {
  animate: (
    el?: any,
    keyframes?: DirectiveValue['keyframes'],
    options?: (index: number) => DirectiveValue['options'],
    id?: string
  ) => AnimationPlaybackControls | undefined | void
  scope: {
    el?: any
    animations: {
      [key: string]: AnimationPlaybackControls
    }
    updateElement: (el?: any) => void
  }
} {
  const scope = reactive<{
    el?: any
    animations: {
      [key: string]: AnimationPlaybackControls
    }
    updateElement: (el?: any) => void
  }>({
        animations: {},
        updateElement(el?: any) {
          scope.el = el
        },
      })

  const animate = (el?: any, keyframes?: DirectiveValue['keyframes'], options?: (index: number) => DirectiveValue['options'], id?: string) => {
    if (!el)
      return

    const data = resolveElement(el, scope.el)

    const transition = keyframes ? getDefaultTransition(Object.keys(keyframes).join(','), options as Partial<ValueAnimationOptions>) : {}

    const key = id || useId()

    if (scope.animations[key])
      scope.animations[key].complete()

    if (!data.length)
      return

    if (data.length > 0) {
      data.forEach((el, index) => {
        const animationOptions = options ? options(index) || {} : {}

        const animationParams: DynamicAnimationOptions = {
          ...transition,
          ...animationOptions,
        } as DynamicAnimationOptions

        const motion = okuAnimate(el, keyframes ?? {}, animationParams)

        scope.animations[key] = motion
      })
    }
  }

  onMounted(() => {
    if (!scope.el)
      return

    Object.values(scope.animations)?.forEach(animation => animation.stop())
  })

  return {
    animate,
    scope,
  }
}

export type ElementOrSelector =
  | Element
  | Element[]
  | NodeListOf<Element>
  | string

export interface WithQuerySelectorAll {
  querySelectorAll: Element['querySelectorAll']
}

function resolveElement(
  elements: ElementOrSelector,
  parentEl: Element,
): Element[] {
  if (typeof elements === 'string') {
    let root: WithQuerySelectorAll = document
    if (parentEl) {
      invariant(
        Boolean(parentEl),
        'Scope provided, but no element detected.',
      )
      root = parentEl as any
    }
    elements = root.querySelectorAll(elements)
  }
  else if (elements instanceof Element) {
    elements = [elements]
  }

  /**
   * Return an empty array
   */
  return Array.from(elements || [])
}
