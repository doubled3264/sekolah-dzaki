<script setup>
import { useStore } from 'vuex'
import CustomIcon from '../../CustomIcon.vue'
import { arrowDown } from '../../../utils/svg-var'
import { onMounted, onUpdated, ref, watchEffect } from 'vue'
import { isArray } from 'lodash'

const props = defineProps({
  title: String,
  svgIcon: String,
  path: String,
  isActive: Boolean,
  subItem: Array,
})

const store = useStore()
/* function setActiveItem() { */
/*    store.commit('sidebar/setActiveItem', props.title) */
/* } */
function setActiveParent() {
  store.commit('sidebar/setActiveParent', props.title)
}
</script>

<template>
  <li v-if="subItem.length == 0" :class="[' sidebar__item', { 'sidebar__item--active': isActive }]">
    <router-link :to="'#'">
      <CustomIcon width="24" stroke-width="0.1" :svg-icon="svgIcon" />
      <span>{{ title }}</span>
    </router-link>
  </li>
  <li v-else>
    <div @click="setActiveParent" :class="[' sidebar__item', { 'sidebar__item--active': isActive }]">
      <CustomIcon width="24" stroke-width="0.1" :svg-icon="svgIcon" />
      <span>{{ title }}</span>
      <CustomIcon width="16" stroke-width="0.1" :svg-icon="arrowDown" />
    </div>
    <ul ref="subList" :class="[
       'sidebar__sub-list',
       { 'sidebar__sub-list--active': isActive },
    ]">
      <li v-for="(item, index) in subItem" :key="index + 1" :class="[
         'sidebar__sub-item',
         { 'sidebar__sub-item--active': item.isActive },
      ]">
        <router-link :to="item.path"><span>{{ item.title }}</span></router-link>
      </li>
    </ul>
  </li>
</template>
