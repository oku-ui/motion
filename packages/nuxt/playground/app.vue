<script setup lang="ts">
import { Motion } from '@oku-ui/motion'

const rotate = ref(10)
</script>

<template>
  <Motion
    :animate="{
      rotate: `${rotate}deg`,
      backgroundColor: 'var(--yellow)' }"
    :transition="{
      duration: 1,
      rotate: { duration: 2 },
    }"
  />

  <div
    :style="{
      marginTop: '50px',
    }"
  >
    <button @click="rotate += 20">
      Rotate
    </button>
  </div>

  <Motion
    :initial="{ opacity: 0, x: -50 }"
    :in-view="{
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        easing: [0.17, 0.55, 0.55, 1],
        duration: 0.9,
      },
    }"
  >
    <p>
      Lorem Ipsum
    </p>
  </Motion>
</template>

<style>
body {
  padding: 100px;
}
:root {
  --yellow: #000
}

div {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
