<script setup>
import { useRouter } from 'vue-router'
import { arrowRight, user } from '../../utils/svg-vars'
import CustomIcon from '../CustomIcon.vue'

const router = useRouter()
const props = defineProps({
  items: {
    type: Array,
    default: [
      {
        title: '',
        path: '',
      },
    ],
  },
})

function logoutAction() {
  localStorage.removeItem('token')
  router.push({ path: '/login' })
}
</script>
<template>
  <div class="content__head">
    <ul class="content__path-list">
      <li v-for="(item, index) in items" :key="index + 1" class="content__path-item">
        <p v-if="item.path == '' || item.path == '#'">{{ item.title }}</p>
        <router-link v-else :to="item.path">{{ item.title }}</router-link>
        <CustomIcon v-if="item.path != ''" :svg-icon="arrowRight" width="10" />
      </li>
    </ul>
    <div class="content__nav">
      <div class="profile__photo cursor-pointer" @click="logoutAction">
        <CustomIcon :svg-icon="user" />
      </div>
    </div>
  </div>
</template>
