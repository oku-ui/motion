<script setup lang="ts">
import { spring, stagger } from '@motionone/dom'
import { Motion, PresenceGroup } from '@oku-ui/motion'

const items = ['a', 'b', 'c', 'd', 'e', 'f']
</script>

<template>
  <PresenceGroup>
    <template v-for="(item, index) in items" :key="index">
      <Motion
        :initial="{
          x: 0,
          y: 0,
        }"
        :animate="{
          y: -20,
        }"
        :transition="{
          easing: spring({
            stiffness: 24,
            damping: 12,
          }),
          repeat: Number.POSITIVE_INFINITY,
          direction: 'alternate',
          delay: stagger(0.5, {
            easing: 'ease-in',
            start: 0,
            from: 'first',
          })(index, items.length),
        }" class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
      />
    </template>
  </PresenceGroup>
</template>
