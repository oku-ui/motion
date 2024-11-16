import type { DOMKeyframesDefinition } from 'framer-motion'
import { isCssVar, isNumber } from './utils'
import { buildTransformTemplate, isTransform, transformAlias, transformDefinitions } from './transform'

type MotionStyleKey = Exclude<
  keyof CSSStyleDeclaration,
  'length' | 'parentRule'
>

export const style = {
  get: (element: Element, name: string): string | undefined => {
    let value = isCssVar(name)
      ? (element as HTMLElement).style.getPropertyValue(name)
      : getComputedStyle(element)[name as MotionStyleKey]
    if (!value && value !== '0') {
      const definition = transformDefinitions.get(name)
      if (definition)
        value = definition.initialValue as any
    }
    return value as string | undefined
  },
  set: (element: Element, name: string, value: string | number) => {
    if (isCssVar(name)) {
      ;(element as HTMLElement).style.setProperty(name, value as string)
    }
    else {
      ;(element as HTMLElement).style[name as MotionStyleKey] = value as any
    }
  },
}

export function createStyles(keyframes?: DOMKeyframesDefinition): any {
  const initialKeyframes: any = {}
  const transforms: [string, any][] = []
  for (let key in keyframes) {
    const value = keyframes[key as keyof typeof keyframes]

    if (isTransform(key)) {
      if (key in transformAlias)
        key = transformAlias[key as keyof typeof transformAlias]
    }

    let initialKeyframe = Array.isArray(value) ? value[0] : value

    /**
     * If this is a number and we have a default value type, convert the number
     * to this type.
     */
    const definition = transformDefinitions.get(key)
    if (definition) {
      initialKeyframe = isNumber(value)
        ? definition.toDefaultUnit?.(value as number)
        : (typeof value === 'string' || typeof value === 'number' ? value : undefined)

      transforms.push([key, initialKeyframe])
    }
    else {
      initialKeyframes[key] = initialKeyframe
    }
  }
  if (transforms.length)
    initialKeyframes.transform = buildTransformTemplate(transforms)

  return initialKeyframes
}
