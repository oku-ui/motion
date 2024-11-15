<script setup lang="ts">
import { ref } from 'vue'
import { Motion, Presence } from '../../../index.ts'

const show = ref(true)

</script>

<template>
  <div>
    <button @click="show = !show">
      Toggle
    </button>
    <div>
      <p>
        wait-exit = false
      </p>
      <Presence
        wait-exit
      >
        <Motion
          v-show="show"
          id="deneme"
          :initial="{ opacity: 0, scale: 0 }"
          :keyframes="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0.5, scale: 0.6 }"
          class="bg-blue-500 w-20 h-20"
        />
      </Presence>
    </div>

    <div>
      <p>
        wait-exit = true
        <Motion
          v-show="show"
          :initial="{ opacity: 0, scale: 0 }"
          :keyframes="{ opacity: 1, scale: 2 }"
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
  </div>
</template>
