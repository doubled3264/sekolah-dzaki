<script setup>
const emit = defineEmits(['closeModal'])

function closeModalOverlay() {
   emit('closeModal')
}
</script>
<template>
   <div class="custom-modal-overlay" @click="closeModalOverlay">
      <slot></slot>
   </div>
</template>
