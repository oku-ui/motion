---
title: 'Gestures'
description: 'A powerful gesture recognition system for the browser.'
prev:
  text: 'Transition'
  link: '/guide/transition'
---

# Gestures

Oku Motion extends the basic set of event listeners provided by Vue3 with a simple yet powerful set of UI gesture recognisers.

It currently has support for hover, press and more. Each gesture has a series of event listeners that you can attach to your `motion` component.

## Animation helpers

`motion` components provide multiple gesture animation props: `:hover`, `:tap`, `:focus`, `:drag` and `:in-view`. These can define animation targets to temporarily animate to while a gesture is active.

```html
<Motion
    :in-view="{ scale: [0.9, 1] }"
    :press="{ scale: 0.98 }"
    :transition="{ duration: 0.5 }"
  />
```

## Hover

The hover gesture detects when a pointer hovers a component.

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-qwnt8k?embed=1&file=src%2FDemo.vue&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
></iframe>
