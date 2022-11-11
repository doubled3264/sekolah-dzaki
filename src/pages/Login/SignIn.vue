<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { loginScheme } from '../../utils/validation/login.scheme'
import CustomInput from '../../components/CustomInput.vue'
import CustomButton from '../../components/CustomButton.vue'
import _ from 'lodash'

const store = useStore()
const router = useRouter()
/** @type {Object} pegawai*/
const pegawai = ref({
  email: '',
  password: '',
})
/** @type {Object} error state for each input*/
const errorState = ref({
  email: {
    isError: true,
    message: '',
  },
  password: {
    isError: true,
    message: '',
  },
})
/** @type {Array?} pegawai object key*/
let pegawaiKey = null

onMounted(() => {
  /* generate pegawai object key */
  pegawaiKey = _.keys(pegawai.value)
})
/**
 * clear all input form
 */
/* function clearForm() { */
/*    _.forEach(pegawaiKey, (key) => { */
/*       pegawai.value[key] = '' */
/*       errorState.value[key].isError = true */
/*    }) */
/* } */

/**
 * validate input when event triggred
 * @param {string} pegawai object key
 */
async function validateInput(field) {
  await loginScheme
    .validateAt(field, pegawai.value)
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
function validateBeforeSubmit() {
  let validCount = 0
  _.forEach(pegawaiKey, (key) => {
    // ++ when each of input is valid
    if (!errorState.value[key].isError) {
      validCount++
    }
  })

  if (validCount == pegawaiKey.length) {
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
 * process data for login action
 * @success {promise} go to siswa page
 */
async function submitAction() {
  await store
    .dispatch('auth/signIn', pegawai.value)
    .then((response) => {
      router.push({ name: 'daftar iuran' })
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        text: 'login gagal',
        confirmButtonText: 'tutup',
      })
    })
}

/**
 * get width of window size from store
 */
const getWindowWidth = computed(() => {
  return store.getters['windowProp/getWidth']
})
</script>

<template>
  <div class="row flex-col items-center px-8">
    <h2>Silahkan login terlebih dahulu</h2>
    <form>
      <div class="row">
        <div class="input-field w-full mb-4">
          <CustomInput type="email" label="email" :error-state="errorState.email" v-model:input-value="pegawai.email"
            @validate-input="validateInput('email')" />
        </div>
      </div>
      <div class="row">
        <div class="input-field w-full mb-4">
          <CustomInput type="password" label="password" :error-state="errorState.password"
            v-model:input-value="pegawai.password" @validate-input="validateInput('password')" />
        </div>
      </div>
      <div class="form-nav">
        <CustomButton title="Masuk" variant="solid" color="primary" size="sm" block
          @button-action="validateBeforeSubmit" />
        <p>Gagal masuk karena lupa passowrd ? <span>Klik di sini</span></p>
        <p>{{ getWindowWidth }}</p>
      </div>
    </form>
  </div>
</template>
