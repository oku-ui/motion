---

title: Getting started
description: A quick tutorial to get you up and running with Radix Primitives.
---

<script setup>
import HeroContainer from '../../components/HeroContainer.vue'
import DemoGettingStarted from '../../components/demo/GettingStarted/index.vue'
import HeroCodeGroup from '../../components/HeroCodeGroup.vue'
</script>

# Getting started

<Description>
A quick tutorial to get you up and running with
</Description>

### 1. Install the library

Install the component from your command line.

<InstallationTabs value="@oku-ui/motion" />

## Adding the plugin
```ts
import { createApp } from 'vue'
import { motionPlugin } from '@oku-ui/motion'

const app = createApp({})
app.use(motionPlugin)
app.mount('#app')
```

### 2. Import the parts

Import and structure the parts.

```vue twoslash
<script setup lang="ts">
import { Motion } from '@oku-ui/motion'
</script>

<template>
  <Motion
    class="bg-white size-52 aspect-square rounded-2xl"
    :initial="{ scale: 0 }"
    :animate="{ rotate: 180, scale: 1 }"
    :transition="{
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    }"
  />
</template>
```

### Demo

Here's a complete demo.

<HeroContainer>
<DemoGettingStarted />

</HeroContainer>

## Summary

...
