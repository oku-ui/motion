import type { PrimitiveProps } from '@oku-ui/primitives'
import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'framer-motion'
import type { animate } from 'framer-motion/dom'
import type { CSSProperties, Reactive } from 'vue'
import type { MotionState } from './motion-state'
import type { SvgElementName } from '@/components/utils'

type AnimationPlaybackControls = ReturnType<typeof animate>

export interface Variant extends DOMKeyframesDefinition {
  transition?: DynamicAnimationOptions
}
type MarginValue = `${number}${'px' | '%'}`
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`
export interface InViewOptions {
  root?: Element | Document
  margin?: MarginType
  amount?: 'some' | 'all' | number
}
export interface Options {
  id?: string
  inViewOptions?: InViewOptions & { once?: boolean }
  inView?: string | Variant
  press?: string | Variant
  hover?: string | Variant
  initial?: string | Variant | boolean
  animate?: string | Variant
  exit?: string | Variant
  variants?: {
    [k: string]: Variant
  }
  transition?: DynamicAnimationOptions
  style?: CSSProperties
  isDefaultTransition?: boolean | undefined
  onMotionStart?: (target: DOMKeyframesDefinition) => void
  onMotionComplete?: (target: DOMKeyframesDefinition) => void
  onHoverStart?: (e: PointerEvent) => void
  onHoverEnd?: (e: PointerEvent) => void
  onPressStart?: (e: PointerEvent) => void
  onPressEnd?: (e: PointerEvent) => void
  onViewEnter?: (target: Element) => void
  onViewLeave?: (target: Element) => void
}

export interface MotionStateContext {
  initial?: string
  animate?: string
  inView?: string
  hover?: string
  press?: string
  exit?: string
}

export type AnimationFactory = () => AnimationPlaybackControls | undefined

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit: (v: number) => string | number
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }

export interface MotionProps extends Options {
  as?: PrimitiveProps['as'] | SvgElementName
  style?: CSSProperties
  hover?: Options['hover']
  press?: Options['press']
  inView?: Options['inView']
  inViewOptions?: Options['inViewOptions']
  id?: string
}

export type MountedStates = Reactive<Map<string, {
  element: Element
  state: MotionState
  animations: AnimationPlaybackControls[]
}>>
