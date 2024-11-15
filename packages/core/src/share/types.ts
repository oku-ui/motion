import type { AnimationPlaybackControls, DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react'

export interface MotionProps {
  // Vue
  id?: string
  as?: string
  waitExit?: boolean

  // Motion
  keyframes?: DOMKeyframesDefinition | ((index: number) => DOMKeyframesDefinition)
  options?: DynamicAnimationOptions
  initial?: DOMKeyframesDefinition | ((index: number) => DOMKeyframesDefinition)
  exit?: DOMKeyframesDefinition | ((index: number) => DOMKeyframesDefinition)

  // Plugins
  index?: number
  key?: string
  motion_playback_instance?: AnimationPlaybackControls
}

export type MotionPropsVue = Omit<MotionProps, 'key' | 'motion_playback_instance'>

export interface AnimationInstance {
  [key: string]: Omit<MotionProps, 'id' | 'as' | 'waitExit'>
}

export interface MotionElement extends HTMLElement {
  motion_playback_instance?: AnimationPlaybackControls
}

export interface MotionSVGElement extends SVGElement {
  motion_playback_instance?: AnimationPlaybackControls
}

export type PresenceState = Pick<MotionProps, 'waitExit'>

export type PresenceStateVue = PresenceState & {
  appear?: boolean
}

export interface DirectiveValue extends PresenceState {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
  key?: string
  initial?: DOMKeyframesDefinition
  exit?: DOMKeyframesDefinition
}
