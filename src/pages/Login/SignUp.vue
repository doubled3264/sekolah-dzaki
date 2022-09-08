<script setup>
import { signup } from '../../utils/svg-var'

const emits = defineEmits(['event'])
</script>

<template>
  <button @click="$emit('event', 'signin')">Change to signin</button>
</template>
