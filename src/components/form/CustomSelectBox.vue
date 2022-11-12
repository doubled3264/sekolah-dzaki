<script setup>
import { onMounted, ref, toRef, watch } from 'vue'
import Multiselect from 'vue-multiselect'
const props = defineProps({
   inputValue:{type: String, default: ''},
   label: String,
   placeholder: { type: String, default: '' },
   options: { type: Array, default: [] },
   errorState: {
      type: Object,
      default: {
         isError: false,
         message: '',
      },
   },
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
const selectedValue = toRef(props, 'inputValue')
const isTouched = ref(false)
function validateInput() {
   isTouched.value = true
   console.log(selectedValue.value)
   emit('update:inputValue', selectedValue.value)
   emit('validateInput')
}
onMounted(()=>{
    console.log(selectedValue.value)
    console.log(props.inputValue)
  })
</script>

<template>
   <div
      :class="[
         ' custom-selectbox',
         { 'custom-selectbox--error': errorState.isError && isTouched },
      ]"
   >
      <label>{{ label }}</label>
      <Multiselect
         v-model="selectedValue"
         :options="options"
         :placeholder="placeholder"
         @close="validateInput"
      />
      <p
         class="custom-selectbox__helper"
         v-show="errorState.isError && isTouched"
      >
         {{ errorState.message }}
      </p>
   </div>
</template>
