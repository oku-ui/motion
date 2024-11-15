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
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <g class="segment" opacity="0">
          <path
            id="loading-path"
            d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
          ></path>
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(45deg); transform-origin: 100px 100px"
          />
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(90deg); transform-origin: 100px 100px"
          />
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(135deg); transform-origin: 100px 100px"
          />
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(180deg); transform-origin: 100px 100px"
          />
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(225deg); transform-origin: 100px 100px"
          />
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(270deg); transform-origin: 100px 100px"
          />
        </g>
        <g class="segment" opacity="0">
          <use
            href="#loading-path"
            style="transform: rotate(315deg); transform-origin: 100px 100px"
          />
        </g>
      </svg>
     </div>

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
