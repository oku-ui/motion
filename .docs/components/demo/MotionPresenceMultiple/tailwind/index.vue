<script setup lang="ts">
import { Motion, MotionPresence } from '@oku-ui/motion'
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <div class="size-52 items-center justify-center flex flex-col">
    <div class="size-52 flex gap-4 items-center justify-center">
      <MotionPresence multiple>
        <Motion
          v-show="show"
          key="1"
          class="bg-white size-20  aspect-square rounded-2xl flex-1"
          :initial="{ scale: 0 }"
          :animate="{ rotate: 180, scale: 1 }"
          :exit="{ rotate: 0, scale: 0 }"
          :transition="{
            type: 'spring',
            damping: 20,
            duration: 30,
          }"
        />
        <Motion
          v-show="show"
          key="2"
          class="bg-white size-20 aspect-square rounded-2xl flex-1"
          :initial="{ scale: 0 }"
          :animate="{ rotate: 180, scale: 1 }"
          :exit="{ rotate: 0, scale: 0 }"
          :transition="{
            type: 'spring',
            damping: 20,
            duration: 30,
          }"
        />
      </MotionPresence>
    </div>
    <button
      class="bg-white  aspect-square rounded-xl p-2 mt-10"
      @click="show = !show"
    >
      {{ show ? 'hide' : 'show' }}
    </button>
  </div>
</template>
