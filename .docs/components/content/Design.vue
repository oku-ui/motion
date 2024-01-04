<script setup lang="ts">
import { Pane } from 'tweakpane'

const paneRef = ref<HTMLElement>()
const rotate = ref(10)
onMounted(() => {
  const pane = new Pane({
    container: paneRef.value,
  })
  const PARAMS = {
    speed: 0.5,
  }
  pane.addBinding(PARAMS, 'speed').on('change', (ev) => {
    console.warn(ev.value)
    rotate.value = ev.value
  })
})
</script>

<template>
  <div>
    <UndefinedMotion
      :animate="{
        rotate: `${rotate}deg`,
        backgroundColor: 'var(--yellow)',
      }"
      :transition="{
        duration: 1,
        rotate: { duration: 2 },
      }"
    />
    <div ref="paneRef" class="pane" />
  </div>
</template>

<style>
.tp-dfwv {
  position: fixed !important;
}
</style>
