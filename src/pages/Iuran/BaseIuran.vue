<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table-next'
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
/** @type {Array?} iuran object key */
let iuranKey = null
/** @type {Array} optional form key */
const optionalFormKey = ['keterangan']
/** @type {Object}  */
const iuran = ref({
   nama: '',
   keterangan: '',
   nominal: '',
   interval: '0',
   inklusi: '0',
})
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
   inklusi: {
      isError: false,
      message: '',
   },
})
// -------------- function --------------

const tableData = ref({
   columns: [
      {
         label: 'No',
         field: 'nomor',
         type: 'number',
         thClass: 'text-left !w-16',
         tdClass: 'text-left !pl-5',
      },
      {
         label: 'Nama',
         field: 'nama',
         thClass: 'text-left',
      },
      {
         label: 'Nominal',
         field: 'nominal',
         thClass: 'text-left',
      },
      {
         label: 'Interval',
         field: 'interval',
         thClass: 'text-left',
      },
   ],
   rows: [
      /* { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 }, */
      /* { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 }, */
      /* { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 }, */
      /* { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 }, */
      /* { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 }, */
   ],
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
            errrState.value[key].isError = true
         }
      }
   })
}

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
      if (!errorState.value[key].isError) {
         validCount++
      }
   })
   console.log(validCount)
   if (validCount == iuranKey.length) {
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
   await store.dispatch('iuran/add', iuran.value).then(() => {
      activeModal()
      Swal.fire({
         icon: 'success',
         text: 'data berhasil disimpan',
         confirmButtonText: 'tutup',
      })
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
// -------------- cyclehook --------------
onMounted(() => {
   store.commit('sidebar/setActivePage', 'iuran')
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
                        @validate-input="validateInput('keterangan')"
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
               <div class="row gap-8 mb-2">
                  <div class="input-field w-4/12">
                     <CustomRadioButton
                        label="Interval *"
                        :items="['bulanan', 'tahunan', 'hanya sekali']"
                        v-model:input-value="iuran.interval"
                     />
                  </div>
                  <div class="input-field w-4/12">
                     <CustomRadioButton
                        label="iuran inklusi ? *"
                        :items="['tidak', 'ya']"
                        v-model:input-value="iuran.inklusi"
                     />
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
