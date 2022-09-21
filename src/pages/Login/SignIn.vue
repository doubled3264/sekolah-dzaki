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
const pegawai = ref({
  email: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
  password: {
    value: '',
    isValid: false,
    errorMessage: '',
  },
})
let pegawaiKey = null
// -------------- function --------------
function clearForm() {
  _.forEach(pegawaiKey, (key) => {
    pegawai.value[key].value = ''
    pegawai.value[key].isValid = false
  })
}
async function validateInput(field) {
  await loginScheme
    .validateAt(field + '.value', pegawai.value)
    .then((result) => {
      pegawai.value[field].isValid = true
    })
    .catch((err) => {
      pegawai.value[field].errorMessage = err.message
      pegawai.value[field].isValid = false
    })
}
function validateBeforeSubmit() {
  let validCount = 0
  _.forEach(pegawaiKey, (key) => {
    if (pegawai.value[key].isValid) {
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
async function submitAction() {
  await store.dispatch('auth/signIn', {
    email: pegawai.value.email.value,
    password: pegawai.value.password.value,
  })
    .then((response) => {
      router.push({ name: 'siswa' })
    })
}
// -------------- computed --------------
const getWindowWidth = computed(() => {
  return store.getters['windowProp/getWidth']
})
// -------------- cyclehook --------------
onMounted(() => {
  pegawaiKey = _.keys(pegawai.value)
})
</script>

<template>
  <div class="row flex-col items-center px-8">
    <h2>Silahkan login terlebih dahulu</h2>
    <form>
      <div class="row">
        <div class="input-field w-full mb-4">
          <CustomInput type="email" label="email" :error-state="{
             isError: !pegawai.email.isValid,
             message: pegawai.email.errorMessage,
          }" v-model:input-value="pegawai.email.value" @validate-input="validateInput('email')" />
        </div>
      </div>
      <div class="row">
        <div class="input-field w-full mb-4">
          <CustomInput type="password" label="password" :error-state="{
             isError: !pegawai.password.value,
             message: pegawai.password.errorMessage,
          }" v-model:input-value="pegawai.password.value" @validate-input="validateInput('password')" />
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
