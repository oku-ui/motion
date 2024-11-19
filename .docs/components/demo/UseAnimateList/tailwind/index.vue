<script setup lang="ts">
import { useAnimate } from '@oku-ui/motion'
import { onMounted } from 'vue';
const { animate,scope } = useAnimate()
onMounted(() => {
  animate('li', {
    initial:{ scale: 0, opacity: 0 },
    animate:{ scale: 1, opacity: 1 },
    transition(index) {
      return {
        delay: index * 0.1,
      }
    },
  })
})
</script>

<template>
 <ul :ref="scope.registerElement"
 class="grid grid-cols-4">
    <li
      v-for="i in 20"
      class="aspect-square w-10 h-10 flex items-center justify-center rounded-2xl bg-white m-2"
    >
    <img class="size-7" src="https://motion.oku-ui.com/logo.svg" />
  </li>
  </ul>
</template>
