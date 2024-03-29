---
title: 'Quick Start'
description: 'Oku Motion requires Vue 3 or greater.'
prev:
  text: 'Introduction'
  link: '/started/introduction'
---

# Quick Start

## Installation

### Vue 3

::: code-group
```sh [pnpm]
pnpm i @oku-ui/motion
```

```bash [npm]
npm i @oku-ui/motion

```

```sh [yarn]
yarn add @oku-ui/motion
```
:::

### Nuxt 3

1. Install the module

::: code-group
```sh [pnpm]
pnpm i @oku-ui/motion-nuxt
```

```bash [npm]
npm i @oku-ui/motion-nuxt

```

```sh [yarn]
yarn add @oku-ui/motion-nuxt
```
:::

2. Add the module to `nuxt.config.ts` file

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@oku-ui/motion-nuxt',
  ],

  motion: {
    // Motion One options
  },
})
```
:::

::: tip
{icon="i-ph-check-circle-duotone"}
Well done! You have successfully installed Motion One.
:::

## Importing

Once installed, you can import Oku Motion via `@oku-ui/motion`.

```vue
<script setup lang="ts">
  import { Motion } from "@oku-ui/motion"
</script>

<template>
  <Motion />
</template>
```

