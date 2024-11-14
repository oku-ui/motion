import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const config: StorybookConfig = {
  stories: [
    '../stories/*.mdx',
    '../packages/core/src/**/stories/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
    },
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      define: { 'process.env': {} },
      resolve: {
        alias: {
          '@oku-ui/motion': fileURLToPath(new URL('../packages/core/src', import.meta.url)),
        },
      },
      css: {
        postcss: {
          plugins: [
            tailwind(),
            autoprefixer(),
          ],
        },
      },
    } as UserConfig)
  },

}
export default config
