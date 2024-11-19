<script setup lang="ts">
import type { DOMKeyframesDefinition } from 'framer-motion'
import { MotionPresence, Motion } from '@oku-ui/motion'
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <div class="w-1/3 items-center justify-center flex flex-col">
    <MotionPresence>
      <Motion
        v-show="show"
        class="bg-white  aspect-square rounded-2xl w-40 h-40"
        :initial="{ scale: 0 }"
        :animate="{ rotate: 180, scale: 1 }"
        :exit="{ rotate: 0, scale: 0 }"
        :transition="{
          type: 'spring',
          damping: 20,
          duration: 20,
        }"
      />
    </MotionPresence>
    <button @click="show = !show"
      class="bg-white  aspect-square rounded-xl p-2 mt-10"
    >
      {{ show ? 'hide' : 'show' }}
    </button>
  </div>
</template>
