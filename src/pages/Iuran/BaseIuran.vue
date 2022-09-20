<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import CustomModal from '../../components/CustomModal.vue'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomButton from '../../components/CustomButton.vue'
import { iuranScheme } from '../../utils/validation/iuran.scheme'
import CustomInput from '../../components/CustomInput.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'

const store = useStore()
const overlayIsActive = ref(true)
let iuranKey = null
const iuran = ref({
   nama: {
      value: '',
      isValid: false,
      errorMessage: '',
   },
   keterangan: {
      value: '',
      isValid: false,
      errorMessage: '',
   },
   nominal: {
      value: '',
      isValid: false,
      errorMessage: '',
   },
   interval: {
      value: '',
      isValid: false,
      errorMessage: '',
   },
})
// -------------- function --------------

function activeModal() {
   overlayIsActive.value = !overlayIsActive.value
   clearForm()
}

function clearForm() {}

async function validateInput(field) {
   await iuranScheme
      .validateAt(field + '.value', iuran.value)
      .then((result) => {
         iuran.value[field].isValid = true
      })
      .catch((err) => {
         iuran.value[field].errorMessage = err.message
         iuran.value[field].isValid = false
      })
}
function validateBeforeSubmit() {
   let validCount = 0
   _.forEach(iuranKey, (key) => {
      if (iuran.value[key].isValid) {
         validCount++
      }
   })

   if (validCount == iuranKey.length) {
      /* submitAction() */
   } else {
      Swal.fire({
         icon: 'warning',
         text: 'terdapat form yang belum terisi',
         confirmButtonText: 'tutup',
      })
   }
}
// -------------- computed --------------
const getWindowSize = computed(() => {
   if (store.getters['windowProp/getWidth'] >= 1024) {
      return 'sm'
   }
   return 'lg'
})
// -------------- cyclehook --------------
onMounted(() => {
   store.commit('sidebar/setActivePage', 'iuran')
   overlayIsActive.value = false
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
                  @button-action="activeModal"
                  :size="getWindowSize"
               />
            </div>
         </div>
      </div>
      <CustomOverlay v-show="overlayIsActive">
         <CustomModal>
            <template v-slot:title>
               <h4>tambah data iuran</h4>
            </template>
            <template v-slot:body>
               <div class="row mb-2">
                  <div class="input-field w-full">
                     <CustomInput
                        type="text"
                        label="nama iuran"
                        placeholder="masukan nama iuran"
                        :error-state="{
                           isError: !iuran.nama.isValid,
                           message: iuran.nama.errorMessage,
                        }"
                        v-model:input-value="iuran.nama.value"
                        @validate-input="validateInput('nama')"
                     />
                  </div>
               </div>
               <div class="row mb-2">
                  <div class="input-field w-full">
                     <CustomInput
                        type="text"
                        label="keterangan 'optional'"
                        placeholder="masukan keterangan"
                        v-model:input-value="iuran.keterangan.value"
                        @validate-input="validateInput('keterangan')"
                     />
                  </div>
               </div>
               <div class="row gap-8 mb-2">
                  <div class="input-field w-6/12">
                     <CustomInput
                        type="number"
                        label="nominal"
                        placeholder="masukan nominal"
                        :error-state="{
                           isError: !iuran.nominal.isValid,
                           message: iuran.nominal.errorMessage,
                        }"
                        v-model:input-value="iuran.nominal.value"
                        @validate-input="validateInput('nominal')"
                     />
                  </div>

                  <div class="input-field w-6/12">
                     <CustomRadioButton
                        label="Interval"
                        :item="['monthly', 'yearly']"
                        v-model:input-value="iuran.interval.value"
                        @validate-input="validateInput('interval')"
                     />
                  </div>
               </div>
            </template>
            <template v-slot:footer>
               <CustomButton
                  title="simpan data"
                  variant="solid"
                  color="primary"
                  size="md"
                  block
                  @button-action="validateBeforeSubmit"
               />
            </template>
         </CustomModal>
      </CustomOverlay>
   </div>
   <Sidebar />
</template>
