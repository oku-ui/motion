// import { createContext } from '@oku-ui/primitives/hooks'
import type { InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'
import type { MotionState } from '@/state/motion-state'
import type { MountedStates } from '@/state/types'

/**
 * Create global state that can be injected into components.
 *
 * @see https://vueuse.org/createInjectionState
 *
 */
export function createContext<T>(contextName: string, defaultValue: T): readonly [useProvidingState: (state: T) => void, useContext: (consumerName?: any) => T]
export function createContext<T>(contextName: string): readonly [useProvidingState: (state: T) => void, useContext: (consumerName: any) => T]
export function createContext<T>(contextName: string, defaultValue?: T): readonly [useProvidingState: (state: T) => void, useContext: (consumerName?: any) => T] {
  const key: string | InjectionKey<T> = Symbol(contextName)

  const provideContext = (state: T) => {
    provide(key, state)
  }

  const useContext = (fallback?: any) => {
    const state = inject(key, fallback ?? defaultValue)

    if (state === null)
      return state as any

    if (!state)
      throw new Error(`\`${contextName}\` must be used within \`${contextName}\``)

    return state
  }

  return [provideContext, useContext, key]
}

export const [provideMotion, useMotion, motionKey] = createContext<MotionState | null>('MotionContext', null)
export const [provideMountedStates, useMountedStates, mountedStatesKey] = createContext<MountedStates>('mountedStates')

export const [provideAnimatePresence, useAnimatePresence, presenceKey] = createContext<PresenceContext>('AnimatePresenceContext', {
  initial: ref(false),
})

export interface PresenceContext {
  initial: Ref<boolean>
}
