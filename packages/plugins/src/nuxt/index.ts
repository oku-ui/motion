import { addComponent, addImports, addPluginTemplate, defineNuxtModule } from '@nuxt/kit'

import { components as allComponents, utilities as allUtiles } from '@oku-ui/motion'

export interface ModuleOptions {
  components: Partial<Record<keyof typeof allComponents, boolean>> | boolean
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oku-ui/motion',
    configKey: 'okuMotion',
    compatibility: {
      nuxt: '>=3.14',
    },
  },
  defaults: {
    prefix: '',
    components: true,
  },
  setup(options, _nuxtApp) {
    // nuxt.options.build.transpile.push('@oku-ui/motion')

    addPluginTemplate({
      filename: '001.okumotion.client.mjs',
      getContents() {
        return `import { motionPlugin } from '@oku-ui/motion'
        
       export default defineNuxtPlugin((nuxtApp) => {
          nuxtApp.vueApp.use(motionPlugin)
      })`
      },
    })

    function getComponents() {
      if (typeof options.components === 'object') {
        return Object.entries(allComponents)
          .filter(([name]) => (options.components as Record<string, boolean>)[name])
          .flatMap(([_, components]) => components)
      }

      if (options.components)
        return Object.values(allComponents).flat()

      return []
    }

    for (const component of getComponents()) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: '@oku-ui/motion',
      })
    }

    function getUtilities() {
      if (typeof options.components === 'object') {
        return Object.entries(allUtiles)
          .filter(([name]) => (options.components as Record<string, boolean>)[name])
          .flatMap(([_, utilities]) => utilities)
      }

      if (options.components)
        return Object.values(allUtiles).flat()

      return []
    }

    for (const utility of getUtilities()) {
      addImports({
        from: '@oku-ui/motion',
        name: utility,
      })
    }
  },
})
