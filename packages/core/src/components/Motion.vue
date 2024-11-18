<script setup lang="ts">
import { Primitive } from '@oku-ui/primitives'
import { useMotionHelper } from './helper'
import type { MotionProps } from '@/state/types'
import { usePrimitiveElement } from '@/composables/usePrimitiveElement'

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
  isDefaultTransition: false,
})

const { primitiveElement, currentElement } = usePrimitiveElement()

const { getSVGProps, getStyle } = useMotionHelper(props, currentElement)
</script>

<template>
  <Primitive
    :id="props.id"
    ref="primitiveElement"
    v-bind="getSVGProps()"
    :style="getStyle"
    :as="props.as"
  >
    <slot />
  </Primitive>
</template>
