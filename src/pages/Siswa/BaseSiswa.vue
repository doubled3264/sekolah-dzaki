<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table-next'
import Swal from 'sweetalert2'

import { siswaScheme } from '../../utils/validation/siswa.scheme'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomModal from '../../components/CustomModal.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import CustomInput from '../../components/CustomInput.vue'
import CustomDatePicker from '../../components/CustomDatePicker.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'
import CustomTextarea from '../../components/CustomTextarea.vue'

const store = useStore()
const overlayIsActive = ref(true)
let siswaKey = null
const formSectionActive = ref('siswa')
const siswa = ref({
  nisn: {
    value: '',
  },
  nik: {
    value: '',
  },
  no_kk: {
    value: '',
  },
  nama: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  jenis_kelamin: {
    value: '1',
    isValid: true,
    errorMessage: '',
  },
  tempat_lahir: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  tanggal_lahir: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  nama_ayah: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  nama_ibu: {
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
  kelas: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
})
const errorState = = ref({
  nama: {
    isError: true,
    message: ''
  },
  jenis_kelamin: {
    isError: false,
    message: ''
  },
  tempat_lahir: {
    isError: true,
    message: ''
  },
  tanggal_lahir: {
    isError: true,
    message: ''
  },
  nama_ayah: {
    isError: true,
    message: ''
  },
  nama_ibu: {
    isError: true,
    message: ''
  },
  no_telepon: {
    isError: true,
    message: ''
  },
  alamat: {
    isError: true,
    message: ''
  },
  inklusi: {
    isError: false,
    message: ''
  },
  kelas: {
    isError: true,
    message: ''
  },
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
function activeModal(active) {
  if (active) {
    overlayIsActive.value = true
  } else if (!active) {
    overlayIsActive.value = false
    clearForm()
  }
}

function clearForm() {
  _.forEach(siswaKey, (key) => {
    if (key != 'jenis_kelamin' && key != 'inklusi') {
      siswa.value[key].value = ''
      siswa.value[key].isValid = false
      console.log('clear form run')
    }
  })
}

function setFormSectionActive(sectionName) {
  formSectionActive.value = sectionName
}
async function validateInput(field) {
  await siswaScheme
    .validateAt(field + '.value', siswa.value)
    .then((result) => {
      siswa.value[field].isValid = true
    })
    .catch((err) => {
      siswa.value[field].errorMessage = err.message
      siswa.value[field].isValid = false
    })
}

function validateBeforeSubmit() {
  let validCount = 0
  _.forEach(siswaKey, (key) => {
    if (siswa.value[key].isValid) {
      validCount++
    }
  })

  if (validCount == siswaKey.length) {
    submitAction()
  } else {
    Swal.fire({
      icon: 'warning',
      text: 'terdapat form yang belum terisi',
      confirmButtonText: 'tutup',
    })
  }
}

async function submitAction() {
  const siswa = {}
  _.forEach(siswaKey, (key) => {
    siswa[key] = siswa.value[key].value
  })

  await store.dispatch('siswa/add', siswa).then(() => {
    activeModal()
    Swal.fire({
      icon: 'success',
      text: 'data berhasil disimpan',
      confirmButtonText: 'tutup',
    })
  })
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
  siswaKey = _.keys(siswa.value)
})
</script>
<template>
  <div class="content">
    <div class="wrapper">
      <CustomHeader />
      <div class="table-data">
        <div class="table-data__title">
          <h4>data siswa</h4>
          <CustomButton title="tambah data" color="primary" @button-action="activeModal(true)" :size="getWindowSize" />
        </div>
        <vue-good-table :columns="tableData.columns" :rows="tableData.rows" styleClass="vgt-table striped" />
      </div>
    </div>
    <CustomOverlay v-if="overlayIsActive" @click="activeModal(false)">
      <CustomModal>
        <template v-slot:title>
          <h4>tambah data siswa</h4>
        </template>
        <template v-slot:body>
          <div class="card__form-section">
            <h4 :class="[
               'card__form-section__item',
               {
                  'card__form-section__item--active':
                     formSectionActive == 'siswa',
               },
            ]" @click="setFormSectionActive('siswa')">
              siswa
            </h4>
            <h4 :class="[
               'card__form-section__item',
               {
                  'card__form-section__item--active':
                     formSectionActive == 'orang tua',
               },
            ]" @click="setFormSectionActive('orang tua')">
              orang tua
            </h4>
          </div>
          <div v-show="formSectionActive == 'siswa'">
            <div class="row gap-4 mb-2">
              <div class="input-field w-4/12">
                <CustomInput type="text" label="NISN" v-model:input-value="siswa.nisn.value" />
              </div>
              <div class="input-field w-4/12">
                <CustomInput type="text" label="NIK" v-model:input-value="siswa.nik.value" />
              </div>
              <div class="input-field w-4/12">
                <CustomInput type="text" label="nomor KK" v-model:input-value="siswa.no_kk.value" />
              </div>
            </div>
            <div class="row gap-4 mb-4">
              <div class="input-field w-full">
                <CustomInput type="text" label="nama siswa *" :error-state="{
                   isError: !siswa.nama.isValid,
                   message: siswa.nama.errorMessage,
                }" v-model:input-value="siswa.nama.value" @validate-input="validateInput('nama')" />
              </div>
            </div>
            <div class="row gap-4 mb-4">
              <div class="input-field w-4/12">
                <CustomRadioButton label="jenis kelamin *" :item="['laki-laki', 'perempuan']"
                  v-model:input-value="siswa.jenis_kelamin.value" @validate-input="validateInput('jenis_kelamin')" />
              </div>
              <div class="input-field w-4/12">
                <CustomInput type="text" label="tempat lahir *" :error-state="{
                   isError: !siswa.tempat_lahir.isValid,
                   message: siswa.tempat_lahir.errorMessage,
                }" v-model:input-value="siswa.tempat_lahir.value" @validate-input="validateInput('tempat_lahir')" />
              </div>
              <div class="input-field w-4/12">
                <CustomDatePicker label="tanggal lahir *" placeholder="pilih tanggal"
                  v-model:input-value="siswa.tanggal_lahir.value" @validate-input="validateInput('tanggal_lahir')" />
              </div>
            </div>
            <div class="row gap-2 mb-4">
              <div class="input-field w-1/2">
                <CustomInput type="number" label="diterima di kelas *" :error-state="{
                   isError: !siswa.kelas.isValid,
                   message: siswa.kelas.errorMessage,
                }" v-model:input-value="siswa.kelas.value" @validate-input="validateInput('kelas')" />
              </div>
              <div class="input-field w-1/2">
                <CustomRadioButton label="Inklusi *" :item="['tidak', 'ya']" v-model:input-value="siswa.inklusi.value"
                  @validate-input="validateInput('inklusi')" />
              </div>
            </div>
          </div>

          <div v-show="formSectionActive == 'orang tua'">
            <div class="row gap-4 mb-2">
              <div class="input-field w-6/12">
                <CustomInput label="nama ayah" :error-state="{
                   isError: !siswa.nama_ayah.isValid,
                   message: siswa.nama_ayah.errorMessage,
                }" v-model:input-value="siswa.nama_ayah.value" @validate-input="validateInput('nama_ayah')" />
              </div>
              <div class="input-field w-6/12">
                <CustomInput label="nama ibu" :error-state="{
                   isError: !siswa.nama_ayah.isValid,
                   message: siswa.nama_ayah.errorMessage,
                }" v-model:input-value="siswa.nama_ayah.value" @validate-input="validateInput('nama_ayah')" />
              </div>
            </div>
            <div class="row gap-8 mb-2">
              <div class="input-field w-1/2">
                <CustomInput label="nomor telepon" :error-state="{
                   isError: !siswa.no_telepon.isValid,
                   message: siswa.no_telepon.errorMessage,
                }" v-model:input-value="siswa.no_telepon.value" @validate-input="validateInput('no_telepon')" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="input-field w-full">
                <CustomTextarea label="alamat" :error-state="{
                   isError: !siswa.alamat.isValid,
                   message: siswa.alamat.errorMessage,
                }" v-model:input-value="siswa.alamat.value" @validate-input="validateInput('alamat')" />
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <p class="text-sm font-semibold text-gray-400">* wajib diisi</p>
          <div class="mt-6">
            <CustomButton title="simpan data" variant="solid" color="primary" size="md" block
              @button-action="validateBeforeSubmit" />
          </div>
        </template>
      </CustomModal>
    </CustomOverlay>
  </div>
  <Sidebar />
</template>
