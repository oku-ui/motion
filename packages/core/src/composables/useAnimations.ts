import type { AnimationPlaybackControls } from 'motion/react'
import { useMountedStates } from '../share'

export function useAnimations(): {
  animations: Map<string, { animations: AnimationPlaybackControls[] }>
  stop: (key?: string) => void
  play: (key: string) => void
  getByID: (id?: string) => AnimationPlaybackControls[] | undefined
} {
  const animations = useMountedStates('useAnimations')
  if (!animations)
    throw new Error('useAnimations() is called without provider.')

  function stop(key?: string) {
    if (animations.size === 0) {
      console.warn('No animations to stop.')
      return
    }

    if (key && animations.has(key)) {
      animations.get(key)?.animations.forEach(animation => animation?.stop())
    }
    else {
      for (const value of animations.values())
        value.animations.forEach(animation => animation?.stop())
    }
  }

  function play(key: string) {
    if (animations.size === 0) {
      console.warn('No animations to play.')
      return
    }

    if (animations.has(key)) {
      animations.get(key)?.animations.forEach(animation => animation?.play())
    }
    else {
      for (const value of animations.values())
        value.animations.forEach(animation => animation?.play())
    }
  }

  function getByID(id?: string) {
    if (!id)
      return undefined

    return animations.get(id)?.animations
  }

  return {
    animations,
    stop,
    play,
    getByID,
  }
}
