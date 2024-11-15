import { inject } from 'vue'
import { AnimationsKey } from './useStore'

export function useAnimations() {
  const animations = inject(AnimationsKey)

  if (!animations)
    throw new Error('useAnimations() is called without provider.')

  return animations
}
