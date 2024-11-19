<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from '@oku-ui/motion'
import Input from './Input.vue'

const x = ref([0])
const y = ref([0])
const rotate = ref([0])

</script>

<template>
  <div class="flex gap-10 items-center">
    <div>
      <Motion
        :animate="{
          x: x[0],
          y: y[0],
          rotate: rotate[0],
        }"
        as="div"
        class="w-[200px] h-[200px] border-dashed border-2 border-sky-500 pointer-events-none"
        :transition="{
          duration: 0.4,
          type: 'spring',
        }"
      />
    </div>
    <div class="grid">
      <div class="flex space-x-2 items-center">
        <p class="font-bold text-xl text-white items-center ">
          x
        </p>
        <Input
          v-model="x"
        />
      </div>
      <div class="flex space-x-2 items-center">
        <p class="font-bold text-xl text-white items-center ">
          y
        </p>
        <Input
          v-model="y"
        />
      </div>
      <div class="flex space-x-2 items-center">
        <p class="font-bold text-xl text-white items-center ">
          rot
        </p>
        <Input
          v-model="rotate"
        />
      </div>
    </div>
  </div>
</template>
