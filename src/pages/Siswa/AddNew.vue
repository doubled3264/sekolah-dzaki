<script setup>
import { onMounted, ref } from 'vue'
import _ from 'lodash'
import Swal from 'sweetalert2'
import { siswaScheme } from '../../utils/validation/siswa.scheme'
import CustomModal from '../../components/CustomModal.vue'
import CustomInput from '../../components/CustomInput.vue'
import CustomDatePicker from '../../components/CustomDatePicker.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'
import CustomTextarea from '../../components/CustomTextarea.vue'
import CustomButton from '../../components/CustomButton.vue'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['fetchSiswaData', 'closeModal'])
/** @type {Array ?} key for validate siswa object*/
let siswaKey = null
/** @type {Array} optional form key */
const optionalFormKey = ['nik', 'no_kk']
/** @type {String} siswa | orang tua  */
const formAddNewSiswaSection = ref('siswa')
/** @type {Object} siswa */
const siswa = ref({
   nik: '',
   no_kk: '',
   nama: '',
   jenis_kelamin: '',
   tempat_lahir: '',
   tanggal_lahir: '',
   nama_ayah: '',
   nama_ibu: '',
   no_telepon: '',
   alamat: '',
   kelas: '',
})
/** @type {Object} error state for each input */
const errorState = ref({
   nama: {
      isError: true,
      message: '',
   },
   jenis_kelamin: {
      isError: true,
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
   kelas: {
      isError: true,
      message: '',
   },
})
onMounted(() => {
   generateSiswaKey()
})
/**
 * generate siswa oject key for validation before submit
 */
function generateSiswaKey() {
   siswaKey = _.keys(siswa.value)
}
/**
 * toggle form add new siswa section
 * @param {string} value siswa | orang tua
 */
function toggleFormAddNewSiswaSection(value) {
   formAddNewSiswaSection.value = value
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
         saveSiswaData()
      }
   })
}

/**
 * save siswa data to DB
 */
async function saveSiswaData() {
   await store.dispatch('siswa/add', siswa.value).then(() => {
      Swal.fire({
         icon: 'success',
         text: 'data berhasil disimpan',
         showConfirmButton: false,
         timer: 1500,
      })
      emit('closeModal')
      emit('fetchSiswaData')
   })
}
</script>
<template>
   <CustomModal>
      <div class="siswa__modal__add-new" @click.stop>
         <div class="custom-card">
            <div class="custom-card__header">
               <div class="custom-card__title">
                  <h4>form pendaftaran calon siswa</h4>
               </div>
            </div>
            <div
               class="custom-card__body"
               v-show="formAddNewSiswaSection == 'siswa'"
            >
               <div class="siswa__modal__add-new__form-title">
                  <p>form data siswa</p>
               </div>
               <div class="siswa__modal__add-new__form">
                  <div class="row gap-4 mb-2">
                     <div class="input-field w-6/12">
                        <CustomInput
                           type="text"
                           label="NIK"
                           v-model:input-value="siswa.nik"
                        />
                     </div>
                     <div class="input-field w-6/12">
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
                           @validate-input="validateInput('jenis_kelamin')"
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
                  <div class="row gap-6 mb-4">
                     <div class="input-field w-1/2">
                        <CustomInput
                           type="number"
                           label="diterima di kelas *"
                           :error-state="errorState.kelas"
                           v-model:input-value="siswa.kelas"
                           @validate-input="validateInput('kelas')"
                        />
                     </div>
                  </div>
                  <div class="row">
                     <p class="text-sm font-semibold text-gray-400">
                        * wajib diisi
                     </p>
                  </div>
               </div>
            </div>
            <div
               class="custom-card__footer"
               v-show="formAddNewSiswaSection == 'siswa'"
            >
               <div
                  class="siswa__modal__add-new__next-form"
                  @click="toggleFormAddNewSiswaSection('orang tua')"
               >
                  <p>selanjutnya</p>
               </div>
            </div>
            <div
               class="custom-card__body"
               v-show="formAddNewSiswaSection == 'orang tua'"
            >
               <div class="siswa__modal__add-new__form-title">
                  <p>form data orang tua</p>
               </div>
               <div class="siswa__modal__add-new__form">
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
                  <div class="row">
                     <p class="text-sm font-semibold text-gray-400">
                        * wajib diisi
                     </p>
                  </div>
               </div>
            </div>
            <div
               class="custom-card__footer"
               v-show="formAddNewSiswaSection == 'orang tua'"
            >
               <div
                  class="siswa__modal__add-new__prev-form"
                  @click="toggleFormAddNewSiswaSection('siswa')"
               >
                  <p>sebelumnya</p>
               </div>
               <div class="mt-6 px-2">
                  <CustomButton
                     title="simpan data"
                     variant="solid"
                     color="verdigris"
                     size="md"
                     block
                     @button-action="validateForm"
                  />
               </div>
            </div>
         </div>
      </div>
   </CustomModal>
</template>
