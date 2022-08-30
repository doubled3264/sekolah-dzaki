<script setup>
import Sidebar from './components/layouts/sidebar/Sidebar.vue'
</script>

<template>
  <div class="app-wrapper">
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>
