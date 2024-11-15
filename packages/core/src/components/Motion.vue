<script lang="ts">
import type { DOMKeyframesDefinition, DynamicAnimationOptions, ObjectTarget } from 'motion/react'
import { presenceId } from '../share'

export interface MotionProps {
  as?: string
  keyframes?: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
  initial?: DOMKeyframesDefinition | ObjectTarget<any>
  exit?: DOMKeyframesDefinition | ObjectTarget<any>
  waitExit?: boolean
  id?: string
}
</script>

<script setup lang="ts">
import {
  inject,
  onMounted,
  ref,
  useAttrs,
  useId,
} from 'vue'

defineOptions({
  name: 'Motion',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
  waitExit: false,
})
const data = inject(presenceId)

const attrs = useAttrs()
const isClient = ref(false)
const id = props.id || useId()

// function setElRef(el: HTMLElement | null) {
//   if (el)
//     mergeStyles(el, props.initial)
//   elRef.value = el
// }

onMounted(async () => {
  if (typeof window === 'undefined') {
    isClient.value = false
    return
  }

  isClient.value = true
})

</script>

<template>
  <component
    :is="as"
    :id="id"
    :key="id"
    v-animate="{
      keyframes: props.keyframes,
      options: props.options,
      initial: props.initial,
      exit: props.exit,
      exitBeforeEnter: data?.exitBeforeEnter,
    }"
    v-bind="attrs"
  >
    <slot />
  </component>
</template>
