<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Motion } from '@oku-ui/motion'

defineProps<{
  title?: string
}>()
const reloadKey = ref(0)
</script>

<template>
  <div
    :key="reloadKey"
    class="relative rounded-3xl aspect-square overflow-hidden flex justify-center items-center"
  >
    <slot />
    <div class="absolute bottom-0 left-0 w-full text-white p-4 bg-transparent flex justify-between items-center ">
      <h2 class="font-semibold">
        {{ title }}
      </h2>
      <Motion
        as="template"
        :initial="{ rotate: 0 }"
        :animate="{ rotate: 360 }"
        :transition="{
          type: 'spring',
        }"
      >
        <Icon
          icon="mdi:refresh"
          class="bottom-4 right-4 w-7 h-7 cursor-pointer bg-black/20 rounded-full p-1.5 "
          @click="reloadKey++"
        />
      </Motion>
    </div>
  </div>
</template>
