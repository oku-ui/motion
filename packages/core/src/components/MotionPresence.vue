<script setup lang="ts">
import { Transition, TransitionGroup, toRefs } from 'vue'

import { doneCallbacks, removeDoneCallback } from '@/components/presence.ts'
import { provideMotionPresence } from '@/share/context.ts'
import type { MotionPresenceProps } from '@/types/index.ts'
import { mountedStates } from '@/state'

defineOptions({
  name: 'MotionPresence',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MotionPresenceProps>(), {
  mode: 'sync',
  initial: true,
  multiple: false,
})

const { initial } = toRefs(props)

provideMotionPresence({
  initial,
})

function enter(el: Element) {
  const state = mountedStates.get(el)
  if (!state)
    return

  removeDoneCallback(el)
  state.state.setActive('exit', false)
}

function exit(el: Element, done: VoidFunction) {
  const state = mountedStates.get(el)
  if (!state)
    return done()

  state.state.setActive('exit', true)
  removeDoneCallback(el)
  function doneCallback(e?: any) {
    if (e?.detail?.isExit)
      done()
  }
  doneCallbacks.set(el, doneCallback)
  el.addEventListener('motioncomplete', doneCallback)
}
</script>

<template>
  <component
    :is="multiple ? TransitionGroup : Transition"
    :tag="multiple ? as : undefined"
    :css="false"
    :mode="mode === 'wait' ? 'out-in' : undefined"
    v-bind="$attrs"
    @enter="enter"
    @leave="exit"
  >
    <slot />
  </component>
</template>
