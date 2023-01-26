<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { ulid } from 'ulid'
import { eye, eyeHide } from '../../utils/svg-vars'
import CustomIcon from '../CustomIcon.vue'
const props = defineProps({
  inputValue: {
    type: String,
    default: '',
    required: true,
  },
  label: String,
  placeholder: String,
  errorState: {
    type: Object,
    default: {
      isError: false,
      message: '',
    },
  },
  useForPassword: Boolean,
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
const randomNumberForLabel = ulid()
const isTouched = ref(false)
const inputType = ref('text')
const inputElement = ref('')
/* const positionPasswordIcon = ref({ */
/*   bottom: 0, */
/*   top: */
/* right: 0, */
/* }) */
const showPassword = ref(false)
const passwordIcon = ref(eyeHide)

onMounted(async () => {
  if (props.useForPassword) {
    await nextTick()
    inputType.value = 'password'
    /* setIconPosition() */
  }
})

/* function setIconPosition() { */
/*   const componentStyle = window.getComputedStyle(inputElement.value) */
/*   positionPasswordIcon.value.bottom = */
/*     componentStyle.getPropertyValue('padding-bottom') */
/* positionPasswordIcon.value.right = */
/*   componentStyle.getPropertyValue('padding-right') */
/* } */

function toggleShowPassword() {
  showPassword.value = !showPassword.value
  if (showPassword.value) {
    passwordIcon.value = eye
    inputType.value = 'text'
  } else {
    passwordIcon.value = eyeHide
    inputType.value = 'password'
  }
}

function validateInput(event) {
  isTouched.value = true
  emit('update:inputValue', event.target.value)
  emit('validateInput')
}
</script>
<template>
  <div :class="[
  'custom-input',
  { 'custom-input--error': errorState.isError && isTouched },
]">
    <label :for="randomNumberForLabel">{{ label }}</label>
    <input ref="inputElement" :id="randomNumberForLabel" :type="inputType" :placeholder="placeholder"
      @input="validateInput" :value="inputValue" />
    <p class="custom-input__helper" v-show="errorState.isError && isTouched">
      {{ errorState.message }}
    </p>
    <div v-if="useForPassword" class="show-hide-password" @click="toggleShowPassword">
      <CustomIcon :svg-icon="passwordIcon" />
    </div>
  </div>
</template>
