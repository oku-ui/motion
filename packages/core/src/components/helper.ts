import type { ComputedRef, Ref } from 'vue'
import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  toValue,
  unref,
  useId,
} from 'vue'
import { isSvgElementName } from './utils'
import { MotionState } from '@/state/motion-state'
import { createStyles, style } from '@/state/style'
import type { MotionProps } from '@/state/types'
import {
  getDefaultTransition,
  provideMotion,
  useAnimatePresence,
  useMotion,
} from '@/share'
import { transformProps } from '@/utils/undefinedDefu'

function defaultTransition(_props: MotionProps) {
  const { isDefaultTransition = false } = _props

  const props = transformProps(_props)

  if (isDefaultTransition) {
    const defaultTransitionValue = props.animate
      ? getDefaultTransition(
        Object.keys(props.animate).join(','),
        props.transition,
      )
      : {}

    const mergedTransition = Object.assign({}, defaultTransitionValue, props.transition)

    return Object.assign({}, props, {
      transition: mergedTransition,
    })
  }

  return props
}

type El = Element | null | undefined

export function useMotionHelper(
  _props: MotionProps,
  currentElement: Ref<El> | ComputedRef<El> | El,
  sfc: boolean = true,
) {
  const props = defaultTransition(_props)

  const { initial: presenceInitial } = useAnimatePresence('useMotionHelper')
  const parentState = useMotion('useMotionHelper')
  const id = props.id || unref(currentElement)?.id || useId()
  const state = new MotionState(
    {
      ...props,
      id,
    },
    parentState!,
  )

  provideMotion(state)

  let manuallyAppliedMotionStyles = false

  if (sfc) {
    onMounted(() => {
      state.mount(toValue(currentElement)!)
      state.update({
        ...props,
        style: { ...props.style, ...createStyles(state.getTarget()) },
        initial: presenceInitial.value === false
          ? presenceInitial.value
          : (
              props.initial === true ? undefined : props.initial
            ),
      })
    })
  }
  else if (currentElement && typeof currentElement === 'object') {
    state.mount(toValue(currentElement)!)
    state.update({
      ...props,
      style: { ...props.style, ...createStyles(state.getTarget()) },
      initial: presenceInitial.value === false
        ? presenceInitial.value
        : (
            props.initial === true ? undefined : props.initial
          ),
    })
  }

  onBeforeUnmount(() => {
    const unmount = () => state.mount(toValue(currentElement)!)
    state.update({
      ...props,
      initial: presenceInitial.value === false
        ? presenceInitial.value
        : (
            props.initial === true ? undefined : props.initial
          ),
    })
    return unmount()
  })

  onUpdated(() => {
    const props = defaultTransition(_props)

    if (!manuallyAppliedMotionStyles && toValue(currentElement)) {
      manuallyAppliedMotionStyles = true

      const styles = createStyles(state.getTarget())
      for (const key in styles)
        style.set(toValue(currentElement)!, key, styles[key])
    }

    state.update({
      ...props,
      initial: presenceInitial.value === false
        ? presenceInitial.value
        : (
            props.initial === true ? undefined : props.initial
          ),
    })
  })

  function getSVGProps() {
    if (!state.isMounted() && isSvgElementName(props.as as string))
      return state.getTarget()
  }

  function getStyle() {
    if (isSvgElementName(props.as as string))
      return props.style

    return !state.isMounted()
      ? {
          ...props.style,
          ...createStyles(state.getTarget()),
        }
      : props.style
  }

  return {
    getSVGProps,
    getStyle,
    state,
  }
}
