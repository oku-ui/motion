# Vue and Nuxt Motion

| Package | Version | Downloads |
|---------|---------|-----------|
| [Vue](https://www.npmjs.com/package/@oku-ui/motion) | [![npm](https://img.shields.io/npm/v/@oku-ui/motion?style=flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion) | [![npm](https://img.shields.io/npm/dm/@oku-ui/motion?flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion) |
| [Nuxt](https://www.npmjs.com/package/@oku-ui/motion-nuxt) | [![npm](https://img.shields.io/npm/v/@oku-ui/motion-nuxt?style=flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion-nuxt) | [![npm](https://img.shields.io/npm/dm/@oku-ui/motion-nuxt?flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion-nuxt) |


**A tiny, performant animation library for VueJS. Powered by [Motion](https://motion.dev/).**

## Introduction

Motion for Vue is a 5kb animation library for Vue 3. Built on Motion, it's capable of springs, independent transforms, and hardware accelerated animations.

By the end of this quick guide, you'll have installed Motion for Vue and created your first animation.

# Contributing

Please read our [contributing guide](https://github.com/oku-ui/motion/blob/master/CONTRIBUTING.md)

## Installation

Motion for VueJS can be installed via npm:

```bash
npm install @oku-ui/motion
# or
pnpm add @oku-ui/motion
# or
yarn add @oku-ui/motion
```

Motion for NuxtJS can be installed via npm:

```bash
npm install @oku-ui/motion-nuxt
# or
pnpm add @oku-ui/motion-nuxt
# or
yarn add @oku-ui/motion-nuxt
```

## NuxtJS

Add `@oku-ui/motion-nuxt` to the `modules` section of `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@oku-ui/motion-nuxt',
  ],

  motion: {
    //  autoImportComponents?: boolean
    //  prefix?: string
  },
})
```

## Create an animation

Import the Motion component and register it in your Vue component:

```vue
<script setup lang="ts">
import { Motion } from "@oku-ui/motion"
</script>

<template>
  <Motion />
</template>
```

The `Motion` component can be used to create an animatable HTML or SVG element. By default, it will render a `div` element:

```vue
<script setup lang="ts">
import { Motion } from "motion/vue"
</script>

<template>
  <Motion />
</template>

<style scoped>
div {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--splash);
}
</style>
```

Edit the above example by adding an animate prop:


```vue
<Motion :animation="{ rotate: 90, backgroundColor: 'var(--yellow)' }" />
```

Every time a value in animate changes, perhaps from component data or props, the component will automatically animate to the latest values.

## Transition options

We can change the type of animation used by passing a `transition` prop.

```vue
<Motion
  :animation="{ rotate: 90, backgroundColor: 'var(--yellow)' }"
  :transition="{ duration: 1, easing: 'ease-in-out' }"
/>
```

By default transition options are applied to all values, but we can also override on a per-value basis:

```vue
<Motion
  :animation="{ rotate: 90, backgroundColor: 'var(--yellow)' }"
  :transition="{
    duration: 1,
    rotate: { duration: 2 },
  }"
/>
```

## Keyframes

Values can also be set as arrays, to define a series of keyframes.

```vue
<Motion :animation="{ x: [0, 100, 50] }" />
```

By default, keyframes are spaced evenly throughout `duration`, but this can be adjusted by providing progress values to `offset`:

```vue
<Motion
  :animation="{ x: [0, 100, 50] }"
  :transition="{ x: { offset: [0, 0.25, 1] } }"
/>
```

## Enter animations

Elements will automatically `animate` to the values defined in animate when they're created.

This can be disabled by setting the `initial` prop to `false`. The styles defined in `animate` will be applied immediately when the element is first created.

```vue
<Motion :initial="false" :animation="{ x: 100 }" />
```

## Exit animations

When an element is removed with `v-show` or `v-if` it can be animated out with the Presence component and the exit prop:

```vue
<script setup lang="ts">
import { Motion, Presence } from "motion/vue"

const show = ref(true)
</script>

<template>
  <div class="container">
    <Presence>
      <Motion
        v-show="show"
        :initial="{ opacity: 0, scale: 0 }"
        :animation="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.6 }"
        class="box"
      />
    </Presence>
    <button @click="show = !show">
      Toggle
    </button>
  </div>
</template>

<style>
.container {
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.container button {
  cursor: pointer;
}
.box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--splash);
}
</style>
```

`exit` can be provided a `transition` of its own, that override the component's `transition`:

```vue
<Motion
  v-show="isVisible"
  :animation="{ opacity: 1 }"
  :exit="{ opacity: 0, transition: { duration: 0.8 } }"
  :transition="transition"
/>
```

## Credits

- Special thanks to the **[Motion](https://github.com/motiondivision/motion)** library, which provided a solid foundation for the animation features in this project.
- A significant portion of the source code was directly adapted and extended from **[rick-hup](https://github.com/rick-hup/motion-vue)**, whose work was crucial in implementing motion within Vue.js.
- **[motionone](https://github.com/motiondivision/motionone)** served as an essential resource for the underlying animation capabilities used in this project.
- **[vue-motion-one](https://github.com/wobsoriano/vue-motion-one/tree/master)** provided valuable insights that helped shape the motion features.