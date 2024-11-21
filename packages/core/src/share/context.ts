import { createContext } from '@oku-ui/primitives'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { MotionState } from '@/state/motion-state'

export const [provideMotion, useMotion, motionKey] = createContext<MotionState | null>('MotionContext', null)

export const [provideMotionPresence, useMotionPresence, presenceKey] = createContext<PresenceContext>('MotionPresenceContext', {
  initial: ref(false),
})

export interface PresenceContext {
  initial: Ref<boolean>
}
