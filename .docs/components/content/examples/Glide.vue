<script setup lang="ts">
import { animate, glide, spring } from '@motionone/dom'

export interface Props {
  replay: boolean
}

withDefaults(defineProps<Props>(), {
  replay: false,
})

const glideValue = reactive({
  velocity: -700,
  min: -800,
  bounceStiffness: 500,
  bounceDamping: 20,
})

const { paneRef, transitionValue, init, animate: paneAnimate } = usePane({
  onInit() {
    init.x = 100
  },
  onTransition(pane) {
    transitionValue.easing = glide(glideValue)

    pane.addBinding(glideValue, 'velocity', {
      label: 'Velocity',
      min: -1000,
      max: 100,
      step: 100,
    }).on('change', (ev) => {
      glideValue.velocity = ev.value
      transitionValue.easing = glide(glideValue)
    })

    pane.addBinding(glideValue, 'min', {
      label: 'Min',
      min: -1000,
      max: 7000,
      step: 100,
    }).on('change', (ev) => {
      glideValue.min = ev.value
      transitionValue.easing = glide(glideValue)
    })

    pane.addBinding(glideValue, 'bounceStiffness', {
      label: 'Bounce Stiffness',
      min: 0,
      max: 1000,
      step: 100,
    }).on('change', (ev) => {
      glideValue.bounceStiffness = ev.value
      transitionValue.easing = glide(glideValue)
    })

    pane.addBinding(glideValue, 'bounceDamping', {
      label: 'Bounce Damping',
      min: 0,
      max: 100,
      step: 1,
    }).on('change', (ev) => {
      glideValue.bounceDamping = ev.value
      transitionValue.easing = glide(glideValue)
    })
  },
})

const liveCode = ref()

watchEffect(() => {
  let _init = {}
  for (const key in init) {
    _init = {
      ...init,
      [key]: init[key],
    }
  }

  let _animate = {}
  for (const key in animate) {
    _animate = {
      ...animate,
      [key]: animate[key],
    }
  }

  let transition = {}
  for (const key in glideValue) {
    transition = {
      ...transition,
      [key]: glideValue[key],
    }
  }

  liveCode.value = `
<Presence>
    <Motion
      :initial="${cleanConfig(_init)}"
      :animate="${cleanConfig(paneAnimate)}"
      :transition="${cleanConfig(transition)}"
      class="bg-red-500 w-24 h-24 rounded-lg shadow-sm"
    />
</Presence>
`
})
</script>

<template>
  <Frame :replay="replay">
    <template #default="{ reload }">
      <PresenceGroup v-if="reload">
        <div class="flex space-x-2 px-24">
          <template v-for="(item, index) in 10" :key="index">
            <Motion
              :initial="{
                ...init,
              }" :animate="{
                ...animate,
              }" :transition="{
                ...transitionValue,
              }" class="mt-2 flex justify-center items-center"
            >
              <div class="bg-emerald-500 h-24 w-24 flex-shrink-0 rounded-md" />
            </Motion>
          </template>
        </div>
      </PresenceGroup>

      <div v-else class="h-40">
        <div class="flex items-center justify-center h-full">
          <div class="i-ph-arrow-clockwise-bold h-10 w-10 text-red-600  animate-spin" />
        </div>
      </div>
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
