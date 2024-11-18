<script setup lang="ts">
import { ref } from 'vue'
import { AnimatePresence, Motion } from '../../../index.ts'

const show = ref(true)

</script>

<template>
  <button @click="show = !show">
    Toggle
  </button>
  <div>
    <p>
      wait-exit = false With Presence Component
    </p>
    <div class="w-1/3">
      <AnimatePresence>
        <Motion
          v-show="show"
          class="bg-blue-500  aspect-square rounded-2xl"
          :initial="{ scale: 0 }"
          :animate="{ rotate: 180, scale: 1 }"
          :exit="{ rotate: 0, scale: 0 }"
          :transition="{
            duration: 20,
          }"
        />
      </AnimatePresence>
      <button @click="show = !show">
        {{ show ? 'hide' : 'show' }}
      </button>
    </div>
  </div>

  <div>
    <p>
      wait-exit = true
      <Motion
        v-show="show"
        :initial="{ opacity: 0, scale: 0 }"
        :transition="{ opacity: {
                         delay: 0.5,
                       },
                       scale: {
                         delay: 0.5,

                       } }"
        :exit="{ opacity: 0.5, scale: 0.6 }"
        :options="{
          scale: {
            type: 'spring',
          },
        }"
        class="bg-red-500 w-20 h-20"
      />
    </p>
  </div>
</template>
