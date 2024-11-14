import type { ResolvedValues } from 'motion/react'
import { buildHTMLStyles } from './transform/buildHTMLStyles.mjs'
import { buildTransform } from './transform/buildTransform.mjs'

export interface TransformOrigin {
  originX?: number | string
  originY?: number | string
  originZ?: number | string
}

export interface DOMVisualElementOptions {
  /**
   * If `true`, this element will be included in the projection tree.
   *
   * Default: `true`
   *
   * @public
   */
  allowProjection?: boolean

  /**
   * Allow this element to be GPU-accelerated. We currently enable this by
   * adding a `translateZ(0)`.
   *
   * @public
   */
  enableHardwareAcceleration?: boolean
}

export interface BuildProps {
  style: ResolvedValues
  vars: ResolvedValues
  transform: ResolvedValues
  transformOrigin: TransformOrigin
  config: DOMVisualElementOptions & { transformTemplate?: any }
}

export function generateHTMLStyles(
  latest: ResolvedValues,
  {
    style = {},
    vars = {},
    transform = {},
    transformOrigin = {},
    config = {},
  }: Partial<BuildProps> = {},
) {
  buildHTMLStyles(
    {
      style,
      vars,
      transform,
      transformOrigin,
    },
    latest,
    config.transformTemplate,
  )
}

export { buildTransform }
