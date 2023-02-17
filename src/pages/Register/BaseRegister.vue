<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { omit } from '../../utils/object-helper'
import { swalDialog } from '../../utils/sweetalert-object'
import { registerSchema } from '../../utils/validation/register.schema'
import Swal from 'sweetalert2'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomButton from '../../components/CustomButton.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const admin = ref({
   email: '',
   password: '',
   confirmPassword: '',
   nama: '',
   no_telepon: '',
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
   confirmPassword: {
      isError: true,
      message: '',
   },
   nama: {
      isError: true,
      message: '',
   },
   no_telepon: {
      isError: true,
      message: '',
   },
})

onMounted(() => {
   /* set page title */
   document.title = 'Pendaftaran Admin'
   invitationCheck()
})

async function invitationCheck() {
   await store
      .dispatch('invitation/invitationCheck', {
         invitationCode: route.params.invitationCode,
      })
      .then((response) => {
         if (response.status != 200) {
            Swal.fire(
               swalDialog.error(
                  'Silahkan hubungi admin terlebih dahulu untuk melakukan pendataran.'
               )
            )
         }
      })
      .catch(() => {
         Swal.fire(
            swalDialog.error(
               'Silahkan hubungi admin terlebih dahulu untuk melakukan pendataran.'
            )
         ).then(() => {
            router.push({ path: '/login' })
         })
      })
}
/**
 * validate input when event triggered
 * @param {String} article field
 */
async function validateInput(field) {
   await registerSchema
      .validateAt(field, admin.value)
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

   Swal.fire(swalDialog.confirm('Pendaftaran akan diproses.')).then(
      (result) => {
         if (result.isConfirmed) {
            processData()
         }
      }
   )
}

async function processData() {
   let credentials = omit(admin.value, 'confirmPassword')
   credentials.invitation_code = route.params.invitationCode
   await store
      .dispatch('auth/register', credentials)
      .then(() => {
         Swal.fire(swalDialog.success('Pendaftaran berhasil.'))
         router.push({
            path: '/login',
         })
      })
      .catch(() => {
         Swal.fire(swalDialog.error('Terjadi kesalahan.'))
      })
}
</script>
<template>
   <div class="register__wrapper">
      <div class="card">
         <div class="card__head">
            <div class="card__title">
               <h3>pendaftaran admin</h3>
            </div>
         </div>
         <div class="card__body">
            <CustomInput
               label="email"
               placeholder="Masukan email.."
               v-model:input-value="admin.email"
               :error-state="errorState.email"
               @validate-input="validateInput('email')"
            />
            <CustomInput
               label="password"
               placeholder="Masukan password.."
               v-model:input-value="admin.password"
               :error-state="errorState.password"
               @validate-input="validateInput('password')"
               :use-for-password="true"
            />
            <CustomInput
               label="confirm password"
               placeholder="Masukan password.."
               v-model:input-value="admin.confirmPassword"
               :error-state="errorState.confirmPassword"
               @validate-input="validateInput('confirmPassword')"
               :use-for-password="true"
            />
            <CustomInput
               label="nama"
               placeholder="Masukan nama.."
               v-model:input-value="admin.nama"
               :error-state="errorState.nama"
               @validate-input="validateInput('nama')"
            />
            <CustomInput
               label="no telepon"
               placeholder="Masukan no telepon.."
               v-model:input-value="admin.no_telepon"
               :error-state="errorState.no_telepon"
               @validate-input="validateInput('no_telepon')"
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
