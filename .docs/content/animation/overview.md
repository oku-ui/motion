---
title: Animation
description: Motion for Vue offers a number of ways to animate your UI. Scaling from extremely simple prop-based animations, to more complex orchestration.
name: accordion
aria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion
---

## Animation

<Description>
Motion for Vue offers a number of ways to animate your UI. Scaling from extremely simple prop-based animations, to more complex orchestration.
</Description>


## Installation

Install the component from your command line.

<InstallationTabs value="@oku-ui/motions" />

## Basic animations
You'll perform almost all animations on a <motion /> component. This is basically a DOM element with motion superpowers.

```vue
import { Motion } from "@oku-ui/motion"
``` 

For basic animations, you can update values on the animate prop:

```vue
<Motion :animate={ opacity: 1 } />
```
When any value in its animate prop changes, the component will automatically animate to the new target.


<ComponentPreview name="BasicAnimations" />

## Animatable values
Motion can animate any CSS value, even those that can't be animated by browsers, like mask-image. It supports:

- Numbers: 0, 100 etc.
- Strings containing numbers: "0vh", "10px" etc.
- Colors: Hex, RGBA, HSLA.
- Complex strings containing multiple numbers and/or colors (like box-shadow).
- display: none/block and visibility: hidden/visible.

<!-- <Highlights
  :features="[
    'Full keyboard navigation.',
    'Supports horizontal/vertical orientation.',
    'Supports Right to Left direction.',
    'Can expand one or multiple items.',
    'Can be controlled or uncontrolled.'
  ]"
/> -->

