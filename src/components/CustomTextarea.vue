<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import _ from 'lodash'

const props = defineProps({
   inputValue: { type: String, required: true },
   label: { type: String },
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
/** @type {Object}  */
const textarea = ref(null)
/** @type {number?}  */
let textareaInitHeight = {
   value: '',
   edited: false,
}
// -------------- function --------------
function resize() {
   if (!textareaInitHeight.edited) {
      textareaInitHeight.value = textarea.value.scrollHeight
      textareaInitHeight.edited = true
      console.log(textareaInitHeight.value)
   }
   if (textarea.value.scrollHeight > textareaInitHeight.value) {
      textarea.value.style.height = textarea.value.scrollHeight + 'px'
   }
   if (!textarea.value.value) {
      console.log(textareaInitHeight.value)
      textarea.value.style.height = textareaInitHeight.value + 'px'
   }
}

function validateInput(event) {
   isTouched.value = true
   emit('update:inputValue', event.target.value)
   emit('validateInput')
   resize()
}

// -------------- cyclehook --------------
onMounted(() => {
   randomNumber.value = _.random(1111, 9999)
})
</script>

<template>
   <div class="custom-textarea">
      <label
         :for="randomNumber"
         :class="[
            'custom-textarea__label',
            {
               'custom-textarea__label--error': errorState.isError && isTouched,
            },
         ]"
         >{{ label }}</label
      >
      <div
         :class="[
            'custom-textarea__wrapper',
            {
               'custom-textarea__wrapper--error':
                  errorState.isError && isTouched,
            },
         ]"
      >
         <textarea
            :id="randomNumber"
            ref="textarea"
            :value="inputValue"
            @input="validateInput"
         />
      </div>
      <p
         class="custom-textarea__helper"
         v-show="errorState.isError && isTouched"
      >
         {{ errorState.message }}
      </p>
   </div>
</template>
