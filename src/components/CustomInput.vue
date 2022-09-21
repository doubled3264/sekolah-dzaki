<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import _ from 'lodash'

const props = defineProps({
  inputValue: { type: String, required: true },
  type: { type: String, default: 'text' },
  label: { type: String, required: true },
  placeholder: { type: String, default: 'please input..' },
  helperText: { type: String },
  errorState: {
    type: Object,
    default: {
      isError: false,
      message: '',
    },
  },
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
const randomNumber = ref(0)
const isTouched = ref(false)
// -------------- function --------------
function validateInput(event) {
  isTouched.value = true
  emit('update:inputValue', event.target.value)
  emit('validateInput')
}

// -------------- cyclehook --------------

onMounted(() => {
  randomNumber.value = _.random(1111, 9999)
})
</script>
<template>
  <div class="custom-input">
    <label :for="randomNumber" :class="[
       'custom-input__label',
       { 'custom-input__label--error': errorState.isError && isTouched },
    ]">{{ label }}</label>
    <div :class="[
       'custom-input__wrapper',
       { 'custom-input__wrapper--error': errorState.isError && isTouched },
    ]">
      <div class="custom-input__start-icon"></div>
      <input :id="randomNumber" :type="type" :placeholder="placeholder" @input="validateInput" :value="inputValue" />
      <div class="custom-input__end-icon"></div>
    </div>
    <p class="custom-input__helper" v-show="errorState.isError && isTouched">
      {{ errorState.message }}
    </p>
  </div>
</template>
