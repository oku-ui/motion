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

const el = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 60, y: 60 },
  stopPropagation: true,
  preventDefault: true,
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

      <div
        ref="el"
        :style="style"
        class="bg-green-900 rounded-lg fixed w-60 h-6 z-[9999] cursor-move"
      >
        <div class="flex items-center justify-center h-full">
          <UIcon dynamic name="i-ph-arrows-out-cardinal-bold" class="h-5 w-5 text-white" />
        </div>
      </div>
      <div
        class="w-60 fixed z-[999]" :style="{
          left: `${x}px`,
          top: `${y + 7}px`,
        }"
      >
        <slot name="setting" />
      </div>
      <slot :reload="replayRef" />
    </div>
  </div>
  <slot name="code" />
</template>
