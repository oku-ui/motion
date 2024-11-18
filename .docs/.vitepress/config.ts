import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { version } from '../../packages/core/package.json'
import { teamMembers } from './contributors'
import {
  discord,
  font,
  github,
  ogImage,
  ogUrl,
  okuPrimitivesDescription,
  okuPrimitivesName,
  releases,
} from './meta'
import ComponentPreviewPlugin from './plugins/ComponentPreview'
import InstallationTabsPlugin from './plugins/InstallationTabs'
import { preWrapperPlugin } from './plugins/preWrapper'
import { snippetPlugin } from './plugins/snippet'

function BadgeHTML(text: string, translucent = false) {
  return `<div class="inline-flex items-center rounded-full border px-2.5 py-0.5 ml-2 mt-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo8 ${translucent ? 'bg-opacity-30' : ''} text-white">
${text}
</div>
`
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: okuPrimitivesName,
  description: okuPrimitivesDescription,
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  head: [
    ['meta', { name: 'theme-color', content: '#00C38A' }],
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    [
      'meta',
      { name: 'author', content: `${teamMembers.map(c => c.name).join(', ')} and ${okuPrimitivesName} contributors` },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'vue, nuxt, component-library, radix, radix-vue, typescript, oku motion',
      },
    ],
    ['meta', { property: 'og:title', content: okuPrimitivesName }],
    ['meta', { property: 'og:description', content: okuPrimitivesDescription }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: okuPrimitivesName }],
    ['meta', { name: 'twitter:description', content: okuPrimitivesDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'preload', as: 'style', onload: 'this.onload=null;this.rel=\'stylesheet\'', href: font }],
    ['noscript', {}, `<link rel="stylesheet" crossorigin="anonymous" href="${font}" />`],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    [
      'script',
      {
        'async': true,
        'defer': true,
        'data-domain': 'primitives.oku-ui.com',
        'src': 'https://rapor.vucod.com/js/script.js',
      },
    ],
  ],
  sitemap: {
    hostname: ogUrl,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/overview/getting-started.html' },
      { text: 'Showcase', link: '/showcase' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes ',
            link: releases,
          },
        ],
      },
    ],
    outline: {
      level: [2, 3],
    },
    logo: '/logo.svg',

    sidebar: [
      {
        text: 'Overview',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/overview/introduction' },
          { text: 'Getting Started', link: '/overview/getting-started' },
          { text: 'Installation', link: '/overview/installation' },
          { text: 'Releases', link: '/overview/releases' },
        ],
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Motion', link: '/components/motion' },
          { text: 'MotionPresence', link: '/components/motion-presence' },
        ],
      },
      {
        text: 'Composables',
        collapsed: false,
        items: [
          { text: 'useAnimate', link: '/composables/use-animate' },
          { text: 'useAnimations', link: '/composables/use-animations' },
          // { text: 'useMotionPresence', link: '/composables/use-motion-presence' },
        ],
      },
      {
        text: 'Animation',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/animation/overview' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'discord', link: discord },
      { icon: 'github', link: github },
    ],

    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/oku-ui/primitives/edit/main/docs/content/:path',
    },
  },
  srcDir: 'content',
  appearance: 'dark',
  markdown: {
    theme: 'material-theme-palenight',

    preConfig(md) {
      md.use(ComponentPreviewPlugin)
      md.use(InstallationTabsPlugin)
      md.use(snippetPlugin)
    },
    config(md) {
      md.use(preWrapperPlugin)
    },
  },
  transformPageData(pageData) {
    if (pageData.frontmatter.sidebar != null)
      return
    // hide sidebar on showcase page
    pageData.frontmatter.sidebar = pageData.frontmatter.layout !== 'showcase'
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwind(),
          autoprefixer(),
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] }),
        ],
      },
    },
  },
})
