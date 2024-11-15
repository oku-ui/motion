<script lang="ts">
export interface MotionPresenceProps {
  name?: string
  exitBeforeEnter?: boolean
  initial?: boolean
}
</script>

<script setup lang="ts">
import { provide } from 'vue'
import { presenceId } from '../share/context'
import { useAnimations } from '../composables'
import type { PresenceState } from '../share'

const props = withDefaults(defineProps<MotionPresenceProps>(), {
  initial: true,
})

const animationInstances = useAnimations()

function enter(element: any, done: VoidFunction) {
  const state = animationInstances.getByID(element.id, element)
  if (state && state.keyframes) {
    animationInstances.createAnimate(element, state.keyframes, {
      onComplete: () => {
        done && done()
      },
    })
  }
}

function exit(element: any, done: VoidFunction) {
  const state = animationInstances.getByID(element.id, element)
  if (state && state.exit) {
    animationInstances.createAnimate(element, state.exit, {
      onComplete: () => {
        done && done()
      },
    })
  }
}

const state: PresenceState = { exitBeforeEnter: props.exitBeforeEnter }

provide(presenceId, state)

</script>

<template>
  <Transition
    :css="false"
    appear
    @leave="exit"
    @enter="enter"
  >
    <slot />
  </Transition>
</template>
