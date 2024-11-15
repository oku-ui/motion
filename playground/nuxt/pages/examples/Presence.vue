<script lang="ts" setup>
import { reactive } from 'vue'
import { Motion, Presence } from '@oku-ui/motion'

const state = reactive({ isSelected: true })
const toggle = () => (state.isSelected = !state.isSelected)
</script>

<template>
  <div>
    <button @click="toggle">
      Toggle
    </button>
    <Presence>
      <Motion
        v-show="state.isSelected"
        :initial="{ opacity: 0 }"
        :keyframes="{
          opacity: 1,
          x: 100,
          transition: { duration: 1 },
        }"
        :exit="{ opacity: 0, x: 0 }"
        :transition="{ duration: 1 }"
        style="width: 200px; background-color: red; height: 200px"
      />
    </Presence>
  </div>
</template>
