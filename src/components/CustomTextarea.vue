<script setup>
import { onMounted, ref } from 'vue'
import _ from 'lodash'

const props = defineProps({
   inputValue: { type: String, required: true },
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
const textarea = ref(null)
let textareaInitHeight = ''
// -------------- function --------------
function resize() {
   if (textarea.value.scrollHeight > textareaInitHeight) {
      textarea.value.style.height = textarea.value.scrollHeight + 'px'
   }
   if (!textarea.value.value) {
      textarea.value.style.height = textareaInitHeight + 'px'
   }
}

function validateInput() {
   isTouched.value = true
   emit('validateInput')
}

function inputEvent(event) {
   resize()
   emit('update:inputValue', event.target.value)
}

// -------------- cyclehook --------------
onMounted(() => {
   randomNumber.value = _.random(1111, 9999)
   textareaInitHeight = textarea.value.clientHeight
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
            @input="inputEvent"
            @blur="validateInput"
         />
      </div>
      <p class="custom-textarea__helper" v-show="errorState.isError">
         {{ errorState.message }}
      </p>
   </div>
</template>
