<script setup>
import { ref, toRef, computed, reactive } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { cross } from '../../utils/svg-var'
import CustomInput from '../../components/CustomInput.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomIcon from '../../components/CustomIcon.vue'

const emits = defineEmits(['event'])
const isErrorLogin = ref(true)
const user = ref({
  username: '',
  password: '',
})

function closeNotif(payload) {
  isErrorLogin.value = !isErrorLogin.value
}
const getErrorNotifStatus = computed(() => {
  return isErrorLogin.value
    ? 'login__content-notif--show'
    : 'login__content-notif--hide'
})

/* const simpleSchema = { */
/*   username(value) { */
/*     if (value && value.trim()) { */
/*       return true */
/*     } */

/*     return 'This is required' */
/*   }, */
/*   password(value) { */
/*     if (value && value.trim()) { */
/*       return true */
/*     } */

/*     return 'This is required' */
/*   }, */
/* } */
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})
useForm({
  validationSchema: schema,
})

/* validation */
</script>

<template>
  <div class="row flex-col items-center">
    <div class="w-8/12">
      <div :class="['login__content-notif', getErrorNotifStatus]">
        <CustomIcon :svgIcon="cross" width="20" @click="closeNotif" />
        <p>Gagal. Periksa kembali email dan password anda.</p>
      </div>
      <h2>silahkan masuk</h2>
      <form>
        <div class="row">
          <div class="input-field w-full mb-4">
            <CustomInput
              type="email"
              label="email"
              name="email"
              v-model:input-value="user.username"
            />
          </div>
        </div>
        <div class="row">
          <div class="input-field w-full mb-4">
            <CustomInput
              type="password"
              label="password"
              name="password"
              v-model:input-value="user.password"
            />
          </div>
        </div>
        <div class="form-nav">
          <CustomButton
            title="Masuk"
            variant="solid"
            color="primary"
            block
            @submit-data="closeNotif"
          />
          <p>Gagal masuk karena lupa passowrd ? <span>Klik di sini</span></p>
          <p class="text-red-500">{{ user.username }} {{ user.password }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
