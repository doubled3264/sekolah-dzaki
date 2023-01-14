<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import alIrsyadLogo from '../../assets/images/alirsyad.png'
import SidebarItem from './SidebarItem.vue'

const store = useStore()
onMounted(()=>{
    console.log(alIrsyadLogo)
  })
const getSidebarItem = computed(() => {
  return store.getters['sidebar/getItem']
})
</script>
<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img :src="alIrsyadLogo" alt="logo yayasan alirsyad" />
    </div>
    <h3>menu</h3>
    <ul class="sidebar__list">
      <SidebarItem v-for="(item, index) in getSidebarItem" :key="index + 1" :title="item.title" :svg-icon="item.svgIcon"
        :path="item.path" :is-active="item.isActive" :sub-item="item.subItem" />
    </ul>
  </div>
</template>
