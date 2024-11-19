import { reactive, useId } from 'vue'
import type { AnimationPlaybackControls } from 'motion/react'
import { useMotionHelper } from '@/components/helper'
import type { MotionProps } from '@/state/types'
import { invariant } from '@/utils/errors'

export function useAnimate() {
  const scope = reactive<{
    el?: any
    animations: {
      [key: string]: AnimationPlaybackControls[]
    }
    registerElement: (el?: any) => void
  }>({
        animations: {},
        registerElement(el?: any) {
          scope.el = el
        },
      })

  const animate = (
    el: any,
    props: Omit<MotionProps, 'as' | 'transition'> & {
      transition?: ((index: number) => MotionProps['transition']) | MotionProps['transition']
    },
  ) => {
    if (!el)
      return

    const data = resolveElement(el, scope.el)

    const key = props.id ?? useId()

    if (!data.length)
      return

    if (data.length > 0) {
      data.forEach((el, index) => {
        const transition = props.transition
          ? typeof props.transition === 'function'
            ? props.transition(index)
            : props.transition
          : {}

        if (!el?.tagName) {
          console.warn('Element not found')
          return
        }

        const { state, getSVGProps, getStyle } = useMotionHelper({
          ...props,
          transition,
          as: el.tagName,
        }, el, false)

        const svgProps = getSVGProps()
        const style = getStyle()

        if (svgProps) {
          Object.entries(svgProps).forEach(([key, value]) => {
            el.setAttribute(key, value as string)
          })
        }

        if (style)
          Object.assign((el as HTMLElement).style, style)

        const motion = state.getAnimationControls()
        scope.animations[key] = motion as any[]
      })
    }
  }

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
