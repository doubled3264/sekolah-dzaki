<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

function setDimension() {
  store.commit('windowProp/setWidth', document.documentElement.clientWidth)
}

onMounted(() => {
  window.addEventListener('resize', setDimension)
})

onUnmounted(() => {
  window.removeEventListener('resize', setDimension)
})
</script>

<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>
