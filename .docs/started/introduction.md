---
title: 'Introduction'
description: Get started with Oku Motion and learn by exploring interactive examples.
---

# Introduction

## Overview

Oku Motion is a simple yet powerful motion library for Vue3 and Nuxt3.

It enables effortlessly smooth animations for web elements, harnessing the power of the Web Animations API for optimal performance. Its versatility extends to animating anything, offering creative freedom and ensuring your website stands out with visually stunning effects.

In this quick overview, we'll take a look at some of the APIs that Oku Motion offers.

It's based on [Motion One](https://motion.dev).

## The `<motion />` component

The core of Motion is the motion component. Think of it as a plain HTML or SVG element, supercharged with animation capabilities.

```
<Motion/>
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-aqkuft?embed=1&file=src%2Ftemplate%2FRefresh.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Gestures
`<motion />` extends Vue's event system with powerful gesture recognisers. It supports hover, press and more.

```html
<Motion 
  :hover="{ scale: 1.2 }" 
  :press="{ scale: 0.8 }" />
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-qwc8lb?embed=1&file=src%2FDemo.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Keyframes
Set a value as an array and Motion will animate through each of these values in turn.

By default, each keyframe will be spaced evenly throughout the animation, but the exact timing and easing can be configured via the `transition` property.

```html
<Motion
    class="box"
    :animate="{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 180, 180, 0],
      borderRadius: ['0%', '0%', '50%', '50%', '0%'],
    }"
    :transition="{
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1,
    }"
  />
```

<!-- <iframe
  src="https://stackblitz.com/edit/vitejs-vite-bqgiwz?embed=1&file=src%2FDemo.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe> -->

## Variants

Variants can be used to animate entire sub-trees of components with a single `animate` prop. Options like `when` and `staggerChildren` can be used to declaratively orchestrate these animations.

## Scroll-triggered animations

Elements can animate as they enter and leave the viewport with the handy whileInView prop.

## To be continued...
