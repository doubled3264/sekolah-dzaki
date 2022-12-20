<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { arrowRight } from '../../utils/svg-var'
import { VueGoodTable } from 'vue-good-table-next'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomButton from '../../components/CustomButton.vue'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
const router = useRouter()
/** @type {object} vue good table props */
const tableData = ref({
  columns: [],
  rows: [],
})
onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
  generateVueTable()
  /* fetchIuran() */
})
/**
 * get vuetable column props on store
 * @param {}
 */
function generateVueTable() {
  tableData.value.columns = store.getters['vueTable/getColumn']('artikel')
  /* setColumnFn() */
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__head">
        <div class="content__path">
          <span>artikel</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>daftar artikel</span>
        </div>
        <div class="content__title">
          <h3>daftar artikel</h3>
          <CustomButton title="tambah data" color="verdigris" size="sm"
            @button-action="router.push('/artikel/tambah-data')" />
        </div>
      </div>
      <div class="content__body">
        <vue-good-table v-if="
           !tableData.columns.length == 0 && !tableData.rows.length == 0
        " :columns="tableData.columns" :rows="tableData.rows" styleClass="vgt-table striped"
          v-on:row-dblclick="selectRow" />
      </div>
    </div>
  </div>
</template>
