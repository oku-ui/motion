<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import HeroContainer from './NewHeroContainer.vue'
import HeroCodeGroup from './NewHeroCodeGroup.vue'


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
   <div :key="key">
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
