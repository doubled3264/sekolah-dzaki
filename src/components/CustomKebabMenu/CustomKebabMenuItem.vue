<script setup>
defineEmits(['onClick'])
</script>
<template>
  <li @click="$emit('onClick')" class="custom-kebab-menu__item">
    <slot></slot>
  </li>
</template>
