<script setup lang="ts">
const props = defineProps<{
  children?: string
  value: number
  set: (newValue: number) => void
  min?: number
  max?: number
}>()

defineEmits<Emits>()

type Emits = {
  'update:value': [number]
}

const min = props.min ?? -200
const max = props.max ?? 200

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const newValue = Number.parseFloat(target.value) || 0
  props.set(newValue)
}
</script>

<template>
  <label>
    <code>{{ children }}</code>
    <input
      type="range"
      :value="value"
      :min="min"
      :max="max"
      @input="handleInput"
    >
    <input
      type="number"
      :value="value"
      :min="min"
      :max="max"
      @input="handleInput"
    >
  </label>
</template>

  <style scoped>
  /* Add styles here if needed */
  </style>
