<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<!-- Youtube Video Embed -->
<template>
  <div class="video">
    <iframe
      :src="`https://www.youtube.com/embed/${id}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      title="YouTube video player"
      class="h-[calc(100vw/4.777)] w-full"
    />
  </div>
</template>
