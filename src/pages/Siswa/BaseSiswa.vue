<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { VueGoodTable } from 'vue-good-table-next'

import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomModal from '../../components/CustomModal.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import CustomInput from '../../components/CustomInput.vue'
import CustomDatePicker from '../../components/CustomDatePicker.vue'
import CustomTreeSelect from '../../components/CustomTreeSelect.vue'

const store = useStore()
const overlayIsActive = ref(true)
const siswa = ref({
   nama: '',
   tanggal_lahir: '',
   jenis_kelamin: '',
   nama_orang_tua: '',
   no_telepon: '',
   alamat: '',
   inklusi: '',
})
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
         label: 'Tanggal Lahir',
         field: 'tanggal_lahir',
         type: 'date',
         dateInputFormat: 'yyyy-MM-dd',
         dateOutputFormat: 'MMM do yy',
         thClass: 'text-left',
      },
      {
         label: 'Jenis Kelamin',
         field: 'jenis_kelamin',
         thClass: 'text-left',
      },
      {
         label: 'Nama Orang Tua',
         field: 'nama_orang_tua',
         thClass: 'text-left',
      },
      {
         label: 'Alamat',
         field: 'alamat',
         thClass: 'text-left',
      },
   ],
   rows: [
      {
         nomor: 1,
         nama: 'maman',
         tanggl_lahir: '2011-10-31',
         jenis_kelamin: 'laki-laki',
         nama_orang_tua: 'indro',
         alamat: 'saguling',
      },
      {
         nomor: 2,
         nama: 'maman',
         tanggl_lahir: '2011-10-31',
         jenis_kelamin: 'laki-laki',
         nama_orang_tua: 'indro',
         alamat: 'saguling',
      },
      {
         nomor: 3,
         nama: 'maman',
         tanggl_lahir: '2011-10-31',
         jenis_kelamin: 'laki-laki',
         nama_orang_tua: 'indro',
         alamat: 'saguling',
      },
      {
         nomor: 4,
         nama: 'maman',
         tanggl_lahir: '2011-10-31',
         jenis_kelamin: 'laki-laki',
         nama_orang_tua: 'indro',
         alamat: 'saguling',
      },
      {
         nomor: 5,
         nama: 'maman',
         tanggl_lahir: '2011-10-31',
         jenis_kelamin: 'laki-laki',
         nama_orang_tua: 'indro',
         alamat: 'saguling',
      },
      /* { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 }, */
      /* { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 }, */
      /* { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 }, */
      /* { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 }, */
      /* { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 }, */
   ],
})

const schema = yup.object({
   nama: yup.string().required().min(3),
   tanggalLahir: yup.string().required(),
})

useForm({ validationSchema: schema })

// -------------- function --------------
function activeModal() {
   overlayIsActive.value = !overlayIsActive.value
   siswa.value.tanggal_lahir = ''
}

// -------------- computed --------------
const getWindowSize = computed(() => {
   if (store.getters['windowProp/getWidth'] >= 1024) {
      return 'sm'
   }
   return 'lg'
})

watch(
   () => siswa.value.tanggal_lahir,
   (tanggal_lahir) => {
      console.log(tanggal_lahir)
   }
)

// -------------- cyclehook --------------
onMounted(() => {
   overlayIsActive.value = false
   store.commit('sidebar/setActivePage', 'siswa')
})
</script>
<template>
   <div class="content">
      <div class="wrapper">
         <CustomHeader />
         <div class="table-data">
            <div class="table-data__title">
               <h4>data siswa</h4>
               <CustomButton
                  title="tambah data"
                  color="primary"
                  @button-action="activeModal"
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
      <CustomOverlay v-if="overlayIsActive" @click="activeModal">
         <CustomModal>
            <template v-slot:title>
               <h4>tambah data siswa</h4>
            </template>
            <template v-slot:body>
               <div class="row mb-4">
                  <div class="input-field w-full">
                     <CustomInput
                        type="text"
                        label="nama siswa"
                        name="nama"
                        v-model:input-value="siswa.nama"
                     />
                  </div>
               </div>
               <div class="row gap-8 mb-4">
                  <div class="input-field w-6/12">
                     <CustomDatePicker
                        label="tanggal lahir"
                        placeholder="pilih tanggal"
                        name="tanggalLahir"
                        v-model:input-value="siswa.tanggal_lahir"
                     />
                  </div>
                  <div class="input-field w-6/12">
                     <CustomTreeSelect label="jenis kelamin" />
                  </div>
               </div>
            </template>
            <template v-slot:footer> </template>
         </CustomModal>
      </CustomOverlay>
   </div>
   <Sidebar />
</template>
