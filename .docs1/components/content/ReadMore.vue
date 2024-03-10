<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
})

// Guess title from link!
const computedTitle = computed<string>(() => props.title || createBreadcrumb(props.to))
</script>

<template>
  <Callout icon="i-ph-bookmark-simple-duotone" :to="to">
    <MDCSlot unwrap="p">
      Read more in <span class="font-bold" v-html="computedTitle" />.
    </MDCSlot>
  </Callout>
</template>
