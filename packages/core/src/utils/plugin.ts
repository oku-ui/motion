import type {
  Plugin,
} from 'vue'
import { reactive } from 'vue'

import { motionKey, presenceKey } from '../share'
import { MotionState } from '@/state'
import type { AnimatePresenceProps } from '@/types'

export const motionPlugin: Plugin = {
  install(app) {
    const animatePresenceProps = reactive<AnimatePresenceProps>({
      mode: 'sync',
      initial: true,
      multiple: false,
    })

    const state = reactive(new MotionState({}))

    app.provide(motionKey, state as any)
    app.provide(presenceKey, animatePresenceProps as any)
  },
}
