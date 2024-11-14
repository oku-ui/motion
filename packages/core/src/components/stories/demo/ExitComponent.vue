<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from '../../index.ts'

const show = ref(true)
</script>

<template>
  <div>
    <div>
      <p>
        wait-exit = false
      </p>
      <Motion
        v-show="show"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0.5, scale: 0.6 }"
        class="bg-blue-500 w-20 h-20"
      />
    </div>

    <div>
      <p>
        wait-exit = true
        <Motion
          v-show="show"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0.5, scale: 0.6 }"
          class="bg-blue-500 w-20 h-20"
        />
      </p>
    </div>

    <button @click="show = !show">
      Toggle
    </button>
  </div>
</template>
