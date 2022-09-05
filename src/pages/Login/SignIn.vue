<script setup>
import IconBase from '../../components/IconBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import {signin} from '../../utils/svg-var'

const emits = defineEmits(['event'])
</script>

<template>
  <IconBase width="64" height="64" color="#41c3a9" strokeWidth="0.3" :svgIcon="signin"/>
  <ButtonBase title="Change to signup" />
</template>
