<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table-next'
import Swal from 'sweetalert2'

import { siswaScheme } from '../../utils/validation/siswa.schema'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomModal from '../../components/CustomModal.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import CustomInput from '../../components/CustomInput.vue'
import CustomDatePicker from '../../components/CustomDatePicker.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'
import CustomTextarea from '../../components/CustomTextarea.vue'
import { cross } from '../../utils/svg-var'

const store = useStore()
const overlayIsActive = ref(true)
const dataSiswa = ref({
  nama: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  tanggal_lahir: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  jenis_kelamin: {
    value: '1',
    isValid: true,
    errorMessage: '',
  },
  nama_orang_tua: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  no_telepon: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  alamat: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  inklusi: {
    value: '1',
    isValid: true,
    errorMessage: '',
  },
})
let dataSiswaKey = null
let el = null
const errorState = ref({
  status: '',
  message: ''
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
    /* { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 }, */
    /* { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 }, */
    /* { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 }, */
    /* { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 }, */
    /* { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 }, */
  ],
})
// -------------- function --------------
function activeModal() {
  overlayIsActive.value = !overlayIsActive.value
  clearForm()
}

function clearForm() {
  _.forEach(dataSiswaKey, (key) => {
    if (key != 'jenis_kelamin' && key != 'inklusi') {
      dataSiswa.value[key].value = ''
      dataSiswa.value[key].isValid = false
      console.log("clear form run")
    }
  })
}
async function validateInput(field) {
  await siswaScheme
    .validateAt(field + '.value', dataSiswa.value)
    .then((result) => {
      dataSiswa.value[field].isValid = true
    })
    .catch((err) => {
      dataSiswa.value[field].errorMessage = err.message
      dataSiswa.value[field].isValid = false
    })
}
function validateBeforeSubmit() {
  let validCount = 0
  _.forEach(dataSiswaKey, (key) => {
    if (dataSiswa.value[key].isValid) {
      validCount++
      /* Swal.fire({ */
      /*   icon: 'warning', */
      /*   text: "data belum terisi semua." */
      /* }) */
    }
  })
  /* Swal.fire({ */
  /*   icon: 'question', */
  /*   text: "simpan data, anda yakin ?" */
  /* }) */

  if (validCount == dataSiswaKey.length) {
    console.log("ready to save")
  }
  console.log(validCount)
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
  store.commit('sidebar/setActivePage', 'siswa')
  overlayIsActive.value = false
  dataSiswaKey = _.keys(dataSiswa.value)
  el = document.getElementById('custom-alert')
})
</script>
<template>
  <div class="content">
    <div class="wrapper">
      <CustomHeader />
      <div class="table-data">
        <div class="table-data__title">
          <h4>data siswa</h4>
          <CustomButton title="tambah data" color="primary" @button-action="activeModal" :size="getWindowSize" />
        </div>
        <vue-good-table :columns="tableData.columns" :rows="tableData.rows" styleClass="vgt-table striped" />
      </div>
    </div>
    <CustomOverlay v-if="overlayIsActive" @click="activeModal">
      <CustomModal>
        <template v-slot:title>
          <h4>tambah data siswa</h4>
        </template>
        <template v-slot:body>
          <div class="row mb-2">
            <div class="input-field w-full">
              <CustomInput type="text" label="nama siswa" :error-state="{
                 isError: !dataSiswa.nama.isValid,
                 message: dataSiswa.nama.errorMessage,
              }" v-model:input-value="dataSiswa.nama.value" @validate-input="validateInput('nama')" />
            </div>
          </div>
          <div class="row gap-8 mb-2">
            <div class="input-field w-6/12">
              <CustomDatePicker label="tanggal lahir" placeholder="pilih tanggal"
                v-model:input-value="dataSiswa.tanggal_lahir.value" @validate-input="validateInput('tanggal_lahir')" />
            </div>
            <div class="input-field w-6/12">
              <CustomRadioButton label="jenis kelamin" :item="['laki-laki', 'perempuan']"
                v-model:input-value="dataSiswa.jenis_kelamin.value" @validate-input="validateInput('jenis_kelamin')" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-field w-full">
              <CustomInput label="nama orang tua" :error-state="{
                 isError: !dataSiswa.nama_orang_tua.isValid,
                 message: dataSiswa.nama_orang_tua.errorMessage,
              }" v-model:input-value="dataSiswa.nama_orang_tua.value"
                @validate-input="validateInput('nama_orang_tua')" />
            </div>
          </div>
          <div class="row gap-8 mb-2">
            <div class="input-field w-1/2">
              <CustomInput label="nomor telepon" :error-state="{
                 isError: !dataSiswa.no_telepon.isValid,
                 message: dataSiswa.no_telepon.errorMessage,
              }" v-model:input-value="dataSiswa.no_telepon.value" @validate-input="validateInput('no_telepon')" />
            </div>
            <div class="input-field w-1/2">
              <CustomRadioButton label="Inklusi" :item="['tidak', 'ya']" v-model:input-value="dataSiswa.inklusi.value"
                @validate-input="validateInput('inklusi')" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="input-field w-full">
              <CustomTextarea label="alamat" :error-state="{
                 isError: !dataSiswa.alamat.isValid,
                 message: dataSiswa.alamat.errorMessage,
              }" v-model:input-value="dataSiswa.alamat.value" @validate-input="validateInput('alamat')" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <CustomButton title="simpan data" variant="solid" color="primary" size="md" block
            @button-action="validateBeforeSubmit" />
        </template>
      </CustomModal>
    </CustomOverlay>
  </div>
  <Sidebar />
</template>
