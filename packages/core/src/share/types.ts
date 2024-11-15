import type { AnimationPlaybackControls, DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react'

export interface MotionProps {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
  key?: string
  initial?: DOMKeyframesDefinition
  exit?: DOMKeyframesDefinition
  motion_playback_instance?: AnimationPlaybackControls
}

export interface AnimationInstance {
  [key: string]: MotionProps
}

export interface MotionElement extends HTMLElement {
  motion_playback_instance?: AnimationPlaybackControls // Renamed property with underscore
}

export interface MotionSVGElement extends SVGElement {
  motion_playback_instance?: AnimationPlaybackControls // Renamed property with underscore
}

export interface PresenceState {
  exitBeforeEnter?: boolean
}

export interface DirectiveValue extends PresenceState {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
  key?: string
  initial?: DOMKeyframesDefinition
  exit?: DOMKeyframesDefinition
}
