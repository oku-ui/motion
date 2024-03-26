/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import type { Ref } from 'vue'
import { ref } from 'vue'

export interface AnimationScope<T = any> {
  readonly current: T
  animations: unknown
}

export function isSequence(value: unknown) {
  return Array.isArray(value) && Array.isArray(value[0])
}

export function isDOMKeyframes(
  keyframes: unknown,
) {
  return typeof keyframes === 'object' && !Array.isArray(keyframes)
}

export function createScopedAnimate(scope?: AnimationScope) {
  function scopedAnimate<V>(
    valueOrElementOrSequence: V,
    keyframes: V,
    options?: unknown,
  ) {
    if (isSequence(valueOrElementOrSequence))
      console.log('---is-sequence--')

    else if (isDOMKeyframes(keyframes))
      console.log('---is-dom-keyframes--')

    else
      console.log('---is-single-value---')
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
