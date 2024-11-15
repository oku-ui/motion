import type { AnimationPlaybackControls } from 'motion/react'
import { type Plugin, reactive } from 'vue'
import { AnimationsKey } from './useStore'

export const MotionPlugin: Plugin = {
  install(app) {
    const animationInstances = reactive<{ [key: string]: AnimationPlaybackControls | undefined }>({})
    app.provide(AnimationsKey, animationInstances)
  },
}
