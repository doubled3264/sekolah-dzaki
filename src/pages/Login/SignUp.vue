<script setup>
const emits = defineEmits(['event'])
</script>

<template>
   <button @click="$emit('event', 'signin')">Change to signin</button>
</template>
