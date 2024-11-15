<script setup lang="ts">
import { Motion } from '../../index.ts'
</script>

<template>
  <Motion
    class="box"
    :keyframes="{
      x: 10,
      backgroundColor: '#000',
      boxShadow: '10px 10px 0 rgba(0, 2, 0, 0.2)',
      position: 'fixed',
      // transitionEnd: { display: 'none' },
    }"
  />

  <Motion
    tag="ul"
    :initial="{
      '--rotate': '0deg',
    }"
    :keyframes="{
      '--rotate': '360deg',
    }"
    :options="{
      duration: 2,
      repeat: Infinity,
    }"
  >
    <li class="box2" :style="{ transform: 'rotate(var(--rotate))' }" />
  </Motion>
</template>

<style scoped>
  .box{
    width: 300px;
    height: 300px;
  }

  .box2 {
  background: #fff;
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
</style>
