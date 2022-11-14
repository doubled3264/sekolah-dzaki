<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { findIndex } from 'lodash'
import Swal from 'sweetalert2'
import { VueGoodTable } from 'vue-good-table-next'
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowRight } from '../../utils/svg-var'
import CustomModalOverlayVue from '../../components/CustomModalOverlay.vue'
import CustomButton from '../../components/CustomButton.vue'
import TableAction from '../../components/modal/TableAction.vue'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
const router = useRouter()
/** @type {Object} modal  */
const activeModal = ref({
   tableAction: false,
})
const iuranSelected = ref(null)
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
  fetchIuran()
})
/**
 * get vuetable column props on store
 * @param {}
 */
function generateVueTable() {
   tableData.value.columns = store.getters['vueTable/getColumn']('iuran')
   /* setColumnFn() */
}
/**
 * fetch calon siswa data on DB and get from store
 */
async function fetchIuran() {
   await store.dispatch('iuran/getList')
   tableData.value.rows = store.getters['iuran/getList']
}

function selectRow(param) {
   toggleShowOption()
   iuranSelected.value = param.row
}

function toggleShowOption() {
   activeModal.value.tableAction = !activeModal.value.tableAction
}

function infoAction() {
   router.push({
      name: 'biodata calon siswa',
      params: { id: calonSiswaSelected.value.id },
   })
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__head">
        <div class="content__path">
          <span>iuran</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>daftar iuran</span>
        </div>
        <div class="content__title">
          <h3>daftar iuran</h3>
          <CustomButton title="tambah data" color="verdigris" size="sm"
            @button-action="router.push('/iuran/tambah-data')" />
        </div><div class="content__body">
               <vue-good-table
                  v-if="
                     !tableData.columns.length == 0 &&
                     !tableData.rows.length == 0
                  "
                  :columns="tableData.columns"
                  :rows="tableData.rows"
                  styleClass="vgt-table striped"
                  v-on:row-dblclick="selectRow"
               />
            </div>
      </div>
    </div>
  </div>

   <teleport :disabled="!activeModal.tableAction" to="#modal">
      <CustomModalOverlayVue
         v-show="activeModal.tableAction"
         @close-modal="toggleShowOption"
      >
         <TableAction
            @info-action="infoAction"
         ></TableAction>
      </CustomModalOverlayVue>
   </teleport>
</template>
