const __defProp = Object.defineProperty
const __name = (target, value) => __defProp(target, 'name', { value, configurable: true })

// src/render/html/utils/transform.ts
const transformPropOrder = [
  'transformPerspective',
  'x',
  'y',
  'z',
  'translateX',
  'translateY',
  'translateZ',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'skew',
  'skewX',
  'skewY',
]
const transformProps = new Set(transformPropOrder)

// src/render/dom/value-types/get-as-type.ts
const getValueAsType = /* @__PURE__ */ __name((value, type) => {
  return type && typeof value === 'number' ? type.transform(value) : value
}, 'getValueAsType')

// src/utils/clamp.ts
const clamp = /* @__PURE__ */ __name((min, max, v) => {
  if (v > max)
    return max
  if (v < min)
    return min
  return v
}, 'clamp')

// src/value/types/numbers/index.ts
const number = {
  test: /* @__PURE__ */ __name(v => typeof v === 'number', 'test'),
  parse: Number.parseFloat,
  transform: /* @__PURE__ */ __name(v => v, 'transform'),
}
const alpha = {
  ...number,
  transform: /* @__PURE__ */ __name(v => clamp(0, 1, v), 'transform'),
}
const scale = {
  ...number,
  default: 1,
}

// src/value/types/numbers/units.ts
const createUnitType = /* @__PURE__ */ __name(unit => ({
  test: /* @__PURE__ */ __name(v => typeof v === 'string' && v.endsWith(unit) && v.split(' ').length === 1, 'test'),
  parse: Number.parseFloat,
  transform: /* @__PURE__ */ __name(v => `${v}${unit}`, 'transform'),
}), 'createUnitType')
const degrees = /* @__PURE__ */ createUnitType('deg')
const percent = /* @__PURE__ */ createUnitType('%')
const px = /* @__PURE__ */ createUnitType('px')
const progressPercentage = {
  ...percent,
  parse: /* @__PURE__ */ __name(v => percent.parse(v) / 100, 'parse'),
  transform: /* @__PURE__ */ __name(v => percent.transform(v * 100), 'transform'),
}

// src/render/dom/value-types/number-browser.ts
const browserNumberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
}

// src/render/dom/value-types/transform.ts
const transformValueTypes = {
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
}

// src/render/dom/value-types/type-int.ts
const int = {
  ...number,
  transform: Math.round,
}

// src/render/dom/value-types/number.ts
const numberValueTypes = {
  ...browserNumberValueTypes,
  ...transformValueTypes,
  zIndex: int,
  size: px,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int,
}

// src/render/html/utils/build-transform.ts
const translateAlias = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ',
  transformPerspective: 'perspective',
}
const numTransforms = transformPropOrder.length
function buildTransform(latestValues, transform, transformTemplate) {
  let transformString = ''
  let transformIsDefault = true
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i]
    const value = latestValues[key]
    if (value === void 0)
      continue
    let valueIsDefault = true
    if (typeof value === 'number')
      valueIsDefault = value === (key.startsWith('scale') ? 1 : 0)
    else
      valueIsDefault = Number.parseFloat(value) === 0

    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key])
      if (!valueIsDefault) {
        transformIsDefault = false
        const transformName = translateAlias[key] || key
        transformString += `${transformName}(${valueAsType}) `
      }
      if (transformTemplate)
        transform[key] = valueAsType
    }
  }
  transformString = transformString.trim()
  if (transformTemplate)
    transformString = transformTemplate(transform, transformIsDefault ? '' : transformString)
  else if (transformIsDefault)
    transformString = 'none'

  return transformString
}
__name(buildTransform, 'buildTransform')

export {
  __name,
  transformProps,
  getValueAsType,
  numberValueTypes,
  buildTransform,
}
