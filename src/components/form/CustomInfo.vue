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
})
</script>
<template>
  <div class="custom-info">
    <p>{{ label }}</p>
    <p>{{ value }}</p>
  </div>
</template>
