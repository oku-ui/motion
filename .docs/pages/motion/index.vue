<script setup lang="ts">
const title = '1:1 Radix UI components for Vue'
const desc = 'Unstyled, accessible components for building high‑quality design systems and web apps in React.Unstyled, accessible components for building high‑quality design systems and web apps in Vue.'

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  ogImage: 'https://oku-ui.com/primitives-og-image.png',
  twitterImage: 'https://oku-ui.com/primitives-og-image.png',
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
        <span class="text-primary-400">Motion</span> Tiny size.Huge performance.
      </template>
      <template #description>
        A new animation library, built on the Web Animations API for the smallest filesize and the fastest performance. Powered by Motion One.
      </template>
      <template #links>
        <UButton to="/motion/getting-started" icon="i-ph-rocket-launch-duotone" size="xl">
          Read the Docs
        </UButton>
      </template>
    </ULandingHero>

    <ULandingSection>
      <template #title>
        A new animation library, built on the Web Animations API for the smallest filesize and the fastest performance. <br><span class="text-primary-400"> Nuxt 3 and Vue 3 Support. </span>
      </template>
      <UPageGrid>
        <ULandingCard
          title="Shockingly simple."
          description="Motion One packs the power of the Web Animations API into a minimal API. It adds new features like selectors, individual transforms, timeline sequencing and more."
        />

        <ULandingCard
          title="Size matters"
          icon="i-ph-lightning-duotone"
          description="Motion One's animate function is just 3.8kb, and scroll is only 2.5kb. Both less than 20% the size of their Greensock equivalents."
        />

        <ULandingCard
          title="Max performance."
          icon="i-ph-palette-duotone"
          description="Motion One uses hardware accelerated animations where possible. So your UI stays snappy and responsive, even under heavy workloads."
        />

        <ULandingCard
          title="Best in dev"
          description="Motion DevTools is a Chrome extension for inspecting, editing and exporting animations made with Motion One or CSS."
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
