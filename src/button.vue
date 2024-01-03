<script setup lang="ts">
interface ButtonProps {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  size?: 'large' | 'middle' | 'small'
  htmlType?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  icon?: string
  href?: string
  target?: string
  onClick?: (e: MouseEvent) => void
}

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'middle',
  htmlType: 'button',
  loading: false,
  disabled: false,
  block: false,
  icon: '',
  href: '',
  target: '',
  onClick: () => {},
})
</script>

<template>
  <button>
    <span v-if="loading" class="h-12 w-20 h-full">
      hello
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>
