<script setup lang="ts">
import { Application } from '@splinetool/runtime'
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('logo')
  const app = new Application(canvas)
  app.load('https://prod.spline.design/xnZjafuaOrjFtT0C/scene.splinecode')
})
</script>

<template>
  <canvas id="logo" />
</template>
