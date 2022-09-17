<script setup>
import { onMounted, onUnmounted } from 'vue';


onMounted(() => {
  console.log("mounted run")
})

onUnmounted(() => {
  console.log("destroy run")
})
</script>
<template>
  <div class="custom-overlay">
    <slot></slot>
  </div>
</template>
