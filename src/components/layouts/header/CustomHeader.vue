<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const headerData = ref({})
const route = useRoute()
const store = useStore()

const getTitle = computed(() => {
  return store.getters['sidebar/getActivePage']
})

onMounted(() => {
  console.log(getTitle)
})
</script>

<template>
  <div class="header">
    <h3>{{ getTitle.title }}</h3>
  </div>
</template>
