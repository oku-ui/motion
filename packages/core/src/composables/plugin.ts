import type { AnimationPlaybackControls, DOMKeyframesDefinition, DynamicAnimationOptions, ValueAnimationOptions } from 'motion/react'
import { type Directive, type DirectiveBinding, type Plugin, type VNode, reactive } from 'vue'
import { animate } from 'motion'
import { getDefaultTransition } from '../share'
import { AnimationsKey } from './useStore'
interface MotionElement extends HTMLElement {
  motion_playback_instance?: AnimationPlaybackControls // Renamed property with underscore
}

interface MotionSVGElement extends SVGElement {
  motion_playback_instance?: AnimationPlaybackControls // Renamed property with underscore
}

interface DirectiveValue {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
  key?: string
  initial?: DOMKeyframesDefinition // Initial keyframes added
}

export const MotionPlugin: Plugin = {
  install(app) {
    // Object to store animation instances
    const animationInstances = reactive<{ [key: string]: AnimationPlaybackControls | undefined }>({
      // Default value can be set here if needed
      defaultKey: undefined, // Example of a default key
    })

    // Function to create or update animation
    function createOrUpdateAnimation(el: MotionElement | MotionSVGElement, binding: DirectiveBinding<DirectiveValue>, node: VNode) {
      const key = binding.value.key || node.key as string

      const { keyframes, options, initial } = binding.value

      // Get transition based on keyframes keys
      const transition = keyframes ? getDefaultTransition(Object.keys(keyframes).join(','), options as Partial<ValueAnimationOptions>) : {}

      // Geçiş için tür belirleme
      const animationOptions = options || {} // Opsiyonlar varsa, yoksa boş bir obje.

      // 'transition' ve 'options' birleşimini net bir türle sağlayalım
      const animationParams: DynamicAnimationOptions = {
        ...transition,
        ...animationOptions,
      } as DynamicAnimationOptions

      // If there's an initial keyframes, apply it first
      if (initial) {
        // Start the initial animation with the provided keyframes and options
        const initialAnimation = animate(el, initial, animationParams)

        // Once the initial animation is finished, start the main animation
        initialAnimation.then(() => {
          // Start the main animation with the keyframes and options
          const animateResult = animate(el, keyframes, animationParams)
          if (key)
            animationInstances[key] = animateResult

          el.motion_playback_instance = animateResult // Updated property with underscore
        })

        // Store the initial animation in the instances
        if (key)
          animationInstances[key] = initialAnimation
        el.motion_playback_instance = initialAnimation // Updated property with underscore
      }
      else {
        // If there's no initial animation, directly start the main animation
        const animateResult = animate(el, keyframes, animationParams)
        if (key)
          animationInstances[key] = animateResult

        el.motion_playback_instance = animateResult // Updated property with underscore
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

        // Remove the animation instance from the storage
        if (key && animationInstances[key])
          delete animationInstances[key]
      },
    }

    // Register the directive and provide the animation instances to the app
    app.directive('animate', vAnimate)
    app.provide(AnimationsKey, animationInstances)
  },
}
