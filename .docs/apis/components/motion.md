---
title: Motion
description: Motion components are DOM primitives optimised for 60fps animation and gestures.
icon: i-ph-brackets-curly-duotone
next:
  text: 'PresenceGroup'
  link: '/apis/components/presence-group'
---

# Motion

There's a motion component for every HTML and SVG element, for instance `<Motion tag="div"/>`, `<Motion tag="circle"/>` etc.

These work exactly like their static counterparts, but offer props that allow you to:

- Animate
- Add drag, pan, hover and tap gestures
- Respond to gestures and elements entering the viewport with animation
- Deeply animate throughout variants

And much more.

## Supported values

### Value types

Motion can animate:

- Numbers: `0`, `10` etc.
- Strings containing numbers: `"0vh"`, `"10px"` etc.
- Colors: Hex, RGB, HSLA.
- Complex strings containing multiple numbers and/or colors (ie `"10px 0 #000"`)

When animating to a non-animatable value like `"block"`, this value will be set instantly. By setting this value within `transitionEnd`, this value will be set at the end of the animation.

```vue
<Motion
  class="box"
  :animate="{
    x: 30,
    backgroundColor: '#fff',
    boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    transitionEnd: { display: 'none' },
  }"
/>
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-zydpdg?embed=1&file=src%2FApp.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

### Value type conversion

In general, values can only be animated between two of the same type (ie two `px`, two `%` etc).

However, HTML component's `x`, `y`, `width`, `height`, `top`, `left`, `right` and `bottom` values have enhanced support and can all be animated freely between different value types.

```vue
<Motion
  class="box"
  :initial="{
    x:'100%'
  }"
  :animate="{
    backgroundColor: '#fff',
    x:'calc(100vw - 50%)',
    boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
    position: 'fixed',
  }"
/>
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-9d7afo?embed=1&file=src%2FApp.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

Additionally, any color type (hex, HSL, RGB) can animate between each other.

### Transform

Transform properties are accelerated by the GPU, and therefore animate smoothly. They can be set and animated individually as:

- Translate shortcuts: `x`, `y`, `z`
- Translate: `translateX`, `translateY`, `translateZ`
- Scale: `scale`, `scaleX`, `scaleY`
- Rotate: `rotate`, `rotateX`, `rotateY`, `rotateZ`
- Skew: `skew`, `skewX`, `skewY`
- Perspective: `transformPerspective`

`motion` components have enhanced `style` props, allowing you to set them individually there, too.

```vue
<Motion
  class="box"
  :hover="{ scale: [null, 1.5, 1.2] }"
  :transition="{ duration: 0.5 }"
/>
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-qwnt8k?embed=1&file=src%2FDemo.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

**SVG note**: For SVG components, `x` and `y` attributes (as opposed to the transform style) can be set using `attrX` and `attrY` within animation props.

### Transform origin

`transform-origin` has three shortcut values that can be set and animated individually:

- `originX`
- `originY`
- `originZ`

If set as numbers, `originX` and `Y` default to a progress value between `0` and `1`. `originZ` defaults to pixels.

```vue
<Motion :style="{ originX: 0.5 }"/>
```

### CSS variables

Motion can animate the value of CSS variables, and also read CSS variables as animation targets.

#### Using pre-defined CSS variables in animation

HTML `motion` components can animate to and from CSS variables, as long as that variable is defined on a component ancestor.

```vue
<Motion
  class="box"
  :animate="{
    x: '0',
    backgroundColor: 'var(--color)',
  }"
/>
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-pczfda?embed=1&file=src%2FApp.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

#### Animating CSS variables

By defining and animating CSS variables, we can use a parent `motion` component to declaratively animate multiple DOM children.

CSS variables are also of an arbitary type, so Motion can't infer their default type. You're able to animate `rotate` as a number because Motion understands that it should be set as deg, whereas `'--rotate'` needs to be explicitly set with the unit type, e.g. `'360deg'`.

```vue
<Motion
  tag="ul"
  :initial="{
    '--rotate': '0deg',
  }"
  :animate="{
    '--rotate': '360deg',
  }"
  :transition="{
    duration: 2,
    repeat: Infinity,
  }"
>
  <li class="box" :style="{ transform: 'rotate(var(--rotate))' }" />
</Motion>
```
<!-- TODO: after fix the bug-->
<!-- <iframe
  src="https://stackblitz.com/edit/vitejs-vite-pczfda?embed=1&file=src%2FApp.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe> -->

### SVG line drawing
Line drawing animations can be created with many SVG elements using three special properties: `pathLength`, `pathSpacing` and `pathOffset`.

<!-- TODO: after fix the bug-->
<!-- <iframe
  src="https://stackblitz.com/edit/vitejs-vite-9voqhq?embed=1&file=src%2FApp.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe> -->

These are all set as a value between `0` and `1`, where `1` is the measured length of the path.

Path animations are compatible with `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline` and `rect` elements.

### Performance

Motion animates values outside the Vue render cycle for increased performance.

Using MotionValues instead of state to update visual properties will also avoid re-renders.

Where possible, animate just transform values and opacity, as they are GPU-accelerated. This way, you can animate hundreds of layers on modern mobile devices.

```vue
// GPU accelerated (fast)
<Motion :style="{ x: 0 }" :animate="{ x: 100 }" />

// CPU drawing (slower)
<Motion :style="{ left: 0 }" :animate="{ left: 100 }" />
```

### Server-side rendering

`motion` components are fully compatible with server-side rendering, meaning the initial state of a component will be reflected in the server-generated output.

```vue
// Server will output `translateX(100px)`
<Motion :initial="false" :animate="{ x: 100 }" />
```

#### Exceptions

The following SVG values are not currently compatible with server-side rendering: `scale`, `rotate`, `pathLength`, `pathOffset` and `pathSpacing`.

`scale` and `rotate` rely on the dynamic calculation of `transformOrigin` - `originX` and `originY` should be set as strings (either `px` or `%`) to support these server side.

```vue
<Motion tag="circle" :style="{ scale: 2, originX: '100px', originY: '100px' }" />
```

`path` values rely on the measurement of the overall path length. Setting `strokeDasharray` to `"0 1"` will hide the path until Motion can measure it.

```vue
<Motion tag="path" strokeDasharray="0 1" />
```

## Props

### tag

- default: `div`

Define a HTML or SVG tag to render.

```vue
<Motion tag="button">Button</Motion>
```

### animate

A target of values to animate to.

```vue
// As values
<Motion :animate="{ opacity: 1 }" />

// As variant
<Motion animate="visible" :variants="variants" />

// Multiple variants
<Motion :animate="['visible', 'active']" :variants="variants" />

// AnimationControls
<Motion :animate="animation" />
```

Whenever a value in animate changes, the element will automatically animate to the latest value.

The animate prop accepts all the same values and keyframes as Motion One's [animate function](https://motion.dev/dom/animate).

### initial
A target of values to animate from when the element is first rendered.

```vue
// As values
<Motion :initial="{ opacity: 1 }" />

// As variant
<Motion initial="visible" :variants="variants" />

// Multiple variants
<Motion :initial="['visible', 'active']" :variants="variants" />

// As false (disable mount animation)
<Motion :initial="false" :animate="{ opacity: 0 }" />
```

If set to false, the target defined in animate will be immediately set when the element is first rendered. Only subsequent changes to animate will animate.

### exit

A target of values to animate to when the element is hidden via v-if or v-show.

The element must be a direct child of the Presence component.

```vue
<script setup lang="ts">
import { Motion, Presence } from "@oku-ui/motion"
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
```

Note: This animation is only interruptible if the element is hidden via v-show.

The exit prop accepts all the same values and keyframes as Motion One's [animate function](https://motion.dev/dom/animate).

### transition

Provides a default transition for all animations to use.

```vue
<Motion :animate="{ x: 100 }" :transition="{ duration: 0.5 }" />
```

Supports all [animate options.](https://motion.dev/dom/animate#options)

The transition defined in this prop can be overridden for specific animation props by passing those a transition option:

## Gestures

Motion extends the basic set of event listeners provided by Vue with a simple yet powerful set of UI gesture recognisers.

[Learn more](../../guide/gestures.md)

## Events

The Motion components emit [custom DOM events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) to the rendered element. The detail prop is provided data on the related animation.

```vue
<script setup lang="ts">
import { Motion } from "@oku-ui/motion"

const logStart = ({ detail }) => console.log("Start: ", detail)
const logComplete = ({ detail }) => console.log("Complete: ", detail)
</script>

<template>
  <Motion
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    @motionstart="logStart"
    @motioncomplete="logComplete"
  />
</template>
```

### motionstart

Fires when any animation is started.

### motioncomplete

Fires when any animation is completed.

