// https://nuxt.com/docs/api/configuration/nuxt-config
import { defu } from 'defu'
import type { NuxtConfig } from 'nuxt/config'

const routeRules = {
  '/motion/getting-started': { redirect: '/motion/getting-started/introduction', prerender: false },
  '/motion/community': { redirect: '/motion/community/getting-help', prerender: false },
  '/motion/examples': { redirect: '/motion/examples/overview', prerender: false },
}

const devConfig = {
  $development: {
    runtimeConfig: {
      public: {
        website: {
          url: 'http://localhost:3000',
        },
      },
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@oku-ui/motion-nuxt',
    // 'nuxt-og-image',
  ],
  extends: [
    '@nuxt/ui-pro',
  ],
  devtools: { enabled: true },
  ui: {
    icons: ['heroicons', 'simple-icons', 'ph', 'game-icons'],
  },
  routeRules: {
    '/': { redirect: '/motion' },
    ...routeRules,
  },
  ogImage: {
    defaults: {
      extension: 'png',
    },
  },
  tailwindcss: {
    viewer: false,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },

} as NuxtConfig

// eslint-disable-next-line node/prefer-global/process
export default defineNuxtConfig(defu({}, process.env.DEV && devConfig, {
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'ph', 'game-icons', 'carbon', 'fa-brands'],
  },
  routeRules: {
    ...routeRules,
  },
} as NuxtConfig))
