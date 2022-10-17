<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table-next'
import { setGender } from '../../utils/etc.helper.js'

import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import AddNew from './AddNew.vue'

const store = useStore()
/** @type {Object} modal  */
const activeModal = ref({
   add: false,
   detail: false,
})
/** @type {object} vue good table props */
const tableData = ref({
   columns: [],
   rows: [],
})
onMounted(() => {
   setActivePage()
   generateVueTable()
   fetchSiswa()
})
/**
 * set sidebar active class depend page
 */
function setActivePage() {
   store.commit('sidebar/setActivePage', 'siswa')
}
/**
 * get vuetable column props on store
 * @param {}
 */
function generateVueTable() {
   tableData.value.columns = store.getters['vueTable/getColumn']('siswa')
   setColumnFn()
}
/**
 * fetch siswa data on DB and get from store
 */
async function fetchSiswa() {
   await store.dispatch('siswa/getAll')
   tableData.value.rows = store.getters['siswa/getSiswa']
}
/**
 * toggle open / close modal overlay &
 * toggle open / close modal add new siswa
 * @param {}
 */
function toggleModalAddNewSiswa() {
   activeModal.value.add = !activeModal.value.add
}

/**
 * get width of window size from tsore
 */
const getWindowSize = computed(() => {
   if (store.getters['windowProp/getWidth'] >= 1024) {
      return 'sm'
   }
   return 'lg'
})

function setColumnFn() {
   const index = _.findIndex(tableData.value.columns, {
      field: 'jenis_kelamin',
   })
   tableData.value.columns[index].formatFn = setGender
}
// -------------- cyclehook --------------
</script>
<template>
   <Sidebar />
   <div class="content">
      <div class="wrapper">
         <CustomHeader />
         <div class="table-data">
            <div class="table-data__title">
               <h4>data siswa</h4>
               <CustomButton
                  title="tambah data"
                  color="verdigris"
                  @button-action="toggleModalAddNewSiswa"
                  :size="getWindowSize"
               />
            </div>

            <vue-good-table
               v-if="
                  !tableData.columns.length == 0 && !tableData.rows.length == 0
               "
               :columns="tableData.columns"
               :rows="tableData.rows"
               styleClass="vgt-table striped"
               v-on:row-dblclick=""
            />
         </div>
      </div>
   </div>
   <Teleport to="body">
      <CustomModalOverlay
         v-if="activeModal.add"
         @close-modal="toggleModalAddNewSiswa"
      >
         <AddNew
            @close-modal="toggleModalAddNewSiswa"
            @fetch-siswa-data="fetchSiswa"
         />
      </CustomModalOverlay>
   </Teleport>
</template>
