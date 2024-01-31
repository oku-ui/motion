import type { CssPropertyDefinition, CssPropertyDefinitionMap } from '@motionone/dom'
import { noopReturn } from './noop'

// Prefixes a name with `--motion-` to create a CSS variable name for a transform.
export const asTransformCssVar = (name: string) => `--motion-${name}`

// Maps shorthand names to their full transform equivalents.
export const transformAlias: { [key: string]: string } = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ',
}

const order = ['translate', 'scale', 'rotate', 'skew'] // Ordered array of each transformable value.
export const axes = ['', 'X', 'Y', 'Z'] // List of all transformable axes.
export const transformDefinitions = new Map<string, CssPropertyDefinition>()

// Default properties for different transform types.
const rotation: CssPropertyDefinition = {
  syntax: '<angle>',
  initialValue: '0deg',
  toDefaultUnit: (v: number) => `${v}deg`,
}

const baseTransformProperties: CssPropertyDefinitionMap = {
  translate: {
    syntax: '<length-percentage>',
    initialValue: '0px',
    toDefaultUnit: (v: number) => `${v}px`,
  },
  rotate: rotation,
  scale: {
    syntax: '<number>',
    initialValue: 1,
    toDefaultUnit: noopReturn,
  },
  skew: rotation,
}

// Generate and set definitions for each transform property.
generateTransformDefinitions()

// Provide a quick way to check if a string is the name of a transform.
const transformLookup = new Set(Object.keys(transformAlias).concat(order.flatMap(name => axes.map(axis => name + axis))))
export const isTransform = (name: string) => transformLookup.has(name)

// Generates transform definitions for each combination of transform types and axes.
function generateTransformDefinitions() {
  order.forEach((name) => {
    axes.forEach((axis) => {
      const key = name + axis
      transformDefinitions.set(asTransformCssVar(key), baseTransformProperties[name])
    })
  })
}
