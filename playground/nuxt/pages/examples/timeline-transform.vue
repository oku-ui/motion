<script lang="ts">
import { onMounted } from 'vue'
import { timeline } from '@motionone/dom'

export default {
  setup: () => {
    const root = ref<HTMLElement | null>(null)

    function startSpring() {
      timeline(
        [
          [
            root.value!,
            { x: 400 },
            {
              duration: 2,
            },
          ],
        ],
        { autoplay: false },
      )
    }

    onMounted(() => {
      startSpring()
    })

    function reverse() {
      timeline([
        [
          root.value!,
          { x: 0 },
          {
            duration: 2,
          },
        ],
      ])
    }

    return { root, reverse }
  },
}
</script>

<template>
  <div
    ref="root"
    style="
      width: 100px;
      border-radius: 20px;
      background-color: #ff1231;
      height: 100px;
    "
    @mousedown="reverse"
  />
</template>
