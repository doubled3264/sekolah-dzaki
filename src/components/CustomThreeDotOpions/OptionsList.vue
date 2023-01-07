<script setup>
import CustomIcon from '../CustomIcon.vue'
import { threeDots } from '../../utils/svg-vars'

defineProps(['isShow'])
</script>
<template>
   <CustomIcon :svg-icon="threeDots" />
   <ul
      :class="[
         ' custom-three-dots-options__list',
         { 'custom-three-dots-options__list--show': isShow },
      ]"
   >
      <slot></slot>
   </ul>
</template>
