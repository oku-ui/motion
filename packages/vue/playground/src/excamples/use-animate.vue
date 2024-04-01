<!-- eslint-disable no-console -->
<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAnimate } from '../../../src/index'

const containerRef = ref()
const animateCopy = ref()

// TODO: need to optmize
onMounted(() => {
  const [scope, animate] = useAnimate(containerRef)
  animateCopy.value = animate
  console.log(scope)
})

function play() {
  animateCopy.value('.four', { x: 90 }, { duration: 2 })
}
</script>

<template>
  <div ref="containerRef" class="container">
    <div class="box four" :style="{ width: '50px', height: '50px', background: 'blue' }" />
    <p>reverse</p>
    <button @click="play()">
      play
    </button>
  </div>
</template>
