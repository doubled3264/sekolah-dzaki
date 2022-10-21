<script setup>
import { startCase } from 'lodash'
import { computed } from 'vue'
import { object } from 'yup'
import CustomIcon from './CustomIcon.vue'

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
  block: {
    type: Boolean,
  },
  color: {
    type: String,
    default: 'secondary',
  },
  startIcon: {
    type: Object,
  },
  endIcon: {
    type: Object,
  },
})

const emit = defineEmits(['buttonAction'])

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

function buttonClick() {
  emit('buttonAction')
}
</script>
<template>
  <button type="button" @click="buttonClick" :class="[getSize, getVariantAndColor, { btn__block: block }]">
    <span v-if="startIcon" class="btn__start-icon">
      <CustomIcon :svgIcon="startIcon.svgIcon" :width="startIcon.width" />
    </span>
    {{ title }}
    <span v-if="endIcon" class="btn__end-icon">
      <CustomIcon :svgIcon="endIcon" />
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
