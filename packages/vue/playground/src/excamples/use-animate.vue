<!-- eslint-disable no-console -->
<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAnimate } from '../../../src/index'

const containerRef = ref()

onMounted(() => {
  const [scope, animate] = useAnimate(containerRef)
  console.log(scope)
})

function play() {
  // useAnimate()
}
</script>

<template>
  <div ref="containerRef" class="container">
    <div class="box" :style="{ width: '50px', height: '50px', background: 'blue' }" />
    <p>reverse</p>
    <button @click="play()">
      play
    </button>
  </div>
</template>
