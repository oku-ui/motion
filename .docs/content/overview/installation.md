# Installation

A quick tutorial to walk through installing the packages, as well as the supported plugins.

## Installing the package

<a href="https://www.npmjs.com/package/@oku-ui/motion" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@oku-ui/motion?flat&colorA=002438&colorB=41c399"></a>

<InstallationTabs value="@oku-ui/motion" />

## Nuxt modules

Oku Motion offers Nuxt modules support.

In `nuxt.config.ts`, simply add `@oku-ui/motion/nuxt` into the modules, and it will auto-imports all the components for you.

```ts
export default defineNuxtConfig({
  modules: ['@oku-ui/motion/nuxt'],
})
```

## unplugin-vue-components

Oku Motion also has resolver for the popular [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

In `vite.config.ts`, import `@oku-ui/motion/resolver`, and configure as such and it will auto-imports all the components from Oku Motion.

```ts{2,10  }
import Components from 'unplugin-vue-components/vite'
import OkuMotionResolver from '@oku-ui/motion/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        OkuMotionResolver()

        // OkuMotionResolver({
        //   prefix: '' // use the prefix option to add Prefix to the imported components
        // })
      ],
    }),
  ],
})
```
