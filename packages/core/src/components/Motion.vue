<script lang="ts">
import type { DOMKeyframesDefinition, DynamicAnimationOptions, ObjectTarget } from 'motion/react'

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
  onMounted,
  ref,
  useAttrs,
  useId,
} from 'vue'
import { mergeStyles } from '../share'

defineOptions({
  name: 'Motion',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
  waitExit: false,
})

const attrs = useAttrs()
const elRef = ref<HTMLElement | null>(null)
const isClient = ref(false)
const id = props.id || useId()

function setElRef(el: HTMLElement | null) {
  if (el)
    mergeStyles(el, props.initial)
  elRef.value = el
}

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
    :ref="setElRef"
    :key="id"
    v-animate="{
      keyframes: props.keyframes,
      options: props.options,
      initial: props.initial,
    }"
    v-bind="attrs"
  >
    <slot />
  </component>
</template>
