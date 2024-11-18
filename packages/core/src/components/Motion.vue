<script setup lang="ts">
import { Primitive } from '@oku-ui/primitives'
import { useMotionHelper } from './helper'
import type { MotionProps } from '@/state/types'
import { useTemplateEl } from '@/composables/useTemplateEl'
import { shallowRef } from 'vue'

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
  isDefaultTransition: false,
})

const elRef = shallowRef<Element>()
const templateRef = useTemplateEl(elRef)

const { getSVGProps, getStyle } = useMotionHelper(props, elRef)
</script>

<template>
  <Primitive
    :id="props.id"
    :ref="templateRef"
    v-bind="getSVGProps()"
    :style="getStyle"
    :as="props.as as any"
  >
    <slot />
  </Primitive>
</template>
