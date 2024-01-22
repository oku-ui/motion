<script setup lang="ts">
import {
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
} from 'vue'
import { createMotionState, createStyles, style } from '@motionone/dom'
import type {
  AnimationOptionsWithOverrides,
  InViewOptions,
  VariantDefinition,
  Variants,
} from '@motionone/dom'
import type { PresenceState } from '../context'
import { contextId, presenceId } from '../context'

interface MotionProps {
  tag?: string
  initial?: VariantDefinition | boolean
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  exit?: VariantDefinition
  variants?: Variants
  inViewOptions?: InViewOptions
  transition?: AnimationOptionsWithOverrides
}

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

provide(contextId, state)

onMounted(() => {
  const unmount = state.mount(root.value!)

  state.update({
    ...props,
    initial: props.initial === true
      ? undefined
      : props.initial,
  })

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

  state.update({
    ...props,
    initial: props.initial === true
      ? undefined
      : props.initial,
  })
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
