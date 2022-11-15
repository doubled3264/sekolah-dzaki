<script setup>
defineProps({
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  vertical: Boolean,
})
</script>
<template>
  <div v-if="!vertical" class="custom-info custom-info__vertical">
    <p>{{ label }}</p>
    <p>{{ value }}</p>
  </div>
  <div v-else class="custom-info custom-info__horizontal">
    <p>{{ label }}</p>
    <p>{{ value }}</p>
  </div>
</template>
