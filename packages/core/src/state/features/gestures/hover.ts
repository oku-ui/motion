import type { Gesture } from './types'
import { dispatchPointerEvent } from '@/utils/events'
import type { MotionState } from '@/state/motion-state'
import { BaseGesture } from '@/state/features/gestures'

function mouseEvent(element: Element, name: 'hoverstart' | 'hoverend', action: VoidFunction) {
  return (event: PointerEvent) => {
    if (event.pointerType && event.pointerType !== 'mouse')
      return
    action()
    dispatchPointerEvent(element, name, event)
  }
}

export const hover: Gesture = {
  isActive: options => Boolean(options.hover),
  subscribe: (element, { enable, disable }) => {
    const onEnter = mouseEvent(element, 'hoverstart', enable)
    const onLeave = mouseEvent(element, 'hoverend', disable)
    element.addEventListener('pointerenter', onEnter as EventListener)
    element.addEventListener('pointerleave', onLeave as EventListener)

    return () => {
      element.removeEventListener('pointerenter', onEnter as EventListener)
      element.removeEventListener('pointerleave', onLeave as EventListener)
    }
  },
}

export class HoverGesture extends BaseGesture {
  isActive() {
    return Boolean(this.state.getOptions().hover)
  }

  constructor(state: MotionState) {
    super(state)
    this.subscribeEvents = () => {
      const element = this.state.getElement()
      if (!element)
        return () => {}

      const onEnter = mouseEvent(element, 'hoverstart', () => {
        this.state.setActive('hover', true)
      })
      const onLeave = mouseEvent(element, 'hoverend', () => {
        this.state.setActive('hover', false)
      })
      element.addEventListener('pointerenter', onEnter as EventListener)
      element.addEventListener('pointerleave', onLeave as EventListener)
      return () => {
        element.removeEventListener('pointerenter', onEnter as EventListener)
        element.removeEventListener('pointerleave', onLeave as EventListener)
      }
    }
  }

  mount() {
    this.updateGestureSubscriptions()
  }

  override update() {
    this.updateGestureSubscriptions()
  }
}
