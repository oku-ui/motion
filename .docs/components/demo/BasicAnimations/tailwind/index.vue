<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from '@oku-ui/motion'
import Input from './Input.vue'

const x = ref(0)
const y = ref(0)
const rotate = ref(0)

function setX(value: number) {
  x.value = value
}

function setY(value: number) {
  y.value = value
}

function setRotate(value: number) {
  rotate.value = value
}
</script>

<template>
  <div class="flex gap-10 items-center">
    <div>
      <Motion
        :animate="{ x,
                    y,
                    rotate }"
        as="div"
        class="w-[200px] h-[200px] border-dashed border-2 border-sky-500 pointer-events-none"
        :transition="{
          duration: 0.4,
          type: 'spring',
        }"
      />

      <div>
        <Motion
          :animate="{ opacity: 1, scale: 1 }"
          as="div"
          :initial="{ opacity: 0, scale: 0.2 }"
          class="w-[200px] h-[200px] border-dashed bg-red-500 border-2 border-sky-500 pointer-events-none"
          :transition="{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }"
        />
      </div>

      <!-- <Motion
        tag="div"
        appear
        :variants="{
          enter: {
            x: 100,
            y,
            rotate,
            options: {
              type: 'spring',
              onComplete: (el) => {
                console.log('enter complete', el)
              },
            },
          },
          leave: {
            x: 0,
            y: 0,
            rotate: 0,
            options: {
              onComplete: (el) => {
                console.log('leave complete', el)
              },
            },
          },
        }"
      >
        <div class="w-[200px] h-[200px] border-dashed border-2 border-sky-500 pointer-events-none" />
      </Motion> -->
    </div>
    <div class="grid">
      <Input :value="x" :set="setX">
        x
      </Input>
      <Input :value="y" :set="setY">
        y
      </Input>
      <Input :value="rotate" :set="setRotate" :min="-180" :max="180">
        rotate
      </Input>
    </div>
  </div>
</template>
