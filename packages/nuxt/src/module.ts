import { addComponent, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  autoImportComponents?: boolean
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

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oku-ui/motion-nuxt',
    configKey: 'motion',
  },
  defaults: {
    autoImportComponents: true,
  },
  setup(options, _nuxt) {
    // const resolver = createResolver(import.meta.url)

    if (options.autoImportComponents) {
      motionComponents.forEach((component) => {
        addComponent({
          name: `${options.prefix}${component}`,
          export: component,
          filePath: '@oku-ui/motion',
        })
      })
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
