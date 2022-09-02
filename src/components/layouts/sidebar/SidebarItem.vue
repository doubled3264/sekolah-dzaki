<script setup>
import { defineProps, ref } from 'vue'
import IconBase from '../../IconBase.vue'

const props = defineProps({
  path: String,
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
    <router-link :to="path" class="sidebar__link" active-class="sidebar__link--active">
      <IconBase
        width="24"
        height="24"
        color="#8f9093"
        strokeWidth="0.3"
        :svgIcon="svgIcon"
        :isRotate="isActive"
      />
      <span>{{ title }}</span>
    </router-link>
  </li>
</template>
