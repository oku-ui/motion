<script lang="ts">
import { Motion } from '@oku-ui/motion'

export default {
  components: {
    Motion,
  },
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0.6 }"
    style="width: 200px; background-color: red; height: 200px"
  />
</template>
