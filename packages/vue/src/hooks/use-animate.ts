/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import type { ElementOrSelector } from '@motionone/dom'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { invariant } from '../utils/errors'

export interface AnimationScope<T = any> {
  readonly current: T
  animations: unknown
}

export interface WithQuerySelectorAll {
  querySelectorAll: Element['querySelectorAll']
}

export function isSequence(value: unknown) {
  return Array.isArray(value) && Array.isArray(value[0])
}

export function isDOMKeyframes(
  keyframes: unknown,
) {
  return typeof keyframes === 'object' && !Array.isArray(keyframes)
}

export function resolveElements(
  elements: ElementOrSelector,
  scope?: AnimationScope,
): Element[] {
  if (typeof elements === 'string') {
    let root: WithQuerySelectorAll = document

    if (scope) {
      invariant(
        Boolean(scope.current),
        'Scope provided, but no element detected.',
      )
      root = scope.current
    }

    elements = root.querySelectorAll(elements)
  }
  else if (elements instanceof Element) {
    elements = [elements]
  }

  return Array.from(elements || [])
}

export function animateElements(
  elementOrSelector: ElementOrSelector,
  keyframes: unknown,
  options?: unknown,
  scope?: AnimationScope,
) {
  const elements = resolveElements(elementOrSelector, scope)
  const numElements = elements.length

  invariant(Boolean(numElements), 'No valid element provided.')

  const animations = []
  // TODO: 实现animations logic
  console.log(elements)
}

export function createScopedAnimate(scope?: AnimationScope) {
  function scopedAnimate<V>(
    valueOrElementOrSequence: V,
    keyframes: V,
    options?: unknown,
  ) {
    let animation
    if (isSequence(valueOrElementOrSequence)) {
      console.log('---is-sequence--')
    }

    else if (isDOMKeyframes(keyframes)) {
      animation = animateElements(
        valueOrElementOrSequence as ElementOrSelector,
        keyframes,
        options as DynamicsCompressorOptions | undefined,
        scope,
      )
    }

    else { console.log('---is-single-value---') }
  }

  return scopedAnimate
}

export function useAnimate(containerRef: Ref<any>) {
  console.log('---useAnimate---')
  const scope: AnimationScope = {
    current: containerRef.value,
    animations: [],
  }
  const animate = createScopedAnimate(scope)

  return [scope, animate]
}
