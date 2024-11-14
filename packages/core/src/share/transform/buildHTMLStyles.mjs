import {
  __name,
  buildTransform,
  getValueAsType,
  numberValueTypes,
  transformProps,
} from './chunk-7IJKUOZA.mjs'

// src/render/dom/utils/is-css-variable.ts
const checkStringStartsWith = /* @__PURE__ */ __name(token => key => typeof key === 'string' && key.startsWith(token), 'checkStringStartsWith')
const isCSSVariableName = /* @__PURE__ */ checkStringStartsWith('--')

// src/render/html/utils/build-styles.ts
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state
  let hasTransform = false
  let hasTransformOrigin = false
  for (const key in latestValues) {
    const value = latestValues[key]
    if (transformProps.has(key)) {
      hasTransform = true
      continue
    }
    else if (isCSSVariableName(key)) {
      vars[key] = value
      continue
    }
    else {
      const valueAsType = getValueAsType(value, numberValueTypes[key])
      if (key.startsWith('origin')) {
        hasTransformOrigin = true
        transformOrigin[key] = valueAsType
      }
      else {
        style[key] = valueAsType
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform || transformTemplate)
      style.transform = buildTransform(latestValues, state.transform, transformTemplate)
    else if (style.transform)
      style.transform = 'none'
  }
  if (hasTransformOrigin) {
    const { originX = '50%', originY = '50%', originZ = 0 } = transformOrigin
    style.transformOrigin = `${originX} ${originY} ${originZ}`
  }
}
__name(buildHTMLStyles, 'buildHTMLStyles')
export {
  buildHTMLStyles,
}
