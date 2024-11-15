import type { DynamicAnimationOptions, ValueAnimationOptions } from 'motion/react'
import { type Directive, type DirectiveBinding, type Plugin, type VNode, reactive } from 'vue'
import { animate } from 'motion'
import { type AnimationInstance, type DirectiveValue, type MotionElement, type MotionSVGElement, getDefaultTransition, mergeStyles, presenceId } from '../share'
import { AnimationsKey } from './useStore'

export const MotionPlugin: Plugin = {
  install(app) {
    // Object to store animation instances
    const animationInstances = reactive<AnimationInstance>({

    })

    // Function to create or update animation
    function createOrUpdateAnimation(
      el: MotionElement | MotionSVGElement,
      binding: DirectiveBinding<DirectiveValue>,
      node: VNode,
    ) {
      const key = binding.value.key || node.key as string

      const { keyframes, options, initial, exit, exitBeforeEnter } = binding.value

      // Get transition based on keyframes keys
      const transition = keyframes ? getDefaultTransition(Object.keys(keyframes).join(','), options as Partial<ValueAnimationOptions>) : {}

      // Geçiş için tür belirleme
      const animationOptions = options || {} // Opsiyonlar varsa, yoksa boş bir obje.

      // 'transition' ve 'options' birleşimini net bir türle sağlayalım
      const animationParams: DynamicAnimationOptions = {
        ...transition,
        ...animationOptions,
      } as DynamicAnimationOptions

      if (initial) {
        mergeStyles(el, initial)
        // Start the main animation with the keyframes and options

        if (exitBeforeEnter) {
          animationInstances[key] = {
            keyframes,
            exit,
            initial,
            key,
            options: animationParams,
          }
          return
        }

        const motion = animate(el, keyframes, options)

        animationInstances[key] = {
          keyframes,
          exit,
          initial,
          key,
          options: animationParams,
          motion_playback_instance: motion,
        }
        el.motion_playback_instance = motion
      }
      else {
        // Start the main animation with the keyframes and options
        const motion = animate(el, keyframes, options)

        animationInstances[key] = {
          keyframes,
          exit,
          initial,
          key,
          options: animationParams,
          motion_playback_instance: motion,
        }

        el.motion_playback_instance = motion
      }
    }

    // Directive definition for 'v-animate'
    const vAnimate: Directive<MotionElement | MotionSVGElement, DirectiveValue> = {
      mounted: createOrUpdateAnimation,
      updated: createOrUpdateAnimation,
      unmounted(el, binding, node) {
        const key = binding.value.key || node.key as string

        // Stop the animation before removing
        el.motion_playback_instance?.stop() // Updated property with underscore

        // Remove the animation from the instances
        if (key && animationInstances)
          delete animationInstances[key]
      },
    }

    // Register the directive and provide the animation instances to the app
    app.directive('animate', vAnimate)
    app.provide(AnimationsKey, animationInstances)
    app.provide(presenceId, {
      exitBeforeEnter: false,
    })
  },
}
