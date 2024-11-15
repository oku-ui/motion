<script lang="ts">
// const doneCallbacks = new WeakMap<Element, VoidFunction>()

// function removeDoneCallback(element: Element) {
//   const prevDoneCallback = doneCallbacks.get(element)
//   prevDoneCallback
//   && element.removeEventListener('motioncomplete', prevDoneCallback)
//   doneCallbacks.delete(element)
// }

export interface MotionPresenceProps {
  name?: string
  exitBeforeEnter?: boolean
  initial?: boolean
}
</script>

<script setup lang="ts">
import { onBeforeUpdate, provide } from 'vue'

// import { mountedStates } from '@motionone/dom'
import type { PresenceState } from '../share/context'
import { presenceId } from '../share/context'
import { useAnimations } from '../composables'

const props = withDefaults(defineProps<MotionPresenceProps>(), {
  initial: true,
})

const animationInstances = useAnimations()

function enter(element: any) {
  // eslint-disable-next-line no-console
  console.log('enter', element)
  // eslint-disable-next-line no-console
  console.log('state', animationInstances.getByID(element.id))
}

function exit(element: Element, done: VoidFunction) {

}

const state: PresenceState = { initial: props.initial }

provide(presenceId, state)

onBeforeUpdate(() => {
  state.initial = undefined
})
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
