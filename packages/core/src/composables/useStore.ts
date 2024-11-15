import type { AnimationPlaybackControls } from 'motion/react'
import type { InjectionKey } from 'vue'
import type { AnimationInstance } from '../share'

/**
 * A global store of all generated motion states. This can be used to lookup
 * a motion state for a given Element.
 */
export const mountedStates = new WeakMap<{
  key: string
}, {
  animation: AnimationPlaybackControls
}>()

export const AnimationsKey = Symbol('animations') as InjectionKey<AnimationInstance>
