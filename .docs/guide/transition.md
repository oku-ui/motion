---
title: 'Transition'
description: 'A transition defines how values animate from one state to another.'
next:
  text: 'Gestures'
  link: '/guide/gestures'
prev:
  text: 'Simple Animations'
  link: '/guide/simple-animations'
---

# Transition

A `transition` defines the type of animation used when animating between two values.

```html
<Motion
    :animate="{ opacity: 1, scale: 1.2 }"
    :transition="{ delay: 1 }"
  />
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-d1abbc?embed=1&file=src%2FDemo.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Value-specific transitions

A different set of transition setting can be defined for each specific value.

```html
<Motion
    class="box"
    :initial="{ opacity: 0, scale: 0.5 }"
    :animate="{ opacity: 1, scale: [1, 1.5, 1] }"
    :transition="{
      duration: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    }"
  />
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-jtvxkz?embed=1&file=src%2FDemo.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Orchestration

### delay

- type: `number`

Delay the animation by this duration (in seconds). Defaults to 0.

```ts
const transition = {
  delay: 0.2
}
```

By setting `delay` to a negative value, the animation will start that long into the animation. For instance to start 1 second in, `delay` can be set to `-1`.

### repeat

- type: `number`

The number of times to repeat the transition. Set to `Infinity` for perpetual repeating.

Without setting `repeatType`, this will loop the animation.

```html
<Motion
  :animate="{ rotate: 180 }"
  :transition="{ repeat: 'Infinity', duration: 2 }"
/>
```

### repeatType

- type: `"loop" | "reverse" | "mirror"`

How to repeat the animation. This can be either:

- `loop`: Repeats the animation from the start
- `reverse`: Alternates between forward and backwards playback
- `mirror`: Switches from and to alternately

```html
<Motion
  :animate="{ rotate: 180 }"
  :transition="{
    repeat: 1,
    repeatType: 'reverse',
    duration: 2
  }"
/>
```

### repeatDelay

- type: `number`

When repeating an animation, `repeatDelay` will set the duration of the time to wait, in seconds, between each repetition.

```html
<Motion
  :animate="{ rotate: 180 }"
  :transition="{ repeat: 'Infinity', repeatDelay: 1 }"
/>
```

## Miscellaneous

### TargetAndTransition

An object that specifies values to animate to. Each value may be set either as a single value, or an array of values.

It may also option contain these properties:

- `transition`: Specifies transitions for all or individual values.
- `transitionEnd`: Specifies values to set when the animation finishes.
