<script setup lang="ts">
import type { SpringOptions } from '@motionone/dom'
import { spring, stagger } from '@motionone/dom'
import type { StaggerOptions } from '@motionone/dom/types/utils/stagger'
import Frame from '~/components/Frame.vue'

export interface Props {
  replay: boolean
}

withDefaults(defineProps<Props>(), {
  replay: true,
})

const data = ['a', 'b', 'c', 'd', 'e', 'f']

const frame = ref() as Ref<InstanceType<typeof Frame>>

const springValue: SpringOptions = reactive({
  stiffness: 24,
  damping: 12,
})

const staggerOptionsRa: StaggerOptions = reactive({
  easing: 'ease-in',
  start: 0.0,
  from: 'first',
})

const staggerDuration = ref(0.5)

const { paneRef, transitionValue, init, animate } = usePane({
  onInit() {
    init.x = 0
    init.y = 0
  },
  onAnimate(pane) {
    animate.y = -20

    pane.addBinding(animate, 'y', {
      label: 'Y',
      min: -50,
      max: 50,
      step: 10,
    }).on('change', (ev) => {
      animate.y = ev.value
    })
  },
  onTransition(pane) {
    transitionValue.easing = spring({ ...springValue })

    transitionValue.repeat = Number.POSITIVE_INFINITY

    transitionValue.direction = 'alternate'
    const springPane = pane.addFolder({
      title: 'Spring',
      expanded: true,
    })
    springPane.addBinding(springValue, 'stiffness', {
      label: 'Stiffness',
      min: 0,
      max: 100,
      step: 1,
    }).on('change', () => {
      transitionValue.easing = spring({ ...springValue })
      frame.value.onReplay()
    })

    springPane.addBinding(springValue, 'damping', {
      label: 'Damping',
      min: -4,
      max: 100,
      step: 1,
    }).on('change', () => {
      transitionValue.easing = spring({ ...springValue })
      frame.value.onReplay()
    })

    const staggerPane = pane.addFolder({
      title: 'Stagger',
      expanded: true,
    })

    staggerPane.addBinding(staggerDuration, 'value', {
      label: 'Duration',
      min: 0,
      max: 10,
      step: 0.1,
    }).on('change', (ev) => {
      staggerDuration.value = ev.value
      frame.value.onReplay()
    })

    const staggerOptionsPane = staggerPane.addFolder({
      title: 'Stagger Options',
      expanded: true,
    })

    staggerOptionsPane.addBinding(staggerOptionsRa, 'easing', {
      label: 'Easing',
      options: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        stepStart: 'step-start',
        stepEnd: 'step-end',
      },
    }).on('change', (ev) => {
      staggerOptionsRa.easing = ev.value
      frame.value.onReplay()
    })

    staggerOptionsPane.addBinding(staggerOptionsRa, 'from', {
      label: 'From',
      options: {
        first: 'first',
        last: 'last',
        center: 'center',
      },
    }).on('change', (ev) => {
      staggerOptionsRa.from = ev.value
      frame.value.onReplay()
    })

    staggerOptionsPane.addBinding(staggerOptionsRa, 'start', {
      label: 'Start',
      min: 0,
      max: 10,
      step: 0.1,
    }).on('change', (ev) => {
      staggerOptionsRa.start = ev.value
      frame.value.onReplay()
    })
  },
}, {
  initial: { hidden: true },
})

const liveCode = ref()

function getTransitionConfig(staggerDuration: any, staggerOptionsRa: any) {
  return `{
    easing: spring(${cleanConfig(springValue)}),
    repeat: Number.POSITIVE_INFINITY,
    direction: 'alternate',
    delay: stagger(${staggerDuration}, ${cleanConfig(staggerOptionsRa)})(index, items.length),
  }`.replace(/"/g, '')
}

watchEffect(() => {
  liveCode.value = `
<script setup lang="ts">
import { spring, stagger } from '@motionone/dom'
import { Motion, PresenceGroup } from '@oku-ui/motion'

const items = ['a', 'b', 'c', 'd', 'e', 'f']
<\/script>

<template>
  <PresenceGroup>
    <template v-for="(item, index) in items" :key="index">
      <Motion
        :initial="${cleanConfig(init)}"
        :animate="${cleanConfig(animate)}"
        :transition="${getTransitionConfig(staggerDuration.value, staggerOptionsRa)}"
        class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
      />
    </template>
  </PresenceGroup>
</template>
  
`.trim()
})
</script>

<template>
  <Frame ref="frame" :replay="replay">
    <template #default="{ reload }">
      <PresenceGroup v-if="reload">
        <template v-for="(item, index) in data" :key="index">
          <Motion
            :initial="{
              ...init,
            }"
            :animate="{
              ...animate,
            }"
            :transition="{
              delay: stagger(staggerDuration, staggerOptionsRa)(index, data.length),
              ...transitionValue,
            }"
            class="mt-2 flex justify-center items-center"
          >
            <div class="w-5 h-5 bg-rose-500 rounded-full mr-2" />
          </Motion>
        </template>
      </PresenceGroup>
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
