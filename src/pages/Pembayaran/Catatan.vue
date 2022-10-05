<script setup>
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import _ from 'lodash'
import { catatanScheme } from '../../utils/validation/pembayaran.scheme'
import CustomButton from '../../components/CustomButton.vue'
import CatatanItem from './CatatanItem.vue'
import CustomTextarea from '../../components/CustomTextarea.vue'
import CatatanDetail from './CatatanDetail.vue'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({ id_siswa: { type: String } })
/** @type {object}  */
const catatanComponent = ref({
   add: false,
   detail: false,
})
const catatanDetailId = ref('')
/** @type {Array?} key for validate catatan object  */
let catatanKey = null
/** @type {object}  */
const optionalFormKey = ['id_siswa']
/** @type {object}  */
const catatan = ref({
   id_siswa: '',
   isi_catatan: '',
})
const catatanList = ref([])
const errorState = ref({
   isi_catatan: {
      isError: true,
      message: '',
   },
})

/**
 * toggle add catatan form
 */
function toggleCatatanComponent() {
   catatanComponent.value.add = !catatanComponent.value.add
}
/**
 * clear all input form
 */
function clearForm() {
   _.forEach(catatanKey, (key) => {
      // if input != optionalForm, clear their input
      if (_.findIndex(optionalFormKey, (data) => data == key) === -1) {
         catatan.value[key] = ''

         errorState.value[key].isError = true
      }
   })
}

function showDetailNote(id) {
   catatanDetailId.value = id
   catatanComponent.value.detail = true
}

const getCatatanDetail = computed(() => {
   if (catatanDetailId.value) {
      return _.find(catatanList.value, { id: catatanDetailId.value })
   }
   return ''
})

/**
 * validate input when event triggered
 * @param {string} catatan object key
 */
async function validateInput(field) {
   await catatanScheme
      .validateAt(field, catatan.value)
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
   _.forEach(catatanKey, (key) => {
      if (_.findIndex(optionalFormKey, (data) => data == key) === -1) {
         if (!errorState.value[key].isError) {
            validCount++
         }
      }
   })

   if (validCount == catatanKey.length - optionalFormKey.length) {
      /* console.log('ready to submit') */
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
         await store.dispatch('catatan/add', catatan.value).then(() => {
            Swal.fire({
               icon: 'success',
               text: 'data berhasil disimpan',
               showConfirmButton: false,
               timer: 1500,
            })
            toggleCatatanComponent()
            clearForm()
            fetchCatatan()
         })
      }
   })
}
function generateCatatanKey() {
   catatanKey = _.keys(catatan.value)
}

async function fetchCatatan() {
   await store.dispatch('catatan/getSpecific', catatan.value)
   catatanList.value = store.getters['catatan/getCatatan']
}

async function deleteNote(id) {
   Swal.fire({
      title: 'Anda yakin ?',
      text: 'Catatan akan dihapus',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#c82333',
      confirmButtonText: 'Ya, hapus !',
      confirmButtonColor: '#41c3a9',
   }).then(async (result) => {
      if (result.isConfirmed) {
         await store.dispatch('catatan/remove', { id: id }).then(() => {
            Swal.fire({
               icon: 'success',
               text: 'data berhasil dihapus',
               showConfirmButton: false,
               timer: 1500,
            })
            catatanComponent.value.detail = false
            fetchCatatan()
         })
      }
   })
}

onMounted(() => {
   catatan.value.id_siswa = props.id_siswa
   console.log(catatan.value)
   generateCatatanKey()
   fetchCatatan()
})
</script>
<template>
   <div class="pembayaran__catatan">
      <div class="custom-card">
         <div class="custom-card__header">
            <div class="custom-card__title">
               <h4>catatan orang tua</h4>
            </div>
            <div class="custom-card__right-nav">
               <CustomButton
                  title="tambah catatan"
                  color="verdigris"
                  size="xs"
                  @button-action="toggleCatatanComponent"
               />
            </div>
         </div>
         <div class="custom-card__body">
            <div
               class="pembayaran__catatan__new-item"
               v-if="catatanComponent.add"
            >
               <CustomTextarea
                  type="text"
                  :error-state="errorState.isi_catatan"
                  v-model:input-value="catatan.isi_catatan"
                  @validate-input="validateInput('isi_catatan')"
               />
               <CustomButton
                  title="simpan"
                  color="verdigris"
                  size="sm"
                  block
                  @button-action="validateForm"
               />
            </div>
            <div class="pembayaran__catatan__list">
               <CatatanItem
                  v-for="(item, index) in catatanList"
                  :key="index + 1"
                  :catatan="item"
                  @get-detail-note="showDetailNote"
               />
            </div>
         </div>
      </div>
   </div>
   <CatatanDetail
      v-if="catatanComponent.detail"
      :catatan="getCatatanDetail"
      @delete-note="deleteNote"
      @close-detail="catatanComponent.detail = false"
   />
</template>
