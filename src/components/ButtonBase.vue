<script setup>
import { computed } from 'vue'
import IconBase from './IconBase.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['xs', 'sm', 'md', 'lg'].includes(value)
    },
  },
  variant: {
    type: String,
    default: 'solid',
    validator(value) {
      return ['solid', 'outline', 'link'].includes(value)
    },
  },
  color: {
    type: String,
    default: 'secondary',
  },
  startIcon: {
    type: String,
  },
  endIcon: {
    type: String,
  },
})

const getSize = computed(() => {
  return `btn btn--${props.size}`
})
const getVariantAndColor = computed(() => {
  if (props.variant === 'solid') {
    return `btn--${props.color}`
  } else if (props.variant === 'outline') {
    return `btn__outline--${props.color}`
  } else if (props.variant === 'link') {
    return ``
  }
})
const getIconSize = computed(() => {
  return '24'
})
</script>
<template>
  <button type="button" :class="[getSize, getVariantAndColor]">
    <span v-if="startIcon">
      <IconBase :width="getIconSize" :svgIcon="startIcon" />
    </span>
    {{ title }}
    <span v-if="endIcon">
      <IconBase :width="getIconSize" :svgIcon="endIcon" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  span:first-child {
    @apply mr-2;
  }
  span:last-child {
    @apply ml-2;
  }
}
</style>
