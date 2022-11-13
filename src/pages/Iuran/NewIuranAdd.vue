<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { iuranScheme } from '../../utils/validation/iuran.schema'
import { arrowRight } from '../../utils/svg-var'
import CustomIcon from '../../components/CustomIcon.vue'
import NewCustomInput from '../../components/NewCustomInput.vue'
import calonSiswa from '../../store/module/calon-siswa'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
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
    rincian: {
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

const getIuranSelected = computed(() => {
  return iuran.value.interval == 'sekali' ? true : false
})
/**
 * validate input when some event triggered
 * @param {string} siswa object key
 */
async function validateInput(formName, fieldName) {
  if (formName == 'iuran data') {
    await iuranScheme
      .validateAt(fieldName, iuran.value.data)
      .then(() => {
        errorState.value.data[fieldName].isError = false
      })
      .catch((err) => {
        errorState.value.data[fieldName].isError = true
        errorState.value.data[fieldName].message = err.message
      })
  } else if (formName == 'rincian iuran') {
  }
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
                    :error-state="errorState.data.nama" v-model:input-value="iuran.data.nama" @validate-input="
                       validateInput('iuran data', 'nama')
                    " />
                </div>
                <div>
                  <CustomSelectBox label="interval iuran" placeholder="Pilih interval iuran.."
                    :options="intervalOptions" v-model:input-value="iuran.data.interval"
                    :error-state="errorState.data.interval" @validate-input="
                       validateInput('iuran data', 'interval')
                    " />
                </div>
                <div v-show="getIuranSelected">
                  <CustomSelectBox label="keterangan interval" placeholder="Pilih interval iuran.."
                    :options="intervalDetailOptions" />
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
                  <CustomInput label="rincian" placeholder="Masukan rincian.."
                    v-model:input-value="iuran.detail.rincian" />
                  <CustomInput label="nominal" placeholder="Masukan nominal.."
                    v-model:input-value="iuran.detail.nominal" />
                </div>
                <div class="mt-1">
                  <CustomButton title=" tambahkan" color="verdigris" block size="sm" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
