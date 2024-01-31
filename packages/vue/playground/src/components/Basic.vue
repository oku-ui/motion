<script setup lang="ts">
import { Motion } from '@oku-ui/motion'
</script>

<template>
  <Motion
    class="box"
    :animate="{
      x: 50,
      backgroundColor: '#000',
      boxShadow: '10px 10px 0 rgba(0, 2, 0, 0.2)',
      position: 'fixed',
      y: 50,
    }"
  />
</template>

<style scoped>
  .box{
    width: 300px;
    height: 300px;
  }
</style>
