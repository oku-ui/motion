<script lang="ts" setup>
import { reactive } from 'vue'
import { Motion } from '@oku-ui/motion'

const state = reactive({ isSelected: false })
const onClick = () => (state.isSelected = !state.isSelected)
</script>

<template>
  <Motion
    :initial="{ opacity: 0.6 }"
    :keyframes="{
      opacity: state.isSelected ? 1 : 0.1,
      x: state.isSelected ? 0 : 50,
      transition: { duration: 1 },
    }"
    :transition="{ duration: 1 }"
    style="width: 200px; background-color: red; height: 200px"
    @click="onClick"
  />
</template>
