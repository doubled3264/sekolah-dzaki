<script setup>
import { ref, toRef, onMounted, reactive, computed } from 'vue'
import { useField, useFieldError } from 'vee-validate'
import _ from 'lodash'

const props = defineProps({
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
   message: '',
})
const { handleChange } = useField(toRef(props, 'name'))

errorState.message = useFieldError(toRef(props, 'name'))

const getErrorClass = computed(() => {
   return errorState.message ? true : false
})

onMounted(() => {
   randomNumber.value = _.random(1111, 9999)
})
</script>
<template>
   <div class="custom-input">
      <label
         :for="randomNumber"
         :class="[
            'custom-input__label',
            { 'custom-input__label--error': getErrorClass },
         ]"
         >{{ label }}</label
      >
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
         {{ errorState.message }}
      </p>
   </div>
</template>
