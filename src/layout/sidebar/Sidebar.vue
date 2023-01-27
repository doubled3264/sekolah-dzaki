<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import alIrsyadLogo from '../../assets/images/alirsyad.png'
import SidebarItem from './SidebarItem.vue'
import { findIndex, includes } from 'lodash'

const store = useStore()
const route = useRoute()
const user = ref('')
const sidebarItems = ref({})
/* const getSidebarItem = computed(() => { */
/*    return store.getters['sidebar/getItem'] */
/* }) */
onMounted(async () => {
  setUser()
  sidebarItems.value = await store.getters['sidebar/getItem']
})

watch(route, () => {
  setUser()
})
store.subscribe((mutation) => {
  if (mutation.type == 'sidebar/setActiveChild') {
    sidebarItems.value = store.getters['sidebar/getItem']
  }
})
function setUser() {
  user.value = store.getters['auth/user']
}
</script>
<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img :src="alIrsyadLogo" alt="logo yayasan alirsyad" />
    </div>
    <h3>menu</h3>
    <ul class="sidebar__list">
      <SidebarItem v-for="(item, index) in sidebarItems" :key="index + 1" :item="item" :user="user" />
    </ul>
  </div>
</template>
