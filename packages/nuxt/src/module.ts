import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  autoImportComponents?: boolean
  autoImportMotion?: boolean
  prefix?: string
}

// export interface ModuleHooks {
//   'my-module:init': any
// }

// export interface ModulePublicRuntimeConfig {
//   NAME: string
// }

// export interface ModuleRuntimeConfig {
//   PRIVATE_NAME: string
// }

const motionComponents = [
  'Motion',
  'Presence',
  'PresenceGroup',
]

const motionImports = [
  'animate',
  'timeline',
  'stagger',
  'spring',
  'glide',
  'inView',
  'scroll',
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oku-ui/motion-nuxt',
    configKey: 'motion',
  },
  defaults: {
    autoImportComponents: true,
    autoImportMotion: true,
  },
  setup(options, nuxt) {
    // const resolver = createResolver(import.meta.url)

    // Transpile @oku-ui/motion
    nuxt.options.build.transpile.push('@oku-ui/motion')

    if (options.autoImportComponents) {
      motionComponents.forEach((component) => {
        addComponent({
          name: options.prefix ? `${options.prefix}${component}` : component,
          export: component,
          filePath: '@oku-ui/motion',
        })
      })
    }

    if (options.autoImportMotion) {
      motionImports.forEach((motion) => {
        addImports({
          from: '@oku-ui/motion',
          name: motion,
        })
      })
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
