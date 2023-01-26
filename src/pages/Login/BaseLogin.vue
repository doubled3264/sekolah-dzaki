<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { loginScheme } from '../../utils/validation/login.scheme'
import { swalDialog } from '../../utils/sweetalert-object'
import Swal from 'sweetalert2'
import CustomInput from '@components/form/CustomInput.vue'
import CustomButton from '@components/CustomButton.vue'

const store = useStore()
const router = useRouter()
const user = ref({
   email: '',
   password: '',
})
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

onMounted(() => {
   document.title = 'Silahkan login Terlebih Dahulu.'
})
/**
 * validate input when event triggered
 * @param {String} article field
 */
async function validateInput(field) {
   await loginScheme
      .validateAt(field, user.value)
      .then(() => {
         errorState.value[field].isError = false
      })
      .catch((err) => {
         errorState.value[field].isError = true
         errorState.value[field].message = err.message
      })
}
/**
 * validate all form before send article to backend
 */
async function validateForm() {
   /* validate input component */
   for (const item in errorState.value) {
      if (errorState.value[item].isError) {
         Swal.fire(swalDialog.error('terdapat form yang belum terisi.'))
         return ''
      }
   }
   signInAction()
}

async function signInAction() {
   await store
      .dispatch('auth/signIn', { ...user.value })
      .then(() => {
         router.push({ path: '/artikel' })
      })
      .catch(() => {
         console.log('gagal')
      })
}
</script>
<template>
   <div class="login__wrapper">
      <div class="card">
         <div class="card__head">
            <div class="card__title">
               <h3>silahkan login terlebih dahulu</h3>
            </div>
         </div>
         <div class="card__body">
            <CustomInput
               label="email"
               placeholder="Masukan email.."
               v-model:input-value="user.email"
               :error-state="errorState.email"
               @validate-input="validateInput('email')"
            />
            <CustomInput
               label="password"
               placeholder="Masukan password.."
               v-model:input-value="user.password"
               :error-state="errorState.password"
               @validate-input="validateInput('password')"
               :use-for-password="true"
            />
            <div class="flex justify-center my-8">
               <div class="2xl:w-2/4 3xl:w-2/6">
                  <CustomButton
                     title="simpan"
                     color="verdigris"
                     block
                     @button-action="validateForm"
                  ></CustomButton>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
