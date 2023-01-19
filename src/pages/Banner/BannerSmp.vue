<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
   parentItem: String,
   childItem: String,
})
onMounted(() => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
})
</script>
<template></template>
