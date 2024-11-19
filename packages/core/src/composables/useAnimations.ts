import { getStates } from '@/state'

export function useAnimations() {
  const { motionStatesIdElements } = getStates()

  if (!motionStatesIdElements)
    throw new Error('useAnimations() is called without provider.')

  function animations() {
    return motionStatesIdElements.entries()
  }

  function stop(key?: string) {
    if (motionStatesIdElements.size === 0) {
      console.warn('No animations to stop.')
      return
    }

    if (key && motionStatesIdElements.has(key)) {
      motionStatesIdElements.get(key)?.animations.forEach(animation => animation?.stop())
    }
    else {
      for (const value of motionStatesIdElements.entries())
        value[1].animations.forEach(animation => animation?.stop())
    }
  }

  function play(key?: string) {
    if (motionStatesIdElements.size === 0) {
      console.warn('No animations to play.')
      return
    }

    if (key && motionStatesIdElements.has(key)) {
      motionStatesIdElements.get(key)?.animations.forEach(animation => animation?.play())
    }
    else {
      for (const value of motionStatesIdElements.entries())
        value[1].animations.forEach(animation => animation?.play())
    }
  }

  function getByID(id?: string) {
    if (!id)
      return

    return motionStatesIdElements.get(id)?.animations
  }

  return {
    animations,
    stop,
    play,
    getByID,
  }
}
