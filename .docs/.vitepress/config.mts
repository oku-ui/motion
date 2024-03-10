import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'oku',
  description: 'A production-ready motion library for Vue3 and Nuxt3, built on the Web Animations API for the smallest filesize and the fastest performance. Powered by Motion One.',
  head: [
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/started/introduction' },
      { text: 'Guide', link: '/guide/simple-animations' },
      { text: 'API', link: '/apis/components/motion' },
      { text: 'Examples', link: 'https://stackblitz.com/@YeSuX/projects' },
    ],

    sidebar: {
      '/started/': [
        { text: 'Introduction', link: '../started/introduction' },
        { text: 'Quick Start', link: '../started/installation' },
      ],
      '/guide/': [
        { text: 'Simple Animations', link: '../guide/simple-animations' },
        { text: 'Transition', link: '../guide/transition' },
        { text: 'Gestures', link: '../guide/gestures' },
      ],
      '/apis/': [
        {
          text: 'Components',
          items: [
            {
              text: 'Motioin',
              link: '../apis/components/motion',
            },
            {
              text: 'PresenceGroup',
              link: '../apis/components/presence-group',
            },
            {
              text: 'Presence',
              link: '../apis/components/presence',
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oku-ui/motion' },
      { icon: 'discord', link: 'https://discord.gg/aFGBDrVuyT' },
      { icon: 'x', link: 'https://twitter.com/oku_ui' },
    ],
  },
})
