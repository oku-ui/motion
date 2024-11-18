import { defineBuildConfig } from 'unbuild'
import { dependencies } from './package.json'

export default defineBuildConfig([
  {
    name: 'Nuxt module',
    entries: ['./src/nuxt/index.ts'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    rollup: {
      emitCJS: true,
    },
    externals: [
      ...Object.keys(dependencies),
    ],

  },
  {
    name: 'Unplugin Resolver',
    entries: ['./src/resolver/index.ts'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    rollup: {
      emitCJS: true,
    },
    externals: [
      ...Object.keys(dependencies),
    ],
  },
])
