<script setup lang="ts">
import { Motion } from '../index.ts'
</script>

<template>
  <Motion
    class="box"
    :animate="{
      x: 10,
      backgroundColor: '#000',
      boxShadow: '10px 10px 0 rgba(0, 2, 0, 0.2)',
      position: 'fixed',
      // transitionEnd: { display: 'none' },
    }"
  />
</template>

<style scoped>
  .box{
    width: 300px;
    height: 300px;
  }
</style>
