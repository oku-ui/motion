---
title: 'Simple animations'
description: ''
next:
  text: 'Transition'
  link: '/guide/transition'
---

# Simple animations

## Animation

Most animations will be performed with the `motion` component and the animate prop.

```vue
<Motion :animate="{x: 100}" />
```

When any value in `animate` changes, the component will automatically animate to the updated target.

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-wmhgda?embed=1&file=src%2FDemo.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Enter animations

When a `motion` component is first created, it'll automatically animate to the values in `animate` if they're different from those defined in `style` or `initial`. You can set the initial prop to `false` to disable enter animations.

```vue
<Motion :animate="{ x: 100 }" :initial="false" />
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-aqkuft?embed=1&file=src%2Ftemplate%2FRefresh.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Exit animations

Oku Motion provides the `Presence component` to keep components in the DOM while they perform on exit animation.

```vue
<Presence>
  <Motion
    v-if="refresh"
    class="box"
    :initial="{ opacity: 0, scale: 1 }"
    :animate="{ opacity: 1, scale: 1.2 }"
    :exit="{ opacity: 0, x: '20px' }"
  />
</Presence>
```

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-gphfvx?embed=1&file=src%2FApp.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

## Keyframes

Values in `animate` can also be set as a series of keyframes. This will animate through each value in sequence.

```vue
<Motion
  :animate="{ x: [0, 100, 0] }"
/>
```

<!-- <iframe
  src="https://stackblitz.com/edit/vitejs-vite-bqgiwz?embed=1&file=src%2FDemo.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe> -->

We can use the current value as the initial keyframe by passing a **wildcard keyframe**, `null`.

```vue
<Motion
  :animate="{ x: [null, 100, 0] }"
/>
```

This way, if a keyframes animation starts while the value is currently animating, the transition will be more natural. It also reduces duplication in our code.

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-qwnt8k?embed=1&file=src%2FDemo.vue&hideExplorer=1&hideNavigation=1&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>

Each keyframe will be spaced evenly throughout the animaton. You can override this by setting the times option via transition.

times is an array of the same length as the keyframes array, with numbers between 0 and 1 definining where in the animation each keyframe should be hit.

```vue
<Motion
    class="box"
    :animate="{ scale: [null, 1.5, 0.8] }"
    :transition="{ duration: 3, times: [0, 0.2, 1] }"
  />
```
