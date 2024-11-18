import { createContext } from '@oku-ui/primitives/hooks'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { MotionState } from '@/state/motion-state'

export const [provideMotion, useMotion, motionKey] = createContext<MotionState | null>('MotionContext', null)

export const [provideAnimatePresence, useAnimatePresence, presenceKey] = createContext<PresenceContext>('AnimatePresenceContext', {
  initial: ref(false),
})

export interface PresenceContext {
  initial: Ref<boolean>
}
