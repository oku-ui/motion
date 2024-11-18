<script setup lang="ts">
import { Motion, useAnimations } from '../../../index.ts'
import { onMounted, ref } from 'vue'

const rotate = ref(500)

const animations = useAnimations()
onMounted(() => {
  setTimeout(() => {
    animations.stop()
    // eslint-disable-next-line no-console
    console.log('motion stopped')
  }, 1500)
})

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
} as any

const items = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
  },
} as any

const list = [0, 1, 2, 3, 4]
</script>

<template>
  <Motion
    :animate="{
      rotate: `${rotate}deg`,
      backgroundColor: '#FFD700',
    }"
    :transition="{
      duration: 1,
    }"
    class="w-20 h-20"
  />

  <div
    :style="{
      marginTop: '50px',
    }"
  >
    <button @click="rotate += 20">
      Rotate
    </button>
  </div>

  <Motion
    :initial="{ opacity: 0, x: -50 }"
    :in-view="{
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 0.9,
      },
    }"
  >
    <p>
      Lorem Ipsum
    </p>
  </Motion>

  <Motion
    as="ul"
    :variants="container"
    initial="hidden"
    animate="visible"
    :transition="{
      duration: 0.3,
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    }"
    class="rounded-2xl overflow-hidden  list-none p-2  grid-cols-2 grid-rows-2 aspect-square bg-red-500/20 w-1/3  grid"
  >
    <Motion
      v-for="(item, i) in list"
      :key="item"
      :variants="items"
      :transition="{
        delay: 0.8 + i * 0.2,
      }"
      class="bg-red-500 rounded-full origin-center"
    />
  </Motion>
</template>
