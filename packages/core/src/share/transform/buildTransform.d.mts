import type { MotionProps } from 'motion/react'

/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
declare function buildTransform(latestValues: any, transform: any['transform'], transformTemplate?: MotionProps['transformTemplate']): string

export { buildTransform }
