<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import VueMultiselect from 'vue-multiselect'
import Swal from 'sweetalert2'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomModal from '../../components/CustomModal.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'
import CustomInput from '../../components/CustomInput.vue'
import {
   iuranScheme,
   iuranExistScheme,
} from '../../utils/validation/iuran.scheme'

const store = useStore()
const overlayIsActive = ref(false)
const optionalFormKey = {
   exist: ['id_iuran', 'inklusi'],
   baru: ['keterangan', 'interval_detail'],
}
let iuranKey = {
   exist: null,
   baru: null,
}
/* let iuranBaruKey = null */
/* let iuranExistKey = null */
const iuranOption = ref('')
/* const iuranExist = ref({ */
/*    id_iuran: '', */
/*    nominal: '', */
/*    inklusi: '1', */
/* }) */
/* const iuranBaru = ref({ */
/*    nama: '', */
/*    keterangan: '', */
/*    nominal: '', */
/*    interval: '', */
/*    interval_detail: '', */
/* }) */
const iuran = ref({
   exist: {
      id_iuran: '',
      nominal: '',
      inklusi: '1',
   },
   baru: {
      nama: '',
      keterangan: '',
      nominal: '',
      interval: '',
      interval_detail: '',
   },
})
/* const errorStateIuranExist = ref({ */
/*   nominal: { */
/*     isError: true, */
/*     message: '', */
/*   }, */
/* }) */
/* const errorStateIuranBaru = ref({ */
/*   nama: { */
/*     isError: true, */
/*     message: '', */
/*   }, */
/*   nominal: { */
/*     isError: true, */
/*     message: '', */
/*   }, */
/*   interval: { */
/*     isError: false, */
/*     message: '', */
/*   }, */
/* }) */
const errorState = ref({
   exist: {
      nominal: {
         isError: true,
         message: '',
      },
   },
   baru: {
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
   },
})

const tableData = ref({
   columns: [],
   rows: [],
})
const multiSelect = reactive({
   exist: {
      value: '',
      options: [],
   },
   baru: {
      value: '',
      options: ['hanya sekali', 'kelas 6'],
   },
})
const iuranInklusiTable = ref({
   columns: [],
   rows: [],
})
function toggleModal(value) {
   /* true */
   overlayIsActive.value = value
   if (!value) {
      /* false */
      overlayIsActive.value = value
      clearForm()
      iuranOption.value = '0'
   }
}
function clearForm() {
   /* clear for exist form */
   _.forEach(iuranKey.exist, (key) => {
      if (key != 'inklusi') {
         iuran.value.exist[key] = ''
      }
   })
   multiSelect.exist.value = ''
   /* clear for baru form */
   _.forEach(iuranKey.baru, (key) => {
      if (key != 'interval') {
         iuran.value.baru[key] = ''
         // if input !=  optionalForm, clear their input
         if (_.findIndex(optionalFormKey.baru, (data) => data == key) === -1) {
            errorState.value.baru[key].isError = true
         }
      } else {
         iuran.value.baru[key] = '0'
      }
   })
}

const getWindowSize = computed(() => {
   if (store.getters['windowProp/getWidth'] >= 1024) {
      return 'sm'
   }
   return 'lg'
})

async function fetchIuranUmum() {
   await store.dispatch('iuran/getAllUmum')
   multiSelect.exist.options = store.getters['iuran/getIuran']
}

async function validateInput(field) {
   if (iuranOption.value == '0') {
      await iuranExistScheme
         .validateAt(field, iuran.value.exist)
         .then(() => {
            errorState.value.exist[field].isError = false
         })
         .catch((err) => {
            errorState.value.exist[field].isError = true
            errorState.value.exist[field].message = err.message
         })
   } else if (iuranOption.value == '1') {
      await iuranScheme
         .validateAt(field, iuran.value.baru)
         .then(() => {
            errorState.value.baru[field].isError = false
         })
         .catch((err) => {
            errorState.value.baru[field].isError = true
            errorState.value.baru[field].message = err.message
         })
   }
}

function validateForm() {
   if (iuranOption.value == '0') {
      let validCount = 0
      _.forEach(iuranKey.exist, (key) => {
         if (_.findIndex(optionalFormKey.exist, (data) => data == key) === -1) {
            if (!errorState.value.exist[key].isError) {
               validCount++
            }
         } else {
            iuran.value.exist[key] != '' ? validCount++ : ''
         }
      })
      if (validCount == iuranKey.exist.length) {
         submitAction()
      } else {
         Swal.fire({
            icon: 'warning',
            text: 'terdapat form yang belum terisi',
            confirmButtonText: 'tutup',
         })
      }
   } else if (iuranOption.value == '1') {
      console.log('validation iuran baru')
   }
}

async function submitAction() {
   if (iuranOption.value == '0') {
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
            await store
               .dispatch('variantIuran/add', iuranExist.value)
               .then(async () => {
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
}

watch(iuranOption, async (value) => {
   if (value == '0') {
      await fetchIuranUmum()
   }
   clearForm()
})

watch(
   () => multiSelect.exist.value,
   (value) => {
      iuranExist.value.id_iuran = value.id_iuran
   }
)
onMounted(() => {
   store.commit('sidebar/setActivePage', 'iuran inklusi')
   tableData.value.columns = store.getters['vueTable/getColumn']('iuran')
   iuranKey.exist = _.keys(iuran.value.exist)
   iuranKey.baru = _.keys(iuran.value.baru)
   iuranOption.value = '0'
})
</script>
<template>
   <div class="content">
      <div class="wrapper">
         <CustomHeader />
         <div class="table-data">
            <div class="table-data__title">
               <h4>data iuran inklusi</h4>
               <CustomButton
                  title="tambah data"
                  color="primary"
                  @button-action="toggleModal(true)"
                  :size="getWindowSize"
               />
            </div>
         </div>
      </div>
      <CustomOverlay v-if="overlayIsActive" @click="toggleModal(false)">
         <CustomModal>
            <template v-slot:title>
               <h4>tambah data iuran inklusi</h4>
            </template>
            <template v-slot:body>
               <div class="row gap-4 my-6 border-b-2 border-verdigris">
                  <div class="input-field w-6/12">
                     <CustomRadioButton
                        label="gunakan data iuran? "
                        :items="['yang sudah ada', 'tambah data baru']"
                        v-model:input-value="iuranOption"
                     />
                  </div>
               </div>
               <div v-if="iuranOption == '0'">
                  <div class="row gap-4 mb-2">
                     <div class="input-field w-1/2">
                        <label class="custom-input__label">Pilih Iuran *</label>
                        <VueMultiselect
                           v-model="multiSelect.exist.value"
                           :options="multiSelect.exist.options"
                           track-by="id_iuran"
                           label="nama"
                           placeholder="pilih salah satu"
                        >
                        </VueMultiselect>
                     </div>
                     <div class="input-field w-1/2">
                        <CustomInput
                           type="number"
                           label="nominal *"
                           placeholder="masukan nominal"
                           :error-state="errorStateIuranExist.nominal"
                           v-model:input-value="iuranExist.nominal"
                           @validate-input="validateInput('nominal')"
                        />
                     </div>
                  </div>
               </div>
               <div v-if="iuranOption == '1'">
                  <div class="row mb-2">
                     <div class="input-field w-full">
                        <CustomInput
                           type="text"
                           label="nama iuran *"
                           placeholder="masukan nama iuran"
                           :error-state="errorStateIuranBaru.nama"
                           v-model:input-value="iuranBaru.nama"
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
                           :error-state="errorStateIuranBaru.keterangan"
                           v-model:input-value="iuranBaru.keterangan"
                        />
                     </div>
                     <div class="input-field w-1/2">
                        <CustomInput
                           type="number"
                           label="nominal *"
                           placeholder="masukan nominal"
                           :error-state="errorStateIuranBaru.nominal"
                           v-model:input-value="iuranBaru.nominal"
                           @validate-input="validateInput('nominal')"
                        />
                     </div>
                  </div>
                  <div class="row gap-4 mb-2">
                     <div class="input-field w-6/12">
                        <CustomRadioButton
                           label="Interval *"
                           :items="['bulanan', 'tahunan', 'lain-lain']"
                           v-model:input-value="iuranBaru.interval"
                        />
                     </div>
                  </div>
                  <div v-if="iuranBaru.interval == '2'" class="row gap-8 mb-2">
                     <div class="input-field w-6/12">
                        <VueMultiselect
                           v-model="multiSelect.baru.value"
                           :options="multiSelect.baru.options"
                           placeholder="pilih salah satu"
                        >
                        </VueMultiselect>
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
