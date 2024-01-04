<script setup lang="ts">
import type { SpringOptions } from '@oku-ui/motion'
import { spring, stagger } from '@oku-ui/motion'
import type { StaggerOptions } from '@motionone/dom/types/utils/stagger'
import Frame from '~/components/Frame.vue'

export interface Props {
  replay: boolean
}

const _props = withDefaults(defineProps<Props>(), {
  replay: false,
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

    pane.addInput(animate, 'y', {
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
    springPane.addInput(springValue, 'stiffness', {
      label: 'Stiffness',
      min: 0,
      max: 100,
      step: 1,
    }).on('change', () => {
      transitionValue.easing = spring({ ...springValue })
      frame.value.onReplay()
    })

    springPane.addInput(springValue, 'damping', {
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

    staggerPane.addInput(staggerDuration, 'value', {
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

    staggerOptionsPane.addInput(staggerOptionsRa, 'easing', {
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

    staggerOptionsPane.addInput(staggerOptionsRa, 'from', {
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

    staggerOptionsPane.addInput(staggerOptionsRa, 'start', {
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

watchEffect(() => {
  liveCode.value = `
<PresenceGroup v-if="reload">
  <template v-for="(item, index) in 5" :key="index">
    <Motion
      :initial=${replaceValue(init)}
      :animate=${replaceValue(animate)}
      :transition="${replaceValue({
        ...transitionValue,
        easing: `spring(${replaceFuntionValue(springValue)})`,
        delay: `stagger(${staggerDuration}, ${replaceFuntionValue(staggerOptionsRa)})(index, data.length)`,
        repeat: 'Infinity',
        direction: `'alternate'`,
    }).replace(/\\/g, '').replace(/"/g, '')
        }"
      class="bg-red-500 w-24 h-24 rounded-lg shadow-sm"
    />
      </Motion>
    </template>
</PresenceGroup>
`
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
            }" :animate="{
              ...animate,
            }" :transition="{
              delay: stagger(staggerDuration, staggerOptionsRa)(index, data.length),
              ...transitionValue,
            }" class="mt-2 flex justify-center items-center"
          >
            <div class="w-5 h-5 bg-rose-500 rounded-full mr-2" />
          </Motion>
        </template>
      </PresenceGroup>

      <!-- <div v-else class="h-40">
        <div class="flex items-center justify-center h-full">
          <div class="i-ph-arrow-clockwise-bold h-10 w-10 text-red-600  animate-spin" />
        </div>
      </div> -->
    </template>

    <template #setting>
      <div ref="paneRef" class="tweakpane mt-5 w-full overflow-auto h-full" />
    </template>

    <template #code>
      <ProseCode language="vue" :code="liveCode">
        <pre>
              <code>
                {{ liveCode }}
              </code>
            </pre>
      </ProseCode>
    </template>
  </Frame>
</template>
