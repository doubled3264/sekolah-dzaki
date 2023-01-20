<script setup>
import CustomIcon from '../CustomIcon.vue'
import { threeDots } from '../../utils/svg-vars'

defineProps(['isShow'])
</script>
<template>
   <CustomIcon :svg-icon="threeDots" />
   <ul
      :class="[
         ' custom-kebab-menu__list',
         { 'custom-kebab-menu__list--show': isShow },
      ]"
   >
      <slot></slot>
   </ul>
</template>
