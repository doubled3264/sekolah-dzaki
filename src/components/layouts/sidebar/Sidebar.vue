<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import CustomIcon from '../../CustomIcon.vue'
import { logout } from '../../../utils/svg-var'

const store = useStore()
const getNavigation = computed(() => store.getters['sidebar/getNavigation'])
function signOut() {}

const getWindowWidth = computed(() => {
   return store.getters['windowProp/getWidth']
})
</script>

<template>
   <div class="sidebar">
      <div class="sidebar-logo">{{ getWindowWidth }}</div>
      <p>menu</p>
      <ul clas="sidebar__list">
         <SidebarItem
            v-for="(item, index) in getNavigation"
            :key="index + 1"
            :title="item.title"
            :svgIcon="item.svgIcon"
            :path="item.path"
            :isActive="item.isActive"
         ></SidebarItem>
         <li class="sidebar__item" @click="signOut">
            <a href="#" class="sidebar__link">
               <CustomIcon
                  width="24"
                  height="24"
                  color="#8f9093"
                  strokeWidth="0.3"
                  :svgIcon="logout"
               />
               <span>logout</span>
            </a>
         </li>
      </ul>
   </div>
</template>
