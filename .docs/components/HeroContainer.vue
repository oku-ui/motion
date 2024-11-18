<script setup lang="ts">
import CodeSandbox from './CodeSandbox.vue'
import Stackblitz from './Stackblitz.vue'
// import Storybook from './Storybook.vue'
// import Nuxt from './Nuxt.vue'
import { Icon } from '@iconify/vue'
import {Motion} from '@oku-ui/motion'
import { ref } from 'vue'
import Tooltip from './Tooltip.vue'

withDefaults(
  defineProps<{
    overflow?: boolean
    folder?: string
    files?: string[]
    cssFramework?: string
  }>(),
  { folder: '', files: () => [] },
)

const emit = defineEmits<{
  'reload': [value: number]
}>()
const key = ref(0)

function refresh() {
  key.value++
  emit('reload', key.value)
}
</script>

<template>
  <div class="relative text-[15px] text-black">
 
  
    <div
      class="vp-raw p-4 rounded-t-lg bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 w-full relative items-center justify-center flex"
      :class="{ 'overflow-x-auto': overflow }"
    >
      
      <div class="w-full h-full max-w-[700px] flex items-center py-12 sm:py-[100px] custom-justify-center ">
        <slot />
    
        <CodeSandbox
          v-if="folder"
          :key="cssFramework"
          class="hidden sm:block absolute bottom-4 right-4"
          :name="folder"
          :files="files"
        />
        <Stackblitz
          v-if="folder"
          :key="cssFramework"
          class="hidden sm:block absolute bottom-4 right-12"
          :name="folder"
          :files="files"
        />

      <div
      class="hidden sm:block absolute bottom-4 right-20"
      >
        <Tooltip
          content="Refresh the preview"
        >
         <button @click="refresh">
              <Motion
                :key="`${key}-refresh`"
                :as-child="true"
                :initial="{ rotate: 0 }"
                :animate="{ rotate: 360 }"
                :transition="{
                  type: 'spring',
                }"

            >
                <Icon
                  icon="mdi:refresh"
                  class="w-6 h-6"
                />
          </Motion>
        </button>

      </Tooltip>
      </div>

        <!-- <Storybook
          v-if="folder"
          :key="cssFramework"
          class="hidden sm:block absolute bottom-4 left-4"
          :name="folder"
          :files="files"
        />

        <Nuxt
          v-if="folder"
          :key="cssFramework"
          class="hidden sm:block absolute bottom-4 left-12"
          :name="folder"
          :files="files"
        /> -->
      </div>
    </div>
    <slot name="codeSlot" />
  </div>
</template>

<style scoped>
:deep(li) {
  margin-top: 0 !important;
}

:deep(button:focus),
:deep(button:focus-visible) {
  outline: 0;
}

:deep(h3) {
  margin: 0px !important;
  font-weight: unset !important;
}

:deep(pre) {
  z-index: 0 !important;
}
</style>
