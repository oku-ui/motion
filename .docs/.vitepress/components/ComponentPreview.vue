<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import HeroCodeGroup from '../../components/HeroCodeGroup.vue'
import HeroContainer from '../../components/HeroContainer.vue'

const props = defineProps<{
  name: string
  files?: string
}>()

const cssFramework = useStorage<'css' | 'tailwind' | 'pinceau' >('cssFramework', 'tailwind')
const parsedFiles = computed(() => JSON.parse(decodeURIComponent(props.files ?? ''))[cssFramework.value])
const key = ref(0)

function refresh() {
  key.value++
}
</script>

<template>
  <HeroContainer
    :folder="name"
    :files="parsedFiles"
    :css-framework="cssFramework"
    @reload="refresh"
  >
   <div class="h-full w-full flex justify-center items-center" :key="key">
    <slot />
   </div>


 

    <template #codeSlot>
      <HeroCodeGroup v-model="cssFramework">
        <slot name="tailwind" />
        <slot name="css" />
      </HeroCodeGroup>
    </template>
  </HeroContainer>
</template>
