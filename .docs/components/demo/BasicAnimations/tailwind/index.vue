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
