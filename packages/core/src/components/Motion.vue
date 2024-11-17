<script lang="ts">
import type { CSSProperties } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitives'
import { Primitive } from '@oku-ui/primitives'
import { type SvgElementName, isSvgElementName } from './utils'
import { MotionState } from '@/state/motion-state'

</script>

<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
} from 'vue'
import type { Options } from '@/state/types'
import { usePrimitiveElement } from './usePrimitiveElement'
import { provideMotion, useAnimatePresence, useMotion } from './context'
import { createStyles, style } from '@/state/style'

export interface MotionProps extends Options {
  as?: PrimitiveProps['as'] | SvgElementName
  style?: CSSProperties
  hover?: Options['hover']
  press?: Options['press']
  inView?: Options['inView']
  inViewOptions?: Options['inViewOptions']
}

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
  initial: undefined,
  animate: undefined,
  hover: undefined,
  inView: undefined,
})

const { initial: presenceInitial } = useAnimatePresence()

const parentState = useMotion()
const state = new MotionState(
  {
    ...props,
  },
  parentState!,
)
provideMotion(state)

const { primitiveElement, currentElement } = usePrimitiveElement()
onMounted(() => {
  state.mount(currentElement.value)
  state.update({
    ...props,
    style: { ...props.style, ...createStyles(state.getTarget()) },
    initial: presenceInitial.value === false
      ? presenceInitial.value
      : (
          props.initial === true ? undefined : props.initial
        ),
  })
})

onBeforeUnmount(() => {
  const unmount = () => state.mount(currentElement.value)
  state.update({
    ...props,
    initial: presenceInitial.value === false
      ? presenceInitial.value
      : (
          props.initial === true ? undefined : props.initial
        ),
  })
  return unmount()
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
  if (!manuallyAppliedMotionStyles && currentElement.value) {
    manuallyAppliedMotionStyles = true

    const styles = createStyles(state.getTarget())
    for (const key in styles)
      style.set(currentElement.value, key, styles[key])
  }

  state.update({
    ...props,
    initial: presenceInitial.value === false
      ? presenceInitial.value
      : (
          props.initial === true ? undefined : props.initial
        ),
  })
})

function getSVGProps() {
  if (!state.isMounted() && isSvgElementName(props.as as SvgElementName))
    return state.getTarget()
}

function getStyle() {
  if (isSvgElementName(props.as as SvgElementName))
    return props.style

  return !state.isMounted()
    ? {
        ...props.style,
        ...createStyles(state.getTarget()),
      }
    : props.style
}
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :as="as"
    v-bind="getSVGProps()"
    :style="getStyle()"
  >
    <slot />
  </Primitive>
</template>
