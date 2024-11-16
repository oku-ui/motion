import type { Options } from '@/state/types'

export interface StateHandlers {
  enable: VoidFunction
  disable: VoidFunction
}

export interface Gesture {
  isActive: (options: Options) => void
  subscribe: (
    element: Element,
    stateHandlers: StateHandlers,
    options: Options
  ) => () => void
}
