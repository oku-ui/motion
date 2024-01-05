<script setup lang="ts">
export interface Props {
  replay: boolean
}

withDefaults(defineProps<Props>(), {
  replay: false,
})

const { paneRef, transitionValue, init, animate } = usePane({

  onInit() {
    init.x = 0
    init.y = 0
    init.rotate = 0
    init.scale = 1
  },

  onAnimate(panel) {
    animate.x = 0
    animate.y = 0
    animate.rotate = 0
    animate.scale = 1

    animate.transition = {
      duration: 0.0,
      easing: 'ease-in',
    }

    panel.addBinding(animate, 'x', {
      label: 'X',
      min: -100,
      max: 100,
      step: 1,
    }).on('change', (ev) => {
      animate.x = ev.value
    })

    panel.addBinding(animate, 'y', {
      label: 'Y',
      min: -100,
      max: 100,
      step: 1,
    }).on('change', (ev) => {
      animate.y = ev.value
    })

    panel.addBinding(animate, 'rotate', {
      label: 'Rotate',
      min: 0,
      max: 360,
      step: 1,
    }).on('change', (ev) => {
      animate.rotate = ev.value
    })

    panel.addBinding(animate, 'scale', {
      label: 'Scale',
      min: 0,
      max: 2,
      step: 0.1,
    }).on('change', (ev) => {
      animate.scale = ev.value
    })
  },

}, {
  transition: {
    hidden: true,
  },
  initial: {
    hidden: true,
  },
})

const liveCode = ref()

watchEffect(() => {
  liveCode.value = `
<Presence>
    <Motion
      :initial="${cleanConfig(init)}"
      :animate="${cleanConfig(animate)}"
      :transition="${cleanConfig(transitionValue)}"
      class="bg-red-500 w-24 h-24 rounded-lg shadow-sm"
    />
</Presence>
`
})
</script>

<template>
  <Frame :replay="replay">
    <template #default="{ reload }">
      <Presence v-if="reload">
        <Motion
          :initial="{
            ...init,
          }" :animate="{
            ...animate,
          }" :transition="{
            ...transitionValue,
          }" class="bg-red-500 w-24 h-24 rounded-lg shadow-sm"
        />
      </Presence>
    </template>

    <template #setting>
      <div ref="paneRef" class="tweakpane mt-5 w-full overflow-auto h-full" />
    </template>

    <template #code>
      <CodeGroup>
        <ProsePre
          :code="liveCode"
          language="vue"
          filename="Code"
          :highlights="[1, 2, 3]"
          icon="i-ph-code"
        >
          {{ liveCode }}
        </ProsePre>
      </CodeGroup>
    </template>
  </Frame>
</template>
