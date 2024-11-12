import { fireEvent, getByTestId } from '@testing-library/dom'

class FakePointerEvent extends Event {
  pointerType: string

  constructor(type: string, props: PointerEventInit = {}) {
    super(type, props)
    this.pointerType = props.pointerType || 'mouse'
  }
}

window.PointerEvent = FakePointerEvent

export function click(element: Element): boolean {
  return fireEvent.click(element)
}

export function pointerEnter(element: Element, type?: string): any {
  return fireEvent.pointerEnter(
    element,
    type
      ? new FakePointerEvent('pointerenter', { pointerType: type })
      : undefined,
  )
}

export function pointerLeave(element: Element): any {
  return fireEvent.pointerLeave(element)
}

export function pointerDown(element: Element): any {
  return fireEvent.pointerDown(element)
}

export function pointerUp(element: Element): any {
  return fireEvent.pointerUp(element)
}

export function focus(container: HTMLElement, testId: string): any {
  return getByTestId(container, testId).focus()
}

export function blur(container: HTMLElement, testId: string): any {
  return getByTestId(container, testId).blur()
}
