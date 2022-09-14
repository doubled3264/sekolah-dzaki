<script setup>
import { computed, onMounted, reactive, ref, toRef, watch } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import _ from 'lodash'

import CustomIcon from './CustomIcon.vue'
import { calendar } from '../utils/svg-var'

const props = defineProps({
   inputValue: {
      type: String,
   },
   label: {
      type: String,
      default: 'label',
   },
   placeholder: {
      type: String,
      default: 'please input..',
   },
})
const emit = defineEmits(['update:inputValue'])
const randomNumber = ref(0)
const modelConfig = {
   type: 'string',
   mask: 'YYYY-MM-DD',
}
// -------------- watch --------------
watch(
   () => props.inputValue,
   (value) => {
      emit('update:inputValue', value)
   }
)
// -------------- cyclehook --------------
onMounted(() => {
   randomNumber.value = _.random(1111, 9999)
})
</script>

<template>
   <div class="custom-datepicker">
      <label :for="randomNumber" class="custom-datepicker__label">{{
         label
      }}</label>
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
