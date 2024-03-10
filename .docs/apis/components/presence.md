---
title: Presence
description: Perform exit animations in Vue.
icon: i-ph-brackets-curly-duotone
prev:
  text: 'Transition'
  link: '/apis/components/transition'
---

# Presence

```ts
<Presence>
  <Motion
    v-show="show"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }">
  </Motion>
</Presence>
``` 

# Usage
Import Motion from "@oku-ui/motion" and register it with your component.


```ts
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

<style>
:root {
  --splash: #fca311;
}

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

Now, when a child `Motion` component is hidden with `v-if` or `v-show`, it will animate to the target defined in `exit` prop.

Note: Presence currently only supports a single rendered child.


## Animate between elements

By passing a different `key` to multiple children and rendering just one at a time, we can animate between them at a given time.


```ts
<script setup lang="ts">
import { Motion, Presence } from "@oku-ui/motion"

const current = ref(0)
</script>

<template>
  <div class="container">
    <Presence>
      <Motion
        :key="current"
        :initial="{ opacity: 0, x: 50 }"
        :animate="{
          opacity: 1,
          x: 0,
          transition: { delay: 0.1 }
        }"
        :exit="{ opacity: 0, x: -50 }"
        class="slide"
      >
        {{ current }}
      </Motion>
    </Presence>
    <button @click="current++">
      Next
    </button>
  </div>
</template>

<style>
:root {
  --red: #e63946;
  --white: #f1faee;
}

.container {
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.container button {
  cursor: pointer;
}

.slide {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--red);
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  line-height: 72px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
```

In the above example, each element has the position: absolute CSS rule so when the incoming element is rendered it doesn't conflict with the element animating away.

In situations where this isn't possible, `:exitBeforeEnter="true"` can be set on Presence to ensure the exiting element animates out before the entering element is rendered.


## Props

### initial

default: `true`

If `false`, will disable the first animation on all child `Motion` elements the first time `Presence` is rendered.


### exitBeforeEnter

default: `false`

If `true`, Presence will wait for the exiting element to finish animating out before animating in the next one.
