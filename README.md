# Vue and Nuxt MotionOne

| Package | Version | Downloads |
|---------|---------|-----------|
| [Vue](https://www.npmjs.com/package/@oku-ui/motion) | [![npm](https://img.shields.io/npm/v/@oku-ui/motion?style=flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion) | [![npm](https://img.shields.io/npm/dm/@oku-ui/motion?flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion) |
| [Nuxt](https://www.npmjs.com/package/@oku-ui/motion-nuxt) | [![npm](https://img.shields.io/npm/v/@oku-ui/motion-nuxt?style=flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion-nuxt) | [![npm](https://img.shields.io/npm/dm/@oku-ui/motion-nuxt?flat&colorA=002438&colorB=28CF8D)](https://www.npmjs.com/package/@oku-ui/motion-nuxt) |


**A tiny, performant animation library for VueJS. Powered by [Motion One](https://motion.dev/).**

> [!WARNING]
> Soon NPM packages will be released.

## Introduction

Motion One for Vue is a 5kb animation library for Vue 3. Built on Motion One, it's capable of springs, independent transforms, and hardware accelerated animations.

By the end of this quick guide, you'll have installed Motion One for Vue and created your first animation.

## Installation

Motion One for VueJS can be installed via npm:

```bash
npm install @oku-ui/motionone
# or
pnpm add @oku-ui/motionone
# or
yarn add @oku-ui/motionone
```

Motion One for NuxtJS can be installed via npm:

```bash
npm install @oku-ui/motionone-nuxt
# or
pnpm add @oku-ui/motionone-nuxt
# or
yarn add @oku-ui/motionone-nuxt
```

## Create an animation

Import the Motion component and register it in your Vue component:

```ts
<script setup lang="ts">
import { Motion } from "@oku-ui/motionone"
</script>

<template>
  <Motion />
</template>
```

The `Motion` component can be used to create an animatable HTML or SVG element. By default, it will render a `div` element:

```ts
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


```ts
<Motion :animate="{ rotate: 90, backgroundColor: 'var(--yellow)' }" />
```

Every time a value in animate changes, perhaps from component data or props, the component will automatically animate to the latest values.

## Transition options

We can change the type of animation used by passing a `transition` prop.

```ts
<Motion
  :animate="{ rotate: 90, backgroundColor: 'var(--yellow)' }"
  :transition="{ duration: 1, easing: 'ease-in-out' }"
/>
```

By default transition options are applied to all values, but we can also override on a per-value basis:

```ts
<Motion
  :animate="{ rotate: 90, backgroundColor: 'var(--yellow)' }"
  :transition="{
    duration: 1,
    rotate: { duration: 2 },
  }"
/>
```

## Keyframes

Values can also be set as arrays, to define a series of keyframes.

```ts
<Motion :animate="{ x: [0, 100, 50] }" />
```

By default, keyframes are spaced evenly throughout `duration`, but this can be adjusted by providing progress values to `offset`:

```ts
<Motion
  :animate="{ x: [0, 100, 50] }"
  :transition="{ x: { offset: [0, 0.25, 1] } }"
/>
```

## Enter animations

Elements will automatically `animate` to the values defined in animate when they're created.

This can be disabled by setting the `initial` prop to `false`. The styles defined in `animate` will be applied immediately when the element is first created.

```ts
<Motion :initial="false" :animate="{ x: 100 }" />
```

## Exit animations

When an element is removed with `v-show` or `v-if` it can be animated out with the Presence component and the exit prop:

```ts
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
        :animate="{ opacity: 1, scale: 1 }"
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

```ts
<Motion
  v-show="isVisible"
  :animate="{ opacity: 1 }"
  :exit="{ opacity: 0, transition: { duration: 0.8 } }"
  :transition="transition"
/>
```