<script setup>
import { defineProps, ref } from 'vue'
import IconBase from '../../IconBase.vue'

const props = defineProps({
  title: String,
  svgIcon: String,
  isActive: Boolean,
  /* iconActive: Boolean, */
})
const isActive = ref(props.isActive)
function setIsActive() {
  isActive.value = !isActive.value
  console.log('click active')
}
</script>
<template>
  <li class="sidebar__item" @click="setIsActive">
    <IconBase
      width="24"
      height="24"
      color="#8f9093"
      :svgIcon="svgIcon"
      :isRotate="isActive"
    />
    <p>{{ title }}</p>
  </li>
</template>
