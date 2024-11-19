<script setup lang="ts">
import { useAnimate, useAnimations } from '@oku-ui/motion'
import Toast from './toast.vue'
import { onMounted, ref } from 'vue'

const { animate, scope } = useAnimate()
const { stop } = useAnimations()
const open = ref(false)
onMounted(() => {
  animate('li', {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition(index) {
      return {
        delay: index * 0.1,
      }
    },
  })

  setTimeout(() => {
    stop('test')
    open.value = true
  }, 1400)
})
</script>

<template>
  <Toast
    v-model="open"
  />
  <ul
    :ref="scope.registerElement"
    class="grid grid-cols-4"
  >
    <li
      v-for="i in 20"
      :key="i"
      class="aspect-square w-10 h-10 flex items-center justify-center rounded-2xl bg-white m-2"
    >
      <img class="size-7" src="https://motion.oku-ui.com/logo.svg">
    </li>
  </ul>
</template>
