<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
    default: 'btn--md',
  },
})

const getButtonSize = computed(() => {
  let buttonSize
  switch (props.size) {
    case 'xs':
      buttonSize = 'btn--xs'
      break
    case 'sm':
      buttonSize = 'btn--sm'
      return
    case 'md':
      buttonSize = 'btn--md'
      break
    case 'lg':
      buttonSize = 'btn--lg'
      break
  }
  return buttonSize
})
</script>
<template>
  <button type="button" :class="[getButtonSize]">{{ title }}</button>
</template>
