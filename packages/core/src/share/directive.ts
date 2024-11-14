import type { Directive, DirectiveBinding, Plugin } from 'vue'
import { animate } from 'motion'
import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react'

function createOrUpdateAnimation(el: HTMLElement | SVGElement, binding: DirectiveBinding<{
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
}>) {
  el.__internal_motion_instance?.stop()
  const { keyframes, options } = binding.value
  el.__internal_motion_instance = animate(el, keyframes, options)
}

export const vAnimate: Directive<HTMLElement | SVGElement, {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
}> = {
  mounted(el, binding) {
    createOrUpdateAnimation(el, binding)

    // DOM değişikliklerini gözlemlemek için MutationObserver kur
    const observer = new MutationObserver(() => {
      createOrUpdateAnimation(el, binding)
    })

    observer.observe(el, { attributes: true, childList: true, subtree: true })

    // @ts-expect-error: Observer'ı elemanla ilişkilendir
    el.__internal_observer = observer
  },
  updated(el, binding) {
    createOrUpdateAnimation(el, binding)
  },
  unmounted(el) {
    el.__internal_motion_instance?.stop()
    // @ts-expect-error: Observer'ı durdur ve temizle
    el.__internal_observer?.disconnect()
  },
}

export const MotionPlugin: Plugin = {
  install(app) {
    app.directive('animate', vAnimate)
  },
}
