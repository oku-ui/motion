<script lang="ts">

import type { AnimationPlaybackControls, DOMKeyframesDefinition, DynamicAnimationOptions, ObjectTarget, ValueAnimationOptions } from 'motion/react'

/**
 * Generate a list of every possible transform key.
 */
export const transformPropOrder = [
  'transformPerspective',
  'x',
  'y',
  'z',
  'translateX',
  'translateY',
  'translateZ',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'skew',
  'skewX',
  'skewY',
]

/**
 * A quick lookup for transform props.
 */
export const transformProps = new Set(transformPropOrder)

const underDampedSpring: Partial<ValueAnimationOptions> = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restSpeed: 10,
}

function criticallyDampedSpring(target: unknown): Partial<ValueAnimationOptions> {
  return {
    type: 'spring',
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }
}

const keyframesTransition: Partial<ValueAnimationOptions> = {
  type: 'keyframes',
  duration: 0.8,
}

/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */
const ease: Partial<ValueAnimationOptions> = {
  type: 'keyframes',
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3,
}

function getDefaultTransition(
  valueKey: string,
  value?: Partial<ValueAnimationOptions>,
): Partial<ValueAnimationOptions> {
  if (value?.keyframes && value?.keyframes?.length > 2) {
    return keyframesTransition
  }
  else if (transformProps.has(valueKey)) {
    return valueKey.startsWith('scale')
      ? (value?.keyframes && value?.keyframes.length) ? criticallyDampedSpring(value?.keyframes[1]) : underDampedSpring
      : underDampedSpring
  }

  return ease
}

export interface MotionProps {
  as?: string
  transition?: DynamicAnimationOptions
  animate?: DOMKeyframesDefinition | ObjectTarget<any>
  initial?: DOMKeyframesDefinition | ObjectTarget<any>
  inView?: DOMKeyframesDefinition | ObjectTarget<any>
  exit?: DOMKeyframesDefinition | ObjectTarget<any>
  waitExit?: boolean
}
</script>

<script setup lang="ts">
import { animate } from 'motion'
import {
  defineOptions,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useId,
  watch,
  withDefaults,
} from 'vue'
import { generateHTMLStyles } from '../share/build'

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
const id = useId()

let animationInstance: AnimationPlaybackControls | null = null

function setElRef(el: HTMLElement | null) {
  if (el)
    mergeStyles(el, props.initial)
  elRef.value = el
}

const defaultTransition = ref({})
onMounted(async () => {
  if (typeof window === 'undefined') {
    isClient.value = false
    return
  }

  isClient.value = true
  for (const key in props.animate) {
    const value = getDefaultTransition(key, props.transition as ValueAnimationOptions | undefined)
    defaultTransition.value = {
      ...value,
      ...props.transition,
    }
  }
})

watch(
  () => props.animate,
  () => {
    requestAnimationFrame(() => {
      if (animationInstance)
        animationInstance.complete()

      if (elRef.value && props.animate)
        animationInstance = animate(elRef.value, props.animate, defaultTransition.value)
    })
  },
  { deep: true },
)

function mergeStyles(el: HTMLElement, newStyles: any) {
  if (!el || !newStyles)
    return

  const style = {} as any
  generateHTMLStyles(newStyles, { style })

  el.style.cssText = Object.keys(style)
    .map(key => `${key}: ${style[key]}`)
    .join(';')
}

function beforeEnter(el: any) {
  setElRef(el)
}

function onLeave(_el: any, _done: any) {
  if (animationInstance)
    animationInstance.stop()

  setTimeout(() => {
    if (elRef.value && props.exit)
      animationInstance = animate(elRef.value, props.exit, defaultTransition.value)

    animationInstance?.then(() => {
      if (props.waitExit)
        _done && _done()
    })
  }, 10)
}

function onEnter(_el: any, done: any) {
  nextTick(() => {
    setTimeout(() => {
      if (elRef.value && props.animate)
        animationInstance = animate(elRef.value, props.animate, defaultTransition.value)

      animationInstance?.then(() => {
        done()
      })
    }, 10)
  })
}

onBeforeUnmount(() => {
  animationInstance?.stop()
})
</script>

<template>
  <Transition
    :css="false"
    appear
    @leave="onLeave"
    @enter="onEnter"
    @before-enter="beforeEnter"
  >
    <component
      :is="as"
      :key="id"
      v-bind="attrs"
    >
      <slot />
    </component>
  </Transition>
</template>
