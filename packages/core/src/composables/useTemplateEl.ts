import type { ComponentPublicInstance, Ref } from 'vue'

// TODO: error handling
// import { getElFromTemplateRef } from '@oku-ui/primitives/shared'

export function useTemplateEl<T>(elRef: Ref<T>) {
  return (vNode: Element | ComponentPublicInstance | null) => {
    let node: Element | undefined = (vNode as unknown as ComponentPublicInstance)?.$el ?? vNode

    if (node && node.nodeType !== 1)
      node = undefined

    elRef.value = node as T
  }
}
