<script setup>
import { ref } from 'vue'
import { random } from 'lodash'
defineProps({
   inputValue: {
      type: String,
      default: '',
      required: true,
   },
   label: String,
   type: String,
   placeholder: String,
   errorState: {
      type: Object,
      default: {
         isError: false,
         message: '',
      },
   },
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
const randomNumberForLabel = random(1111, 9999)
const isTouched = ref(false)

function validateInput(event) {
   isTouched.value = true
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}
</script>
<template>
   <div
      :class="[
         'custom-input',
         { 'custom-input--error': errorState.isError && isTouched },
      ]"
   >
      <label :for="randomNumberForLabel">{{ label }}</label>
      <input
         :id="randomNumberForLabel"
         type="text"
         :placeholder="placeholder"
         @input="validateInput"
         :value="inputValue"
      />
      <p class="custom-input__helper" v-show="errorState.isError && isTouched">
         {{ errorState.message }}
      </p>
   </div>
</template>
