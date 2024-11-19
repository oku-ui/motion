import { unref } from 'vue'

export function unwrapProps<T extends Record<string, any>>(props: T): T {
  return Object.entries(props).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: unref(value),
    }
  }, {} as T)
}

export function convertFalseToUndefined<T extends Record<string, any>>(props: T): T {
  return Object.entries(props).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value === false ? undefined : value,
    }
  }, {} as T)
}

export function transformProps<T extends Record<string, any>>(props: T): T {
  const unwrapped = unwrapProps(props)
  return convertFalseToUndefined(unwrapped)
}
