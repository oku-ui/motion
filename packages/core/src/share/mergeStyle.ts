import { generateHTMLStyles } from './build'

export function mergeStyles(el: HTMLElement, newStyles: any) {
  if (!el || !newStyles)
    return

  const style = {} as any
  generateHTMLStyles(newStyles, { style })

  el.style.cssText = Object.keys(style)
    .map(key => `${key}: ${style[key]}`)
    .join(';')
}
