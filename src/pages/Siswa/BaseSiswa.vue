<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table-next'
import Swal from 'sweetalert2'
import { siswaScheme } from '../../utils/validation/siswa.scheme'
import { setGender } from '../../utils/etc.helper.js'

import { user } from '../../utils/svg-var'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomModal from '../../components/CustomModal.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import CustomInput from '../../components/CustomInput.vue'
import CustomDatePicker from '../../components/CustomDatePicker.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'
import CustomTextarea from '../../components/CustomTextarea.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import InformasiSiswa from './Detail.vue'

const store = useStore()
/** @type {boolean} overlay value */
const overlayIsActive = ref(false)
/** @type {Object} modal  */
const modal = ref({
   add: false,
   detail: false,
})
/** @type {Object} modalDetail data siswa | akademik  */
const modalDetail = ref('')
/** @type {Array ?} key for validate siswa object*/
let siswaKey = null
/** @type {Array} optional form key */
const optionalFormKey = ['nisn', 'nik', 'no_kk']
/** @type {string} form section siswa | orang-tua */
const formSectionActive = ref('siswa')
/** @type {Object} siswa */
const siswa = ref({
   nisn: '',
   nik: '',
   no_kk: '',
   nama: '',
   jenis_kelamin: '0',
   tempat_lahir: '',
   tanggal_lahir: '',
   nama_ayah: '',
   nama_ibu: '',
   no_telepon: '',
   alamat: '',
   inklusi: '0',
   kelas: '',
})
/** @type {Object} error state for each input */
const errorState = ref({
   nama: {
      isError: true,
      message: '',
   },
   jenis_kelamin: {
      isError: false,
      message: '',
   },
   tempat_lahir: {
      isError: true,
      message: '',
   },
   tanggal_lahir: {
      isError: true,
      message: '',
   },
   nama_ayah: {
      isError: true,
      message: '',
   },
   nama_ibu: {
      isError: true,
      message: '',
   },
   no_telepon: {
      isError: true,
      message: '',
   },
   alamat: {
      isError: true,
      message: '',
   },
   inklusi: {
      isError: false,
      message: '',
   },
   kelas: {
      isError: true,
      message: '',
   },
})

const tableData = ref({
   columns: [],
   rows: [],
})
/**
 * toggle overlay and modal
 * @param {boolean} active
 * @param {string} modalName menu | add | detail
 */
function toggleModal(active, modalName) {
   if (active) {
      overlayIsActive.value = true
      modal.value[modalName] = true
   } else if (!active) {
      overlayIsActive.value = false
      _.forEach(modal.value, (item, key) => {
         modal.value[key] = false
      })
      clearForm()
      setFormSectionActive('siswa')
   }
}

/**
 * toggle detail on modal detail
 * @param {string} detailName detail siswa | akademik
 */
function toggleDetail(detailName) {
   modalDetail.value = detailName
}
/**
 * clear all input form
 */
function clearForm() {
   _.forEach(siswaKey, (key) => {
      if (key != 'jenis_kelamin' && key != 'inklusi') {
         siswa.value[key] = ''
         // if input != optionalForm, clear their input
         if (_.findIndex(optionalFormKey, (data) => data == key) === -1) {
            errorState.value[key].isError = true
         }
      } else {
         siswa.value[key] = '0'
      }
   })
}

/**
 * toggle for form section
 * @param {string} siswa | orang tua
 */
function setFormSectionActive(sectionName) {
   formSectionActive.value = sectionName
}

/**
 * validate input when event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
   await siswaScheme
      .validateAt(field, siswa.value)
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
   _.forEach(siswaKey, (key) => {
      // ++ when each of input is valid
      if (_.findIndex(optionalFormKey, (data) => data == key) === -1) {
         if (!errorState.value[key].isError) {
            validCount++
         }
      }
   })

   if (validCount == siswaKey.length - optionalFormKey.length) {
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
         await store.dispatch('siswa/add', siswa.value).then(() => {
            toggleModal(false)
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
 * get width of window size from tsore
 */
const getWindowSize = computed(() => {
   if (store.getters['windowProp/getWidth'] >= 1024) {
      return 'sm'
   }
   return 'lg'
})

function generateVueTable() {
   tableData.value.columns = store.getters['vueTable/getColumn']('siswa')
   setColumnFn()
}
function setColumnFn() {
   const index = _.findIndex(tableData.value.columns, {
      field: 'jenis_kelamin',
   })
   tableData.value.columns[index].formatFn = setGender
}
function generateSiswaKey() {
   siswaKey = _.keys(siswa.value)
}

function setActivePage() {
   store.commit('sidebar/setActivePage', 'siswa')
}

async function fetchSiswa() {
   await store.dispatch('siswa/getAll')
   tableData.value.rows = store.getters['siswa/getSiswa']
}

// -------------- cyclehook --------------
onMounted(() => {
   setActivePage()
   generateVueTable()
   generateSiswaKey()
   fetchSiswa()
})
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
                  @button-action="toggleModal(true, 'add')"
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
               v-on:row-dblclick="
                  toggleModal(true, 'detail'), toggleDetail('data siswa')
               "
            />
         </div>
      </div>
   </div>
   <CustomOverlay v-show="overlayIsActive" @click="toggleModal(false, 'all')">
      <CustomModal v-if="modal.add">
         <template v-slot:title>
            <h4>tambah data siswa</h4>
         </template>
         <template v-slot:body>
            <div class="card__form-section">
               <h4
                  :class="[
                     'card__form-section__item',
                     {
                        'card__form-section__item--active':
                           formSectionActive == 'siswa',
                     },
                  ]"
                  @click="setFormSectionActive('siswa')"
               >
                  siswa
               </h4>
               <h4
                  :class="[
                     'card__form-section__item',
                     {
                        'card__form-section__item--active':
                           formSectionActive == 'orang tua',
                     },
                  ]"
                  @click="setFormSectionActive('orang tua')"
               >
                  orang tua
               </h4>
            </div>
            <div v-show="formSectionActive == 'siswa'">
               <div class="row gap-4 mb-2">
                  <div class="input-field w-4/12">
                     <CustomInput
                        type="text"
                        optional
                        label="NISN"
                        v-model:input-value="siswa.nisn"
                     />
                  </div>
                  <div class="input-field w-4/12">
                     <CustomInput
                        type="text"
                        label="NIK"
                        v-model:input-value="siswa.nik"
                     />
                  </div>
                  <div class="input-field w-4/12">
                     <CustomInput
                        type="text"
                        label="nomor KK"
                        v-model:input-value="siswa.no_kk"
                     />
                  </div>
               </div>
               <div class="row gap-4 mb-4">
                  <div class="input-field w-full">
                     <CustomInput
                        type="text"
                        label="nama siswa *"
                        :error-state="errorState.nama"
                        v-model:input-value="siswa.nama"
                        @validate-input="validateInput('nama')"
                     />
                  </div>
               </div>
               <div class="row gap-4 mb-4">
                  <div class="input-field w-4/12">
                     <CustomRadioButton
                        label="jenis kelamin *"
                        :items="['laki-laki', 'perempuan']"
                        v-model:input-value="siswa.jenis_kelamin"
                     />
                  </div>
                  <div class="input-field w-4/12">
                     <CustomInput
                        type="text"
                        label="tempat lahir *"
                        :error-state="errorState.tempat_lahir"
                        v-model:input-value="siswa.tempat_lahir"
                        @validate-input="validateInput('tempat_lahir')"
                     />
                  </div>
                  <div class="input-field w-4/12">
                     <CustomDatePicker
                        label="tanggal lahir *"
                        placeholder="pilih tanggal"
                        v-model:input-value="siswa.tanggal_lahir"
                        @validate-input="validateInput('tanggal_lahir')"
                     />
                  </div>
               </div>
               <div class="row gap-2 mb-4">
                  <div class="input-field w-1/2">
                     <CustomInput
                        type="number"
                        label="diterima di kelas *"
                        :error-state="errorState.kelas"
                        v-model:input-value="siswa.kelas"
                        @validate-input="validateInput('kelas')"
                     />
                  </div>
                  <div class="input-field w-1/2">
                     <CustomRadioButton
                        label="Inklusi *"
                        :items="['tidak', 'ya']"
                        v-model:input-value="siswa.inklusi"
                     />
                  </div>
               </div>
            </div>

            <div v-show="formSectionActive == 'orang tua'">
               <div class="row gap-4 mb-2">
                  <div class="input-field w-6/12">
                     <CustomInput
                        label="nama ayah"
                        :error-state="errorState.nama_ayah"
                        v-model:input-value="siswa.nama_ayah"
                        @validate-input="validateInput('nama_ayah')"
                     />
                  </div>
                  <div class="input-field w-6/12">
                     <CustomInput
                        label="nama ibu"
                        :error-state="errorState.nama_ibu"
                        v-model:input-value="siswa.nama_ibu"
                        @validate-input="validateInput('nama_ibu')"
                     />
                  </div>
               </div>
               <div class="row gap-8 mb-2">
                  <div class="input-field w-1/2">
                     <CustomInput
                        label="nomor telepon"
                        :error-state="errorState.no_telepon"
                        v-model:input-value="siswa.no_telepon"
                        @validate-input="validateInput('no_telepon')"
                     />
                  </div>
               </div>
               <div class="row mb-2">
                  <div class="input-field w-full">
                     <CustomTextarea
                        label="alamat"
                        :error-state="errorState.alamat"
                        v-model:input-value="siswa.alamat"
                        @validate-input="validateInput('alamat')"
                     />
                  </div>
               </div>
            </div>
         </template>
         <template v-slot:footer>
            <p class="text-sm font-semibold text-gray-400">* wajib diisi</p>
            <div class="mt-6">
               <CustomButton
                  title="simpan data"
                  variant="solid"
                  color="verdigris"
                  size="md"
                  block
                  @button-action="validateForm"
               />
            </div>
         </template>
      </CustomModal>
      <InformasiSiswa v-if="modal.detail" />
   </CustomOverlay>
</template>
