<script setup lang="ts">
import { onMounted } from 'vue'
import { useAnimate } from '../../../index.ts'

const { animate, scope } = useAnimate()

onMounted(() => {
  animate(
    'li',
    { opacity: 0, x: 10 },
    (index) => {
      return {
        opacity: {
          delay: index * 0.5,
        },
        x: {
          delay: index * 0.5,
        },
      }
    },
  )
})

</script>

<template>
  <ul :ref="scope.updateElement">
    @oku/motion useAnimate Demo
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</template>
