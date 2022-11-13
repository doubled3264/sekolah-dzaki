<script setup>
import { onMounted, ref, toRef, watch } from 'vue'
import Multiselect from 'vue-multiselect'
const props = defineProps({
  inputValue: { type: String, default: '' },
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
const isTouched = ref(false)
function validateInput() {
  isTouched.value = true
  emit('update:inputValue', props.inputValue)
  emit('validateInput')
}
</script>

<template>
  <div :class="[
     ' custom-selectbox',
     { 'custom-selectbox--error': errorState.isError && isTouched },
  ]">
    <label>{{ label }}</label>
    <Multiselect v-model="inputValue" :options="options" :placeholder="placeholder" @close="validateInput" />
    <p class="custom-selectbox__helper" v-show="errorState.isError && isTouched">
      {{ errorState.message }}
    </p>
  </div>
</template>
