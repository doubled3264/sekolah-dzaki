<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table-next'
import VueMultiselect from 'vue-multiselect'
import Swal from 'sweetalert2'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import CustomModal from '../../components/CustomModal.vue'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomButton from '../../components/CustomButton.vue'
import { iuranScheme } from '../../utils/validation/iuran.scheme'
import CustomInput from '../../components/CustomInput.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'

const store = useStore()
/** @type {boolean}  */
const overlayIsActive = ref(false)
/** @type {Array} iuran item from DB  */
const iuranItem = reactive([])
/** @type {Array?} iuran object key */
let iuranKey = null
/** @type {Array} optional form key */
const optionalFormKey = ['keterangan', 'interval_detail', 'inklusi']
/** @type {Object}  */
const iuran = ref({
   nama: '',
   keterangan: '',
   nominal: '',
   interval: '0',
   interval_detail: '',
   inklusi: '0',
})
/** @type {Object}  */
const errorState = ref({
   nama: {
      isError: true,
      message: '',
   },
   nominal: {
      isError: true,
      message: '',
   },
   interval: {
      isError: false,
      message: '',
   },
})
/** @type {Object}  */
const state = reactive({
   multiSelect: {
      options: ['hanya sekali', 'kelas 6'],
   },
})
// -------------- function --------------

const tableData = ref({
   columns: [],
   rows: [],
})

/**
 * toggle overlay and modal
 * @param {boolean}
 */
function activeModal(active) {
   if (active) {
      overlayIsActive.value = true
   } else if (!active) {
      overlayIsActive.value = false
      clearForm()
   }
}

/**
 * clear all input form
 */
function clearForm() {
   _.forEach(iuranKey, (key) => {
      if (key != 'interval' && key != 'inklusi') {
         iuran.value[key] = ''
         // if input !=  optionalForm, clear their input
         if (_.findIndex(optionalFormKey, (data) => data == key) === -1) {
            errorState.value[key].isError = true
         }
      } else {
         iuran.value[key] = '0'
      }
   })
}

/* function rowStyleClassFn(row) { */
/*   return row.inklusi == '1' ? 'bg-red-200 selected' : '' */
/* } */

/**
 * validate input when some event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
   await iuranScheme
      .validateAt(field, iuran.value)
      .then(() => {
         errorState.value[field].isError = false
      })
      .catch((err) => {
         errorState.value[field].isError = true
         errorState.value[field].message = err.message
      })
}
/**
 * validate each input before submit
 */
function validateForm() {
   let validCount = 0
   _.forEach(iuranKey, (key) => {
      if (_.findIndex(optionalFormKey, (data) => data == key) === -1) {
         if (!errorState.value[key].isError) {
            validCount++
         }
      }
   })
   if (validCount == iuranKey.length - optionalFormKey.length) {
      submitAction()
   } else {
      Swal.fire({
         icon: 'warning',
         text: 'terdapat form yang belum terisi',
         confirmButtonText: 'tutup',
      })
   }
}

/**
 * process data for save action
 * @success {promise} show success dialog
 */
async function submitAction() {
   Swal.fire({
      title: 'Anda yakin ?',
      text: 'Data akan disimpan',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#c82333',
      confirmButtonText: 'Ya, simpan !',
      confirmButtonColor: '#41c3a9',
   }).then(async (result) => {
      if (result.isConfirmed) {
         await store.dispatch('iuran/add', iuran.value).then(async () => {
            activeModal(false)
            Swal.fire({
               icon: 'success',
               text: 'data berhasil disimpan',
               confirmButtonText: 'tutup',
            })
         })
      }
   })
}

/**
 * get width of window size from store
 * @param {}
 */
const getWindowSize = computed(() => {
   if (store.getters['windowProp/getWidth'] >= 1024) {
      return 'sm'
   }
   return 'lg'
})

watch(
   () => iuran.value.interval,
   (value) => {
      if (value === '2') {
         iuran.value.interval_detail = state.multiSelect.options[0]
      } else if (value !== '2') {
         iuran.value.interval_detail = ''
      }
   }
)

async function fetchIuranUmum() {
   await store.dispatch('iuran/getAllUmum')
   tableData.value.rows = store.getters['iuran/getIuran']
}

// -------------- cyclehook --------------
onMounted(async () => {
   store.commit('sidebar/setActivePage', 'iuran')
   await fetchIuranUmum()
   tableData.value.columns = store.getters['vueTable/getColumn']('iuran')
   // generate iura object key
   iuranKey = _.keys(iuran.value)
})
</script>
<template>
   <div class="content">
      <div class="wrapper">
         <CustomHeader />
         <div class="table-data">
            <div class="table-data__title">
               <h4>data iuran</h4>
               <CustomButton
                  title="tambah data"
                  color="primary"
                  @button-action="activeModal(true)"
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
            />
         </div>
      </div>
      <CustomOverlay v-if="overlayIsActive" @click="activeModal(false)">
         <CustomModal>
            <template v-slot:title>
               <h4>tambah data iuran</h4>
            </template>
            <template v-slot:body>
               <div class="row mb-2">
                  <div class="input-field w-full">
                     <CustomInput
                        type="text"
                        label="nama iuran *"
                        placeholder="masukan nama iuran"
                        :error-state="errorState.nama"
                        v-model:input-value="iuran.nama"
                        @validate-input="validateInput('nama')"
                     />
                  </div>
               </div>
               <div class="row gap-4 mb-2">
                  <div class="input-field w-1/2">
                     <CustomInput
                        type="text"
                        label="keterangan"
                        placeholder="masukan keterangan"
                        :error-state="errorState.keterangan"
                        v-model:input-value="iuran.keterangan"
                     />
                  </div>
                  <div class="input-field w-1/2">
                     <CustomInput
                        type="number"
                        label="nominal *"
                        placeholder="masukan nominal"
                        :error-state="errorState.nominal"
                        v-model:input-value="iuran.nominal"
                        @validate-input="validateInput('nominal')"
                     />
                  </div>
               </div>
               <div class="row gap-4 mb-2">
                  <div class="input-field w-6/12">
                     <CustomRadioButton
                        label="Interval *"
                        :items="['bulanan', 'tahunan', 'lain-lain']"
                        v-model:input-value="iuran.interval"
                     />
                  </div>
               </div>
               <div v-if="iuran.interval == '2'" class="row gap-8 mb-2">
                  <div class="input-field w-6/12">
                     <VueMultiselect
                        v-model="iuran.interval_detail"
                        :options="state.multiSelect.options"
                        placeholder="pilih salah satu"
                     >
                     </VueMultiselect>
                  </div>
               </div>
            </template>
            <template v-slot:footer>
               <p class="text-sm font-semibold text-gray-400">* wajib diisi</p>
               <div class="mt-6">
                  <CustomButton
                     title="simpan data"
                     variant="solid"
                     color="primary"
                     size="md"
                     block
                     @button-action="validateForm"
                  />
               </div>
            </template>
         </CustomModal>
      </CustomOverlay>
   </div>
   <Sidebar />
</template>
