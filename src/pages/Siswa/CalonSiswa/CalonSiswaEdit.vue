<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { calonSiswaSchema } from '../../../utils/validation/calon-siswa.schema'
import CustomIcon from '../../../components/CustomIcon.vue'
import { arrowRight } from '../../../utils/svg-var'
import CustomInput from '../../../components/form/CustomInput.vue'
import CustomTextArea from '../../../components/form/CustomTextArea.vue'
import CustomSelectBox from '../../../components/form/CustomSelectBox.vue'
import CustomDatepicker from '../../../components/form/CustomDatepicker.vue'
import CustomButton from '../../../components/CustomButton.vue'
import Swal from 'sweetalert2'
import { forEach, size } from 'lodash'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
const route = useRoute()
const router = useRouter()
const calonSiswaId = ref(null)
const calonSiswa = ref({})
const errorState = ref({
  nama: {
    isError: false,
    message: '',
  },
  jenis_kelamin: {
    isError: false,
    message: '',
  },
  tempat_lahir: {
    isError: false,
    message: '',
  },
  tanggal_lahir: {
    isError: false,
    message: '',
  },
  nama_ayah: {
    isError: false,
    message: '',
  },
  nama_ibu: {
    isError: false,
    message: '',
  },
  alamat: {
    isError: false,
    message: '',
  },
  no_telepon: {
    isError: false,
    message: '',
  },
})
onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
  calonSiswaId.value = route.params.id
  fetchCalonSiswa()
})
/**
 * fetch single calon siswa data on DB and get from store
 */
async function fetchCalonSiswa() {
  await store.dispatch('calonSiswa/getSingle', calonSiswaId.value)
  calonSiswa.value = store.getters['calonSiswa/getSingle']
}

/**
 * validate input when event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
  await calonSiswaSchema
    .validateAt(field, calonSiswa.value)
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
  forEach(errorState.value, (data) => {
    // ++ when each of input is valid
    if (data.isError == false) {
      validCount++
    }
  })
  if (validCount == size(errorState.value)) {
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
    text: 'Perubahan data akan disimpan.',
    icon: 'question',
    showCancelButton: true,
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, simpan !',
    confirmButtonColor: '#41c3a9',
  }).then(async (result) => {
    if (result.isConfirmed) {
      saveCalonSiswaData()
    }
  })
}

async function saveCalonSiswaData() {
  store.dispatch('calonSiswa/update', calonSiswa.value).then((response) => {
    Swal.fire({
      icon: 'success',
      text: 'data berhasil diubah.',
      showConfirmButton: false,
      timer: 1500,
    })
    router.back()
  })
}

function cancelAction() {
  Swal.fire({
    title: 'Anda yakin ?',
    text: `Batalkan perubahan data.`,
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, kembali !',
    confirmButtonColor: '#41c3a9',
  }).then(async (result) => {
    if (result.isConfirmed) {
      router.back()
    }
  })
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__head">
        <div class="content__path">
          <span>siswa</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span class="cursor-pointer" @click="cancelAction">daftar calon siswa</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>ubah</span>
        </div>
        <div class="content__title">
          <h3>ubah data calon siswa</h3>
        </div>
      </div>
      <div class="content__body">
        <div class="card edit-calon-siswa">
          <div class="card__head">
            <div class="card__title">formulir ubah data calon siswa</div>
          </div>
          <div class="card__body">
            <form>
              <div>
                <CustomInput label="nama" placeholder="Masukan nama calon siswa.." v-model:input-value="calonSiswa.nama"
                  :errorState="errorState.nama" @validate-input="validateInput('nama')" />
              </div>
              <div class="flex gap-2">
                <div class="w-1/3">
                  <CustomSelectBox label="jenis kelamin" placeholder="Pilih jenis kelamin"
                    :options="['laki-laki', 'perempuan']" v-model:input-value="calonSiswa.jenis_kelamin"
                    :errorState="errorState.jenis_kelamin" @validate-input="validateInput('jenis_kelamin')" />
                </div>
                <div class="w-1/3">
                  <CustomInput label="tempat lahir" placeholder="Masukan tempat lahir"
                    v-model:input-value="calonSiswa.tempat_lahir" :errorState="errorState.tempat_lahir"
                    @validate-input="validateInput('tempat_lahir')" />
                </div>
                <div class="w-1/3">
                  <CustomDatepicker label="tanggal lahir" v-model:input-value="calonSiswa.tanggal_lahir"
                    :error-state="errorState.tanggal_lahir" @validate-input="validateInput('tanggal_lahir')" />
                </div>
              </div>
              <div>
                <CustomTextArea label="alamat" placeholder="Masukan alamat.." v-model:input-value="calonSiswa.alamat"
                  :errorState="errorState.alamat" @validate-input="validateInput('alamat')" />
              </div>
              <div class="flex gap-2">
                <div class="w-1/2">
                  <CustomInput label="nama ayah" placeholder="Masukan nama ayah.."
                    v-model:input-value="calonSiswa.nama_ayah" :errorState="errorState.nama_ayah"
                    @validate-input="validateInput('nama_ayah')" />
                </div>
                <div class="w-1/2">
                  <CustomInput label="nama ibu" placeholder="Masukan nama ibu.."
                    v-model:input-value="calonSiswa.nama_ibu" :errorState="errorState.nama_ibu"
                    @validate-input="validateInput('nama_ibu')" />
                </div>
              </div>
              <div>
                <CustomInput label="no telepon" placeholder="Masukan no telepon.."
                  v-model:input-value="calonSiswa.no_telepon" :errorState="errorState.no_telepon"
                  @validate-input="validateInput('no_telepon')" />
              </div>
              <div class="flex justify-center mt-6">
                <div class="2xl:w-1/4 3xl:w-1/6">
                  <CustomButton title="batal" variant="link" color="secondary" block @button-action="cancelAction">
                  </CustomButton>
                </div>
                <div class="2xl:w-1/4 3xl:w-1/6">
                  <CustomButton title="simpan" color="verdigris" block @button-action="validateForm"></CustomButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
