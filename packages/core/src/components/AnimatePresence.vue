<script setup lang="ts">
import { Transition, TransitionGroup, toRefs } from 'vue'

import { doneCallbacks, removeDoneCallback } from '@/components/presence'
import { provideAnimatePresence } from '@/share/context'
import type { AnimatePresenceProps } from '@/types/index.ts'
import { mountedStates } from '@/state'

defineOptions({
  name: 'AnimatePresence',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AnimatePresenceProps>(), {
  mode: 'sync',
  initial: true,
  multiple: false,
})

const { initial } = toRefs(props)

provideAnimatePresence({
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
    appear
    @enter="enter"
    @leave="exit"
  >
    <slot />
  </component>
</template>
