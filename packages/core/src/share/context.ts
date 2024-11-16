import type { InjectionKey } from 'vue'
import type { AnimationInstance } from '../share'
import type { PresenceState } from './types'

export const contextId = 'motion-state'
export const prefix = 'oku-motion'
export const presenceId = Symbol('motion-presence') as InjectionKey<PresenceState>

export const AnimationsKey = Symbol('animations') as InjectionKey<AnimationInstance>
