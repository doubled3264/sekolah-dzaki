<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { forEach, remove, size } from 'lodash'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { iuranScheme } from '../../utils/validation/iuran.schema'
import { arrowRight, trash } from '../../utils/svg-var'
import Swal from 'sweetalert2'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomSelectBox from '../../components/form/CustomSelectBox.vue'
import CustomButton from '../../components/CustomButton.vue'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
const router = useRouter()
/** @type {Object} iuran */
const iuran = ref({
  data: {
    nama: '',
    interval: '',
    interval_detail: '',
    inklusi: 0,
    keterangan: '',
  },
  detail: {
    rincian: '',
    nominal: '',
    list: [],
  },
})
/** @type {Object} error state for each input */
const errorState = ref({
  data: {
    nama: {
      isError: true,
      message: '',
    },
    interval: {
      isError: true,
      message: '',
    },
    interval_detail: {
      isError: true,
      message: '',
    },
  },
  detail: {
    nama: {
      isError: true,
      message: '',
    },
    nominal: {
      isError: true,
      message: '',
    },
  },
})
const intervalOptions = ['tahunan', 'bulanan', 'sekali']
const intervalDetailOptions = ['hanya sekali', 'kelas 6']
onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
})

function clearRincianForm() {
  iuran.value.detail.nama = ''
  iuran.value.detail.nominal = ''
}

const getIuranSelected = computed(() => {
  return iuran.value.data.interval == 'sekali' ? true : false
})

function rincianListPush() {
  iuran.value.detail.list.push({
    nama: iuran.value.detail.nama,
    nominal: iuran.value.detail.nominal,
  })
  clearRincianForm()
}

function rincianListRemoveItem(indexToRemove) {
  Swal.fire({
    title: 'Anda yakin ?',
    text: `Hapus data "${iuran.value.detail.list[indexToRemove].nama}".`,
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, hapus !',
    confirmButtonColor: '#41c3a9',
  }).then(async (result) => {
    if (result.isConfirmed) {
      remove(iuran.value.detail.list, (item, index) => {
        return index === indexToRemove
      })
    }
  })
}
/**
 * validate input when some event triggered
 * @param {string} siswa object key
 */
async function validateInput(formName, fieldName) {
  await iuranScheme
    .validateAt(`${formName}.${fieldName}`, iuran.value)
    .then((succ) => {
      errorState.value[formName][fieldName].isError = false
    })
    .catch((err) => {
      errorState.value[formName][fieldName].isError = true
      errorState.value[formName][fieldName].message = err.message
    })
}

async function validateDataForm() {
  await validateInput('data', 'interval_detail')
  let validCount = 0
  forEach(errorState.value.data, (data) => {
    // ++ when each of input is valid
    if (data.isError == false) {
      validCount++
    }
  })
  if (validCount != size(errorState.value.data)) {
    /* submitAction() */
    Swal.fire({
      icon: 'warning',
      text: 'terdapat form yang belum terisi',
      confirmButtonText: 'tutup',
    })
  } else {
    if (iuran.value.detail.list.length == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Harap isi rincian iuran minimal 1 data.',
        confirmButtonText: 'tutup',
      })
    } else {
      submitAction()
    }
  }
}

function validateDetailForm() {
  let validCount = 0
  forEach(errorState.value.detail, (data) => {
    // ++ when each of input is valid
    if (data.isError == false) {
      validCount++
    }
  })
  if (validCount != size(errorState.value.detail)) {
    /* submitAction() */
    Swal.fire({
      icon: 'warning',
      text: 'terdapat form yang belum terisi',
      confirmButtonText: 'tutup',
    })
  } else {
    rincianListPush()
  }
}

/**
 * process data for save action
 * @success {promise} show success dialog
 */
async function submitAction() {
  Swal.fire({
    title: 'Anda yakin ?',
    text: 'Data iuran akan disimpan.',
    icon: 'question',
    showCancelButton: true,
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, simpan !',
    confirmButtonColor: '#41c3a9',
  }).then(async (result) => {
    if (result.isConfirmed) {
      createIuranData()
    }
  })
}

async function createIuranData() {
  store
    .dispatch('iuran/create', {
      ...iuran.value.data,
      rincian: iuran.value.detail.list,
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: 'Iuran berhasil disimpan',
        showConfirmButton: false,
        timer: 1500,
      })
      router.back()
    })
}

function cancelAction() {
  Swal.fire({
    title: 'Anda yakin ?',
    text: 'Data yang sudah diisi akan hilang.',
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
          <span class="cursor-pointer" @click="cancelAction">iuran</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>tambah data iuran baru</span>
        </div>
        <div class="content__title">
          <h3>tambah data iuran baru</h3>
        </div>
      </div>
      <div class="content__body">
        <div class="flex gap-4">
          <div class="card iuran-add__form">
            <div class="card__head">
              <div class="card__title">formulir data iuran</div>
            </div>
            <div class="card__body">
              <form>
                <div>
                  <CustomInput type="text" label="nama" placeholder="Masukan nama iuran.."
                    v-model:input-value="iuran.data.nama" :error-state="errorState.data.nama"
                    @validate-input="validateInput('data', 'nama')" />
                </div>
                <div>
                  <CustomSelectBox label="interval iuran" placeholder="Pilih interval iuran.."
                    :options="intervalOptions" v-model:input-value="iuran.data.interval"
                    :error-state="errorState.data.interval" @validate-input="
                       validateInput('data', 'interval')
                    " />
                </div>
                <div v-show="getIuranSelected">
                  <CustomSelectBox label="keterangan interval" placeholder="Pilih interval iuran.."
                    :options="intervalDetailOptions" v-model:input-value="iuran.data.interval_detail"
                    :error-state="errorState.data.interval_detail" @validate-input="
                       validateInput('data', 'interval_detail')
                    " />
                </div>
                <div class="flex justify-center mt-6">
                  <div class="2xl:w-1/4 3xl:w-1/6">
                    <CustomButton title="batal" variant="link" color="secondary" block @button-action="cancelAction">
                    </CustomButton>
                  </div>
                  <div class="2xl:w-1/4 3xl:w-1/6">
                    <CustomButton title="simpan" color="verdigris" block @button-action="validateDataForm">
                    </CustomButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card iuran-add__rincian">
            <div class="card__head">
              <div class="card__title">formulir rincian iuran</div>
            </div>
            <div class="card__body">
              <form>
                <div class="flex gap-4">
                  <CustomInput label="rincian" placeholder="Masukan rincian.." v-model:input-value="iuran.detail.nama"
                    @validate-input="validateInput('detail', 'nama')" :error-state="errorState.detail.nama" />
                  <CustomInput label="nominal" placeholder="Masukan nominal.."
                    v-model:input-value="iuran.detail.nominal" @validate-input="
                       validateInput('detail', 'nominal')
                    " :error-state="errorState.detail.nominal" />
                </div>
                <div class="mt-1">
                  <CustomButton title=" tambahkan" color="verdigris" block size="sm"
                    @button-action="validateDetailForm()" />
                </div>
              </form>
              <ul class="iuran-add__rincian-list">
                <li class="iuran-add__rincian-item" v-for="(item, index) in iuran.detail.list" :key="index + 1">
                  <div class="iuran-add__rincian-info">
                    <p>{{ index + 1 }}. {{ item.nama }}</p>
                    <p>{{ item.nominal }}</p>
                  </div>
                  <div class="iuran-add__rincian-action" @click="rincianListRemoveItem(index)">
                    <CustomIcon :svg-icon="trash" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
