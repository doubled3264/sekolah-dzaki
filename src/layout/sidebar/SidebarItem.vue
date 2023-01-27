<script setup>
import { includes } from 'lodash'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowSolidDown } from '../../utils/svg-vars'

const props = defineProps({
  item: {
    type: Object,
    default: {
      title: '',
      svgIcon: '',
      path: '',
      isActive: false,
      role: [],
      subItem: [],
    },
  },
  user: Object,
})

const store = useStore()
const route = useRoute()
function setActiveParent() {
  store.commit('sidebar/setActiveParent', props.item.title)
}
</script>

<template>
  <li v-if="item.subItem.length == 0 && includes(item.role, user.role)"
    :class="[' sidebar__item', { 'sidebar__item--active': item.isActive }]">
    <router-link :to="item.path">
      <CustomIcon width="24" stroke-width="0.1" :svg-icon="item.svgIcon" />
      <span>{{ item.title }}</span>
    </router-link>
  </li>
  <li v-if="item.subItem.length > 0 && includes(item.role, user.role)">
    <div @click="setActiveParent" :class="[' sidebar__item', { 'sidebar__item--active': item.isActive }]">
      <CustomIcon width="24" stroke-width="0.1" :svg-icon="item.svgIcon" />
      <span>{{ item.title }}</span>
      <CustomIcon width="16" stroke-width="0.1" :svg-icon="arrowSolidDown" />
    </div>
    <ul ref="subList" :class="[
  'sidebar__sub-list',
  { 'sidebar__sub-list--active': item.isActive },
]">
      <li v-for="(subItem, index) in item.subItem" :key="index + 1" :class="[
  'sidebar__sub-item',
  { 'sidebar__sub-item--active': subItem.isActive },
]">
        <router-link :to="subItem.path"><span>{{ subItem.title }}</span></router-link>
      </li>
    </ul>
  </li>
</template>
