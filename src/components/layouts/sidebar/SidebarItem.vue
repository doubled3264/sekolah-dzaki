<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import _ from 'lodash'
import CustomIcon from '../../CustomIcon.vue'

const props = defineProps({
   path: String,
   title: String,
   svgIcon: String,
   isActive: Boolean,
})
const route = useRoute()
const store = useStore()

function setPageActive() {
   store.commit('sidebar/setActivePage', props.title)
}

const getColor = computed(() => {
   return '#fff'
})
</script>
<template>
   <li class="sidebar__item" :class="{ 'sidebar__item--active': isActive }">
      <router-link
         class="sidebar__link"
         :to="path"
         :class="{ 'sidebar__link--active': isActive }"
         @click="setPageActive"
      >
         <CustomIcon
            width="28"
            :color="getColor"
            strokeWidth="0.1"
            :svgIcon="svgIcon"
         />
         <span>{{ title }}</span>
      </router-link>
   </li>
</template>
