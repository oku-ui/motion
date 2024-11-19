import { computed, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

// TODO: error handling
// import { getElFromTemplateRef } from '@oku-ui/primitives/shared'

export function getElFromTemplateRef<T extends HTMLElement>(nodeRef: any) {
  let node: T | undefined = (nodeRef as ComponentPublicInstance)?.$el ?? nodeRef

  if (node && node.nodeType !== 1)
    node = undefined

  return node
}

export function usePrimitiveElement() {
  const primitiveElement = ref<ComponentPublicInstance>()
  const currentElement = computed(() => {
    return getElFromTemplateRef(primitiveElement.value)
  })

  return {
    primitiveElement,
    currentElement,
  }
}
