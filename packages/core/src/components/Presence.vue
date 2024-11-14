<script lang="ts">
const doneCallbacks = new WeakMap<Element, VoidFunction>()

function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element)
  prevDoneCallback
  && element.removeEventListener('motioncomplete', prevDoneCallback)
  doneCallbacks.delete(element)
}

export interface MotionPresenceProps {
  name?: string
  exitBeforeEnter?: boolean
  initial?: boolean
}
</script>

<script setup lang="ts">
import { onBeforeUpdate, provide } from 'vue'
import { mountedStates } from '@motionone/dom'
import type { PresenceState } from '../share/context'
import { presenceId } from '../share/context'

const props = withDefaults(defineProps<MotionPresenceProps>(), {
  initial: true,
  exitBeforeEnter: false,
})

function enter(element: Element) {
  const state = mountedStates.get(element)

  if (!state)
    return

  removeDoneCallback(element)
  state.setActive('exit', false)
}
function exit(element: Element, done: VoidFunction) {
  const state = mountedStates.get(element)

  if (!state)
    return done()

  state.setActive('exit', true)

  removeDoneCallback(element)
  doneCallbacks.set(element, done)
  element.addEventListener('motioncomplete', done)
}

const state: PresenceState = { initial: props.initial }

provide(presenceId, state)

onBeforeUpdate(() => {
  state.initial = undefined
})
</script>

<template>
  <Transition
    :name="name"
    :css="false"
    :mode="exitBeforeEnter ? 'out-in' : undefined" @leave="exit" @enter="enter"
  >
    <slot />
  </Transition>
</template>
