<script setup lang="ts">
import { provide } from 'vue'
import { presenceId } from '../share/context'
import { useAnimations } from '../composables'
import type { PresenceState, PresenceStateVue } from '../share'

const props = withDefaults(defineProps<PresenceStateVue>(), {
})

const animationInstances = useAnimations()

function enter(element: any, done: VoidFunction) {
  const state = animationInstances.getByID(element.id, element)
  if (state && state.keyframes) {
    if (typeof state.keyframes === 'function') {
      animationInstances.createAnimate(element, state.keyframes(element.dataset.index), {
        onComplete: () => {
          done && done()
        },
      })
    }
    else {
      animationInstances.createAnimate(element, state.keyframes, {
        onComplete: () => {
          done && done()
        },
      })
    }
  }
}

function exit(element: any, done: VoidFunction) {
  const state = animationInstances.getByID(element.id, element)
  if (state && state.exit) {
    if (typeof state.exit === 'function') {
      animationInstances.createAnimate(element, state.exit(element.dataset.index), {
        onComplete: () => {
          done && done()
        },
      })
    }
    else {
      animationInstances.createAnimate(element, state.exit, {
        onComplete: () => {
          done && done()
        },
      })
    }
  }
}

const state: PresenceState = { waitExit: props.waitExit }

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
