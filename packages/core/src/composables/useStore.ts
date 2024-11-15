import type { AnimationPlaybackControls } from 'motion/react'
import type { InjectionKey } from 'vue'

export const AnimationsKey = Symbol('animations') as InjectionKey<{ [key: string]: AnimationPlaybackControls | undefined }>
