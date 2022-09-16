<script setup>
import { computed, onMounted, reactive, ref, toRef, watch } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import _ from 'lodash'

import CustomIcon from './CustomIcon.vue'
import { calendar } from '../utils/svg-var'

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
const modelConfig = {
   type: 'string',
   mask: 'YYYY-MM-DD',
}
// -------------- watch --------------
watch(
   () => props.inputValue,
   (value) => {
      emit('update:inputValue', value)
      emit('validateInput')
   }
)
</script>

<template>
   <div class="custom-datepicker">
      <label class="custom-datepicker__label">{{ label }}</label>
      <DatePicker
         v-model="inputValue"
         :model-config="modelConfig"
         locale="id"
         :masks="{ weekdays: 'WWW', input: 'D MMMM YYYY' }"
      >
         <template v-slot="{ inputValue, togglePopover }">
            <div class="custom-datepicker__wrapper">
               <div
                  class="custom-datepicker__toggle-button"
                  @click="togglePopover()"
               >
                  <CustomIcon
                     width="24"
                     height="24"
                     color="white"
                     strokeWidth="0.1"
                     :svgIcon="calendar"
                  />
               </div>
               <input :placeholder="placeholder" :value="inputValue" />
            </div>
         </template>
      </DatePicker>
   </div>
</template>
