<script lang="ts" setup>
import { Motion } from '@oku-ui/motion'

function log(event: any) {
  console.warn(event)
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0 }"
    :keyframes="{ opacity: 1 }"
    :hover="{ scale: 1.2 }"
    :press="{ scale: 0.9 }"
    :in-view="{ backgroundColor: 'black' }"
    :transition="{ duration: 1 }"
    style="width: 200px; background-color: red; height: 200px"
    @hoverstart="log"
    @hoverend="log"
    @pressstart="log"
    @pressend="log"
    @viewenter="log"
    @viewleave="log"
    @motioncomplete="log"
    @motionstart="log"
  />
</template>
