import type {
  AnimationOptionsWithOverrides,
  InViewOptions,
  VariantDefinition,
  Variants,
} from '@motionone/dom'

export interface MotionProps {
  tag?: string
  initial?: VariantDefinition | boolean
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  exit?: VariantDefinition
  variants?: Variants
  inViewOptions?: InViewOptions
  transition?: AnimationOptionsWithOverrides
}
