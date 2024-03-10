<script setup lang="ts">
import { Pane } from 'tweakpane'

const paneRef = ref<HTMLElement>()
const rotate = ref(10)
onMounted(() => {
  const pane = new Pane({
    container: paneRef.value,
  })
  const PARAMS = {
    speed: 100,
  }
  pane.addBinding(PARAMS, 'speed').on('change', (ev) => {
    console.warn(ev.value)
    rotate.value = ev.value
  })
})
</script>

<template>
  <div>
    <Motion
      class="box-test"
      :animate="{
        rotate: `${rotate}deg`,
        backgroundColor: 'var(--yellow)',
      }"
      :transition="{
        duration: 0.1,
        rotate: { duration: 0.2 },
      }"
    />
    <div ref="paneRef" class="pane" />
  </div>
</template>

<style>
:root {
  --yellow: #000
}

.box-test {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
