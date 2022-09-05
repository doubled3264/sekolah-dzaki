<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from 'vuex'

const headerData = ref({})
const route = useRoute()
const store = useStore()

watch(
  () => route.name,
  () => {
    headerData.value = store.getters['sidebar/getActivePage']
  }
)

</script>

<template>
  <div class="header"> 
  <h3>{{ headerData.title }}</h3>
  </div>
</template>
