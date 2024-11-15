import { inject } from 'vue'
import { AnimationsKey } from './useStore'

export function useAnimations() {
  const animations = inject(AnimationsKey)

  if (!animations)
    throw new Error('useAnimations() is called without provider.')

  function stop(key?: string) {
    if (!animations || Object.keys(animations).length === 0) {
      console.warn('No animations to stop.')
      return
    }

    if (key && animations[key])
      animations[key]?.stop()
    else
      Object.values(animations || {}).forEach(animation => animation?.stop())
  }

  function play(key: string) {
    if (!animations || Object.keys(animations).length === 0) {
      console.warn('No animations to play.')
      return
    }

    if (animations[key])
      animations[key]?.play()
    else
      console.warn(`No animation with key "${key}" found.`)
  }

  function getByID(id?: string) {
    if (!animations || Object.keys(animations).length === 0)
      return

    if (!id)
      return undefined // Eğer id yoksa, undefined döndür.

    const animation = animations[id] // Direkt id'ye erişim sağla.
    return animation // Animasyonu döndür.
  }

  return {
    animations,
    stop,
    play,
    getByID,
  }
}
