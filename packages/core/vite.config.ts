import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue() as any,
    vueJsx() as any,
    dts({
      cleanVueFileName: true,
      outDir: 'dist',
      exclude: [
        'src/test/**',
        '**/stories/**',
        'src/**/*.stories.vue',
        '**/.docs/**',
        'src/components/stories/**',
      ],
      tsconfigPath: 'tsconfig.build.json',
      afterBuild: async () => {
        // pnpm build:plugins
        execSync('pnpm build:plugins', { stdio: 'inherit', cwd: resolve(__dirname, '../plugins') })
        execSync('pnpm lint:fix', { stdio: 'inherit', cwd: resolve(__dirname, '../..') })
      },
    }),

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'framer-motion/dist/es/animation/utils/create-visual-element.mjs': path.resolve(__dirname, 'node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs'),
      'framer-motion/dist/es/render/store.mjs': path.resolve(__dirname, 'node_modules/framer-motion/dist/es/render/store.mjs'),
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      formats: ['es'],
      fileName: (format, name) => {
        return `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`
      },
      name: 'oku-ui-motion',
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
    },
    minify: false,
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      output: {
        esModule: true,
        globals: {
          'vue': 'Vue',
          '@oku-ui/primitives': '@oku-ui/primitives',
          'motion': 'motion',
          'framer-motion': 'framer-motion',
        },
      },
      external: [
        'vue',
        '@oku-ui/primitives',
        'motion',
        'framer-motion',
        fileURLToPath(
          new URL(
            'src/components/stories',
            import.meta.url,
          ),
        ),
      ],
    },
  },

})
