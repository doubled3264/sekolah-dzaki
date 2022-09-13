<script setup>
import { ref, toRef, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { cross } from '../../utils/svg-var'
import CustomInput from '../../components/CustomInput.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomIcon from '../../components/CustomIcon.vue'

const store = useStore()
const emits = defineEmits(['event'])
const isErrorLogin = ref(false)
const user = ref({
  email: '',
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

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(3),
})
useForm({
  validationSchema: schema,
})

async function submitAction() {
  store.dispatch('auth/signIn', user.value)
}
</script>

<template>
  <div class="row flex-col items-center">
    <div class="w-8/12">
      <div :class="['login__content-notif', getErrorNotifStatus]">
        <CustomIcon :svgIcon="cross" width="20" @click="closeNotif" />
        <p>Gagal. Periksa kembali email dan password anda.</p>
      </div>
      <h2>Silahkan login terlebih dahulu</h2>
      <form>
        <div class="row">
          <div class="input-field w-full mb-4">
            <CustomInput
              type="email"
              label="email"
              name="email"
              v-model:input-value="user.email"
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
            @submit-data="submitAction"
          />
          <p>Gagal masuk karena lupa passowrd ? <span>Klik di sini</span></p>
        </div>
      </form>
    </div>
  </div>
</template>
