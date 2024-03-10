import { defineConfig } from 'vitepress'
import { transformerTwoslash } from 'vitepress-plugin-twoslash'
import { nuxtCompilerOptions, prepend, typeDecorations } from './nuxtUtils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Motion',
  description: 'A production-ready motion library for Vue3 and Nuxt3, built on the Web Animations API for the smallest filesize and the fastest performance. Powered by Motion One.',
  /* prettier-ignore */
  head: [
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/pergel-logo-mini.svg' }],
    // ['link', { rel: 'icon', type: 'image/png', href: '/pergel-logo-mini.png' }],
    // ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Motion | Oku' }],
    ['meta', { property: 'og:site_name', content: 'Motion' }],
    // ['meta', { property: 'og:image', content: 'https://pergel.oku-ui.com/pergel-og.png' }],
    // ['meta', { property: 'og:url', content: 'https://pergel.oku-ui.com' }],
    [
      'script',
      {
        'async': '',
        'defer': '',
        'data-domain': 'motion.oku-ui.com',
        'src': 'https://rapor.vucod.com/js/script.js',
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/started/introduction' },
      { text: 'Guide', link: '/guide/simple-animations' },
      { text: 'API', link: '/apis/components/motion' },
      { text: 'Examples', link: 'https://stackblitz.com/@YeSuX/collections/oku-motion-examples' },
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
              link: '../components/motion',
            },
            {
              text: 'PresenceGroup',
              link: '../components/presence-group',
            },
            {
              text: 'Presence',
              link: '../components/presence',
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oku-ui/motion' },
      { icon: 'discord', link: 'https://chat.productdevbook.com' },
      { icon: 'x', link: 'https://twitter.com/oku_ui' },
    ],
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            lib: ['esnext', 'dom'],
            jsx: 1, // Preserve
            jsxImportSource: 'vue',
            ...nuxtCompilerOptions,
          },
          extraFiles: {
            ...typeDecorations,
            'index.ts': { prepend },
            'index.tsx': { prepend },
          },
        },
      }),
    ],
  },
})
