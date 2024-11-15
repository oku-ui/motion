import { inject } from 'vue'
import type { AnimationPlaybackControls, DOMKeyframesDefinition, DynamicAnimationOptions, ValueAnimationOptions } from 'motion/react'
import { animate } from 'motion'
import type { MotionElement, MotionProps, MotionSVGElement } from '../share'
import { AnimationsKey, getDefaultTransition } from '../share'

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
      animations[key]?.motion_playback_instance?.stop()
    else
      Object.values(animations || {}).forEach(animation => animation?.motion_playback_instance?.stop())
  }

  function play(key: string) {
    if (!animations || Object.keys(animations).length === 0) {
      console.warn('No animations to play.')
      return
    }

    if (animations[key])
      animations[key]?.motion_playback_instance?.play()
    else
      console.warn(`No animation with key "${key}" found.`)
  }

  function getByID(id?: string, element?: MotionElement | MotionSVGElement): Partial<MotionProps> | undefined {
    if (!animations)
      return

    if (!id)
      return undefined

    const animation: Partial<MotionProps> = {
      ...animations[id],
      motion_playback_instance: element?.motion_playback_instance,
    }
    return animation
  }

  function createAnimate(
    el: MotionElement | MotionSVGElement,
    keyframes: DOMKeyframesDefinition,
    options?: DynamicAnimationOptions,
  ): AnimationPlaybackControls {
    const transition = keyframes ? getDefaultTransition(Object.keys(keyframes).join(','), options as Partial<ValueAnimationOptions>) : {}
    // 'transition' ve 'options' birleşimini net bir türle sağlayalım
    const animationParams: DynamicAnimationOptions = {
      ...transition,
      ...options,
    } as DynamicAnimationOptions

    return animate(el, keyframes, animationParams)
  }

  return {
    animations,
    stop,
    play,
    getByID,
    createAnimate,
  }
}
