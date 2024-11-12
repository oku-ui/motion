<script setup lang="ts">
import {
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
} from 'vue'
import { createMotionState, createStyles, style } from '@motionone/dom'

import type { PresenceState } from '../share/context'
import { contextId, presenceId } from '../share/context'
import type { MotionProps } from './types'

const props = withDefaults(defineProps<MotionProps>(), {
  tag: 'div',
})

const root = ref<Element | null>(null)
const parentState = inject(contextId, undefined)
const presenceState = inject(presenceId, undefined) as
  | PresenceState
  | undefined

const state = createMotionState(
  {
    ...props,
    initial: presenceState?.initial === false
      ? presenceState.initial
      : props.initial === true
        ? undefined
        : props.initial,
  },
  parentState,
)

function updateState() {
  state.update({
    ...props,
    initial: props.initial === true
      ? undefined
      : props.initial,
  })
}

provide(contextId, state)

onMounted(() => {
  const unmount = state.mount(root.value!)
  updateState()
  return unmount
})

let manuallyAppliedMotionStyles = false
onUpdated(() => {
  /**
   * Vue reapplies all styles every render, rather than diffing and
   * only reapplying the ones that change. This means that initially
   * calculated motion styles also get reapplied every render, leading
   * to incorrect animation origins.
   *
   * To prevent this, once an element is mounted we hand over these
   * styles to Motion. This will currently still lead to a jump if interrupting
   * transforms in browsers where the number polyfill is used.
   */
  if (!manuallyAppliedMotionStyles && root.value) {
    manuallyAppliedMotionStyles = true

    const styles = createStyles(state.getTarget())
    for (const key in styles)
      style.set(root.value, key, styles[key])
  }

  updateState()
})

const initialStyles = createStyles(state.getTarget())
</script>

<template>
  <component
    :is="tag" ref="root" :style="state.isMounted()
      ? style
      : { ...style, ...initialStyles }"
  >
    <slot />
  </component>
</template>
