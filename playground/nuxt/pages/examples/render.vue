<script lang="ts" setup>
import { Motion } from '@oku-ui/motion'

</script>

<template>
  <div>
    <Motion
      :initial="{ opacity: 0.6 }"
      :animate="{ opacity: 1 }"
      :style="{
        width: '200px',
        backgroundColor: '#000',
        height: '200px',
      }"
    />
  </div>
</template>
