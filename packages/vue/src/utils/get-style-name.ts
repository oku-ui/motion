import { asTransformCssVar, isTransform, transformAlias } from './transforms'

export function getStyleName(key: string): string | Exclude<keyof CSSStyleDeclaration, number> {
  if (transformAlias[key])
    key = transformAlias[key]
  return isTransform(key) ? asTransformCssVar(key) : key
}
