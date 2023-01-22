<script setup>
import { forEach } from 'lodash'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import alIrsyadLogo from '../../assets/images/alirsyad.png'
import SidebarItem from './SidebarItem.vue'

const store = useStore()
const sidebarItems = ref({})
/* const getSidebarItem = computed(() => { */
/*    return store.getters['sidebar/getItem'] */
/* }) */
onMounted(() => {
   sidebarItems.value = store.getters['sidebar/getItem']
   /* forEach(sidebarItems.value, (item) => { */
   /*    console.log(`path: ${item.path}, isActive: ${item.isActive}`) */
   /*    if (item.subItem.length > 0) { */
   /*       forEach(item.subItem, (subItem) => { */
   /*          console.log( */
   /*             `subItem path: ${subItem.path}, isActive: ${subItem.isActive}` */
   /*          ) */
   /*       }) */
   /*    } */
   /* }) */
   /* console.log('-----') */
})

store.subscribe((mutation) => {
   if (mutation.type == 'sidebar/setActiveChild') {
      /* console.log(mutation.payload) */
      sidebarItems.value = store.getters['sidebar/getItem']
      /* forEach(sidebarItems.value, (item) => { */
      /*    console.log(`path: ${item.path}, isActive: ${item.isActive}`) */
      /*    if (item.subItem.length > 0) { */
      /*       forEach(item.subItem, (subItem) => { */
      /*          console.log( */
      /*             `subItem path: ${subItem.path}, isActive: ${subItem.isActive}` */
      /*          ) */
      /*       }) */
      /*    } */
      /* }) */
      /* console.log('-----') */
   }
})
</script>
<template>
   <div class="sidebar">
      <div class="sidebar__logo">
         <img :src="alIrsyadLogo" alt="logo yayasan alirsyad" />
      </div>
      <h3>menu</h3>
      <ul class="sidebar__list">
         <SidebarItem
            v-for="(item, index) in sidebarItems"
            :key="index + 1"
            :title="item.title"
            :svg-icon="item.svgIcon"
            :path="item.path"
            :is-active="item.isActive"
            :sub-item="item.subItem"
         />
      </ul>
   </div>
</template>
