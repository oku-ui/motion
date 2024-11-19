<script setup lang="ts">
import {
  ToastAction,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  useToastProvider,
} from '@oku-ui/primitives'

useToastProvider()

const model = defineModel({ type: Boolean, default: false })
</script>

<template>
  <ToastRoot
    v-model:open="model"
    class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
  >
    <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
      Stoped animation
    </ToastTitle>
    <ToastDescription as="template">
      <p class="text-slate11 text-[14px]">
        The animation has been stoped.
      </p>
    </ToastDescription>
    <ToastAction
      class="[grid-area:_action]"
      as="template"
      alt-text="Goto schedule to undo"
    >
      <button class="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-indigo2 text-indigo11 shadow-[inset_0_0_0_1px] shadow-indigo7 hover:shadow-[inset_0_0_0_1px] hover:shadow-indigo8 focus:shadow-[0_0_0_2px] focus:shadow-indigo8">
        Okay
      </button>
    </ToastAction>
  </ToastRoot>
  <ToastViewport class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
</template>
