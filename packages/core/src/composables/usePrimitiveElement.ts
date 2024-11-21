import { computed, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

import { getElFromTemplateRef } from '@oku-ui/primitives'

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
