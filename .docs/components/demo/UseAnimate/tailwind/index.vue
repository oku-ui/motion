<script setup lang="ts">
import { useAnimate } from '@oku-ui/motion'
import { onMounted } from 'vue'

const { animate, scope } = useAnimate()
onMounted(() => {
  animate(scope.el, {
    initial: { scale: 0 },
    animate: { rotate: 180, scale: 1 },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    },
  })
})
</script>

<template>
  <div
    :ref="scope.registerElement"
    class="bg-white size-52 aspect-square rounded-2xl"
  />
</template>
