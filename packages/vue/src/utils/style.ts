import { isCssVar } from './css-var'
import { getStyleName } from './get-style-name'
import { transformDefinitions } from './transforms'

export const style = {
  // Retrieves the style value for the given property name from the element.
  get: (element: Element, name: string | Exclude<keyof CSSStyleDeclaration, number>): string | number | undefined => {
    name = getStyleName(name)
    let value: string | number | undefined = isCssVar(name)
      ? getCssVarValue(element, name)
      : getComputedStyleValue(element, name as Exclude<keyof CSSStyleDeclaration, number>)

    // If value is not found, attempt to get the default value from transformDefinitions.
    if (!value && Number.parseInt(value) !== 0)
      value = getDefaultValue(name)

    return value
  },

  // Sets the style value for the given property name on the element.
  set: (element: Element, name: string | Exclude<keyof CSSStyleDeclaration, number>, value: string | number) => {
    name = getStyleName(name)

    if (isCssVar(name))
      setCssVarValue(element, name, value as string)

    else
      setStyleProperty(element, name, value)
  },
}

// Retrieves the value of a CSS variable from the element.
function getCssVarValue(element: Element, name: string): string {
  if (element instanceof HTMLElement)
    return element.style.getPropertyValue(name)

  return ''
}

// Retrieves the computed style value from the element.
function getComputedStyleValue(element: Element, name: keyof CSSStyleDeclaration): string {
  return getComputedStyle(element)[name] as string
}

// Gets the default value for a style property from transformDefinitions.
function getDefaultValue(name: string): string | number | undefined {
  const definition = transformDefinitions.get(name)
  return definition ? definition.initialValue : undefined
}

// Sets a CSS variable on the element.
function setCssVarValue(element: Element, name: string, value: string) {
  if (element instanceof HTMLElement)
    element.style.setProperty(name, value)
}

// Sets a style property on the element.
function setStyleProperty(element: Element, name: string | Exclude<keyof CSSStyleDeclaration, number>, value: string | number) {
  if (element instanceof HTMLElement)
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
    element.style[name] = value
}
