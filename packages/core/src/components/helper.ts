import type { ComputedRef, Ref } from 'vue'
import {
  isRef,
  onBeforeUnmount,
  onMounted,
  onUpdated,
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
  useMountedStates,
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

export function useMotionHelper(
  _props: MotionProps,
  currentElement: Ref<Element> | Element | null | ComputedRef<HTMLElement | undefined>,
  sfc: boolean = true,
) {
  const props = defaultTransition(_props)

  const { initial: presenceInitial } = useAnimatePresence()
  const parentState = useMotion()
  const states = useMountedStates('motion')
  const id = props.id || unref(currentElement)?.id || useId()
  const state = new MotionState(
    {
      ...props,
      id,
    },
    states,
    parentState!,
  )

  provideMotion(state)

  function isElementRef(el: any) {
    return isRef(el) ? el.value : typeof el === 'function' ? el() : el
  }

  let manuallyAppliedMotionStyles = false

  if (sfc) {
    onMounted(() => {
      state.mount(isElementRef(currentElement))
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
    state.mount(isElementRef(currentElement))
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
    const unmount = () => state.mount(isElementRef(currentElement))
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

    if (!manuallyAppliedMotionStyles && isElementRef(currentElement)) {
      manuallyAppliedMotionStyles = true

      const styles = createStyles(state.getTarget())
      for (const key in styles)
        style.set(isElementRef(currentElement), key, styles[key])
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
