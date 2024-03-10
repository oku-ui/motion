---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Oku Motion"
  text: "Pixel-Powered Performance"
  tagline: A production-ready motion library for Vue3 and Nuxt3, built on the Web Animations API for the smallest filesize and the fastest performance. Powered by Motion One.
  actions:
    - theme: brand
      text: Get Started
      link: /started/introduction
    - theme: alt
      text: Explore Examples
      link: https://stackblitz.com/@YeSuX/projects
  image:
    src: assets/oku-motion_logo.jpg
    alt: Oku motion

features:
  - icon: 👶
    title: Shockingly Simple
    details: Oku motion enhances web animations with a minimal API, offering intuitive selectors, individual transforms, and sophisticated timeline sequencing, and more for a seamless user experience.
  - icon: ✨
    title: Size Matters
    details: Oku motion's animate function is an ultra-lightweight 3.8kb, and the scroll feature is just 2.5kb, both significantly smaller than their Greensock counterparts, being less than 20% of their size.
  - icon: 🔥
    title: Max Performance
    details: Oku motion utilizes hardware-accelerated animations to ensure a snappy and responsive UI, maintaining smooth performance even during heavy workloads.
  - icon: 🌈
    title: Best in Dev
    details: Motion DevTools, a Chrome extension, allows for seamless inspection, editing, and exporting of animations created with Oku motion or CSS.
---

<Logo></Logo>

<script setup lang="ts">
import Logo from './components/logo.vue'
import { onMounted } from 'vue'
import { Application } from '@splinetool/runtime'

onMounted(()=>{
  const logoComponent = document.getElementById('logo')
  const logoContainer = document.getElementsByClassName('image-container')

  logoContainer[0].replaceWith(logoComponent)
})
</script>
