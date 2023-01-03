<script setup>
import { computed } from 'vue';
import {last} from 'lodash'
import { arrowRight } from '../../utils/svg-vars';
import CustomIcon from '../CustomIcon.vue';

const props = defineProps({
    items: {
        type: Array,
        default: [{
            title: '',
            path: ''
          }]
      }
  })

const getTitle = computed(()=>{
  const lastItem = last(props.items)
    return lastItem.title
  })
</script>
<template>
   <div class="content__head">
      <ul class="content__path-list">
         <li
            v-for="(item, index) in items"
            :key="index + 1"
            class="content__path-item"
         >
            <p v-if="item.path === ''">{{item.title}}</p>
            <router-link v-else :to="item.path">{{ item.title }}</router-link>
            <CustomIcon v-if="item.path != ''" :svg-icon="arrowRight" width="10" />
         </li>
      </ul>
      <div class="content__title">
         <h3>{{getTitle}}</h3>
      </div>
   </div>
</template>
