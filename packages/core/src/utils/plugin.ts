import type {
  Plugin,
} from 'vue'
import { reactive } from 'vue'

import { motionKey, presenceKey } from '../share'
import { MotionState } from '@/state'
import type { MotionPresenceProps } from '@/types'

export const motionPlugin: Plugin = {
  install(app) {
    const MotionPresenceProps = reactive<MotionPresenceProps>({
      mode: 'sync',
      initial: true,
      multiple: false,
    })

    const state = reactive(new MotionState({}))

    app.provide(motionKey, state as any)
    app.provide(presenceKey, MotionPresenceProps as any)
  },
}
