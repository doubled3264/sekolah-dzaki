<script setup>
import IconBase from '../../components/IconBase.vue'
import {signup} from '../../utils/svg-var'

const emits = defineEmits(['event'])
</script>

<template>
  <IconBase width="64" height="64" color="#41c3a9" strokeWidth="0.3" :svgIcon="signup"/>
  
  <button @click="$emit('event','signin')">Change to signin</button>

</template>
