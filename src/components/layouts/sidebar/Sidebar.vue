<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import CustomIcon from '../../CustomIcon.vue'
import { power } from '../../../utils/svg-var'

const store = useStore()
const getNavigation = computed(() => store.getters['sidebar/getNavigation'])
function signOut() { }

const getWindowWidth = computed(() => {
  return store.getters['windowProp/getWidth']
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo">{{ getWindowWidth }}</div>
    <p>menu</p>
    <ul class="sidebar__list">
      <SidebarItem v-for="(item, index) in getNavigation" :key="index + 1" :title="item.title" :svgIcon="item.svgIcon"
        :path="item.path" :isActive="item.isActive"></SidebarItem>
    </ul>
  </div>
</template>
