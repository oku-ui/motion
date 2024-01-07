<script setup lang="ts">
const title = 'Oku Motion'
const desc = 'A new animation library, built on the Web Animations API for the smallest filesize and the fastest performance. Powered by Motion One.'

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  ogImage: 'https://oku-ui.com/motion-og-image.png',
  twitterImage: 'https://oku-ui.com/motion-og-image.png',
})
</script>

<template>
  <div>
    <span class="gradient" />

    <ULandingHero orientation="horizontal" class="!py-18 relative md:py-0 md:!pt-32" :ui="{ container: 'flex lg:gap-4' }">
      <!-- <div class="hidden lg:block relative w-[500px]">
        <Illustration class="h-[480px]" />
      </div> -->
      <template #title>
        <span class="text-primary-400">{{ title }}</span>
        Pixel-Powered Performance.
      </template>
      <template #description>
        A production-ready motion library for Vue3 and Nuxt3, built on the Web Animations API for the smallest filesize
        and the fastest performance.
        Powered by Motion One.
      </template>
      <template #links>
        <UButton to="/motion/getting-started" icon="i-ph-rocket-launch-duotone" size="xl">
          Get started
        </UButton>
      </template>
    </ULandingHero>

    <ULandingSection>
      <template #title>
        A production-ready motion library for <br><span class="text-primary-400">Vue3 and Nuxt3</span>,
        <br>built on the Web Animations API for the smallest filesize
        and the fastest performance.
      </template>
      <UPageGrid>
        <ULandingCard
          title="Shockingly Simple" icon="i-ph-gear-six-duotone"
          description="Oku motion enhances web animations with a minimal API, offering intuitive selectors, individual transforms, and sophisticated timeline sequencing, and more for a seamless user experience."
        />

        <ULandingCard
          title="Size Matters" icon="i-ph-lightning-duotone"
          description="Oku motion's animate function is an ultra-lightweight 3.8kb, and the scroll feature is just 2.5kb, both significantly smaller than their Greensock counterparts, being less than 20% of their size."
        />

        <ULandingCard
          title="Max Performance" icon="i-ph-palette-duotone"
          description="Oku motion utilizes hardware-accelerated animations to ensure a snappy and responsive UI, maintaining smooth performance even during heavy workloads."
        />

        <ULandingCard
          title="Best in Dev" icon="i-ph-puzzle-piece-duotone"
          description="Motion DevTools, a Chrome extension, allows for seamless inspection, editing, and exporting of animations created with Oku motion or CSS."
        />
      </UPageGrid>
    </ULandingSection>
  </div>
</template>

<style scoped>
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(50% 50% at 50% 50%, #eec264 0%, rgba(0, 220, 130, 0) 100%);
  filter: blur(180px);
  opacity: 0.6;
  z-index: -1;
}
</style>
