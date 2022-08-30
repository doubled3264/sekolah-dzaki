<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'

const menu = ref([{ title: 'siswa' }, { title: 'pembayaran' }])
</script>
<template>
  <div class="sidebar">
    <div class="sidebar-logo">logo</div>
    <ul clas="sidebar__list">
      <SidebarItem v-for="item in menu" :title="item.title" ></SidebarItem>
    </ul>
  </div>
</template>
