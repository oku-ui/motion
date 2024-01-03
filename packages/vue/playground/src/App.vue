<script setup lang="ts">
import { Motion } from '@oku-ui/motion'
</script>

<template>
  <Motion
    :animate="{ rotate: 1000, backgroundColor: 'var(--yellow)' }"
    :transition="{
      duration: 1,
      rotate: { duration: 2 },
    }"
  />
</template>

<style>
:root {
  --yellow: #000
}

div {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
