<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { VueGoodTable } from 'vue-good-table-next'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomKebabMenuList from '../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../components/CustomKebabMenu/CustomKebabMenuItem.vue'

const store = useStore()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
  parentItem: String,
})
const admin = ref('')
/** @type {object} vue good table props */
const tableData = ref({
  columns: [],
  rows: [],
})
/** @type {Object} content head value */
const contentHeadItem = [
  { title: 'admin', path: '#' },
  { title: 'daftar admin', path: '' },
]

onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  generateVueTable()
  fetchAdmin()
})

/**
 * get vuetable column props on store
 * @param {}
 */
function generateVueTable() {
  tableData.value.columns = store.getters['vueTable/getColumn']('admin')
}

async function fetchAdmin() {
  await store.dispatch('admin/getAll')
  admin.value = store.getters['admin/getAdmin']
  console.log(admin.value)
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="contentHeadItem" />
    </div>
  </div>
</template>
