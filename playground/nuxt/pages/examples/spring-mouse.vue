<script lang="ts" setup>
import { animate, spring } from '@motionone/dom'

const root = ref<HTMLElement | null>(null)
let springScheduled = false

function startSpring(e: any) {
  springScheduled = false
  animate(
    root.value!,
    { x: e.pageX - 50, y: e.pageY - 50 },
    {
      easing: spring({
        stiffness: 300,
        damping: 100,
      }),
    },
  )
}

function handleMove(e: any) {
  !springScheduled && requestAnimationFrame(() => startSpring(e))
  springScheduled = true
}

function stopDrag() {
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('mousemove', handleMove)
}

function startDrag() {
  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', stopDrag)
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
    @mousedown="startDrag"
  />
</template>
