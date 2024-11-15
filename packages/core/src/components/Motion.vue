<script lang="ts">
import { type MotionPropsVue, presenceId } from '../share'

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

const props = withDefaults(defineProps<MotionPropsVue>(), {
  as: 'div',
  waitExit: false,
})
const data = inject(presenceId)

const attrs = useAttrs()
const isClient = ref(false)
const id = props.id || useId()

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
      waitExit: data?.waitExit,
      index: props.index,
    }"
    :data-index="props.index"
    v-bind="attrs"
  >
    <slot />
  </component>
</template>
