import path from 'node:path'
import { fileURLToPath } from 'node:url'
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
        '**/.docs/**', // .docs klasörünü hariç tut
        'src/components/stories/**',
      ],
      tsconfigPath: 'tsconfig.build.json',
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
      name: 'motion-vue',
      fileName: (format, name) => {
        return `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`
      },
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      output: {
        globals: {
          'vue': 'Vue',
          '@oku-ui/primitives': '@oku-ui/primitives',
        },
      },
      external: [
        'vue',
        '@oku-ui/primitives',
        '@oku-ui/motion', // Motion modülünü dışla
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
