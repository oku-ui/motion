<script lang="ts" setup>
defineProps({
  replay: { type: Boolean, default: true },
})

defineEmits(['reload'])

const replayRef = ref(true)
function onReplay() {
  replayRef.value = !replayRef.value
  setTimeout(() => replayRef.value = !replayRef.value, 10)
}

defineExpose({
  onReplay,
})
</script>

<template>
  <div class="grid grid-cols-1">
    <div
      class="bg-gray-200/50 h-[400px] dark:bg-gray-900 w-400px max-w-400px mx-auto h-400px max-h-400px rounded-md relative overflow-hidden flex items-center justify-center mt-3 w-full"
    >
      <span class="absolute bottom-5 opacity-50">@oku-ui</span>

      <button
        v-if="replay"
        class="absolute top-0 right-0 z-10 p-2 bg-emerald-500 border-0 cursor-pointer hover:bg-emerald-600 text-white rounded-bl-md"
        @click="onReplay"
      >
        <Icon dynamic name="i-ph-arrow-clockwise-bold" class="h-5 w-5" />
      </button>
      <slot :reload="replayRef" />
    </div>
    <div class="grid grid-cols-1 ml-4 h-full">
      <slot name="setting" />
    </div>
  </div>
  <slot name="code" />
</template>
