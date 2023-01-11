<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
/* import SocketioService from '../services/socketio.service' */

const store = useStore()

function setDimension() {
  store.commit('windowProp/setWidth', document.documentElement.clientWidth)
}

onMounted(() => {
  /* SocketioService.setupSocketConnection() */
  window.addEventListener('resize', setDimension)
})

onUnmounted(() => {
  /* SocketioService.disconnect() */
  window.removeEventListener('resize', setDimension)
})
</script>

<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>
