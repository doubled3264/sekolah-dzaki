<script setup>
import { ScalingSquaresSpinner } from 'epic-spinners'
defineProps({
  isActive: false,
})
</script>
<template>
  <div v-if="isActive" class="flex justify-center items-center w-full h-screen">
    <scaling-squares-spinner :animation-duration="1250" :size="100" color="#41C3A9" />
  </div>
</template>
