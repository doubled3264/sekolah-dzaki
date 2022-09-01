<script setup> 
import { computed } from 'vue'
import {  useStore } from 'vuex'
import SidebarItem from './SidebarItem.vue'

const store = useStore()
const getNavigation = computed(() => {
  return store.getters['sidebar/getNavigation']
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo">logo</div>
    <ul clas="sidebar__list">
      <SidebarItem v-for="(item, index) in getNavigation" :key="index+1"
      :title="item.title"
      :svgIcon="item.svgIcon"
      ></SidebarItem>
    </ul>
  </div>
</template>
