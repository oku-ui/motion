import type { InjectionKey } from 'vue'
import type { PresenceState } from './types'

export const contextId = 'motion-state'
export const prefix = 'oku-motion'
export const presenceId = Symbol('motion-presence') as InjectionKey<PresenceState>
