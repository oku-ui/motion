import type {
  Plugin,
} from 'vue'
import { reactive } from 'vue'

import { motionKey, mountedStatesKey, presenceKey } from '../share'
import { MotionState } from '@/state'
import type { AnimatePresenceProps } from '@/types'
import type { MountedStates } from '@/state/types'

export const motionPlugin: Plugin = {
  install(app) {
    // Object to store animation instances
    const mountedStates = reactive<MountedStates>(new Map())
    const animatePresenceProps = reactive<AnimatePresenceProps>({
      mode: 'sync',
      initial: true,
      multiple: false,
    })

    const state = reactive(new MotionState({}, mountedStates))

    app.provide(mountedStatesKey, mountedStates)
    app.provide(motionKey, state)
    app.provide(presenceKey, animatePresenceProps)
  },
}
