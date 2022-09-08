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

const getColor = computed(() => (props.isActive ? '#41c3a9' : '#8f9093'))

watch(
  () => route.path,
  (newValue) => {
    store.commit('sidebar/setActivePage', _.replace(newValue, '/', ''))
  }
)
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
        width="24"
        height="24"
        :color="getColor"
        strokeWidth="0.3"
        :svgIcon="svgIcon"
      />
      <span>{{ title }}</span>
    </router-link>
  </li>
</template>
