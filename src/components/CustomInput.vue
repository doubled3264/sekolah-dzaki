<script setup>
import { ref, toRef, onMounted, reactive, computed } from 'vue'
import { useField, useFieldError, useIsFieldValid } from 'vee-validate'
import _ from 'lodash'

const props = defineProps({
  /* isFalse: { */
  /*   type: Boolean, */
  /* }, */
  /* ifFilled: { */
  /*   type: Boolean, */
  /* }, */
  inputValue: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Please input..',
  },
  helperText: {
    type: String,
  },
  name: {
    type: String,
  },
})

defineEmits(['update:inputValue'])

const randomNumber = ref(0)
const errorState = reactive({
  isError: null,
  errorMessage: '',
})
const { handleChange } = useField(toRef(props, 'name'))

errorState.isError = useIsFieldValid(toRef(props, 'name'))
errorState.errorMessage = useFieldError(toRef(props, 'name'))

const getErrorClass = computed(() => {
  return errorState.errorMessage ? true : false
})

console.log(errorState.errorMessage)

onMounted(() => {
  randomNumber.value = _.random(1111, 9999)
})
</script>
<template>
  <div class="custom-input">
    <label :for="randomNumber" class="custom-input__label">{{ label }}</label>
    <div
      :class="[
        'custom-input__wrapper',
        { 'custom-input__wrapper--error': getErrorClass },
      ]"
    >
      <div class="custom-input__start-icon"></div>
      <input
        :id="randomNumber"
        :type="type"
        :placeholder="placeholder"
        @change="handleChange"
        @blur="handleChange"
        @input="$emit('update:inputValue', $event.target.value)"
        :value="inputValue"
      />
      <div class="custom-input__end-icon"></div>
    </div>
    <p class="custom-input__helper">
      {{ errorState.errorMessage }}
    </p>
  </div>
</template>
