<script setup>
import IconBase from './IconBase.vue'

defineProps({
  isFalse: {
    type: Boolean,
  },
  ifFilled: {
    type: Boolean,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
      type: String,
      default: 'Please input..'
    }
})
</script>
<template>
  <input :type="type" :placeholder="placeholder"/>
</template>
