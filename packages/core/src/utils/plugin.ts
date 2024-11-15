import type {
  DynamicAnimationOptions,
  ValueAnimationOptions,
} from 'motion/react'
import type {
  Directive,
  DirectiveBinding,
  Plugin,
  VNode,
} from 'vue'
import { reactive } from 'vue'
import { animate } from 'motion'
import type {
  AnimationInstance,
  DirectiveValue,
  MotionElement,
  MotionSVGElement,
} from '../share'
import { AnimationsKey, getDefaultTransition, mergeStyles, presenceId } from '../share'

export const motionPlugin: Plugin = {
  install(app) {
    // Object to store animation instances
    const animationInstances = reactive<AnimationInstance>({})

    // Function to create or update animation
    function createOrUpdateAnimation(
      el: MotionElement | MotionSVGElement,
      binding: DirectiveBinding<DirectiveValue>,
      node: VNode,
      updated: boolean = false,
    ) {
      const key = binding.value.key || node.key as string

      const { keyframes, options, initial, exit, waitExit } = binding.value

      // Get transition based on keyframes keys
      const transition = keyframes ? getDefaultTransition(Object.keys(keyframes).join(','), options as Partial<ValueAnimationOptions>) : {}

      const animationOptions = options || {}

      const animationParams: DynamicAnimationOptions = {
        ...transition,
        ...animationOptions,
      } as DynamicAnimationOptions

      if (updated) {
        requestAnimationFrame(() => {
          if (animationInstances[key])
            animationInstances[key].motion_playback_instance?.complete()

          const motion = animate(el, keyframes, options)

          animationInstances[key] = {
            motion_playback_instance: motion,
          }
        })
        return
      }

      animationInstances[key] = {
        keyframes,
        exit,
        initial,
        key,
        options: animationParams,
      }

      if (initial) {
        mergeStyles(el, initial)
        // Start the main animation with the keyframes and options

        if (waitExit)
          return

        const motion = animate(el, keyframes, options)

        animationInstances[key] = {
          motion_playback_instance: motion,
        }

        el.motion_playback_instance = motion
      }
      else {
        // Start the main animation with the keyframes and options
        const motion = animate(el, keyframes, options)

        animationInstances[key] = {
          motion_playback_instance: motion,
        }

        el.motion_playback_instance = motion
      }
    }

    // Directive definition for 'v-animate'
    const vAnimate: Directive<MotionElement | MotionSVGElement, DirectiveValue> = {
      mounted: (el, binding, node) => {
        createOrUpdateAnimation(el, binding, node)
      },
      updated: (el, binding, node) => {
        createOrUpdateAnimation(el, binding, node, true)
      },
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
      waitExit: false,
    })
  },
}
