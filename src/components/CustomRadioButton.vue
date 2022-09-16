<script setup>
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'

const props = defineProps({
   inputValue: { type: String, required: true },
   label: { type: String, required: true },
   item: { type: Array, required: true },
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
const randomNumber = ref({
   labelItem1: '',
   labelItem2: '',
   group: '',
})
// -------------- function --------------
function inputEvent(event) {
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}
// -------------- computed --------------
const getRadioLabel = computed(() => {
   return (index) => {
      return props.item[index]
   }
})
// -------------- cyclehook --------------
onMounted(() => {
   randomNumber.value.labelItem1 = _.random(1111, 9999)
   randomNumber.value.labelItem2 = _.random(1111, 9999)
   randomNumber.value.group = _.random(1111, 9999)
})
</script>

<template>
   <div class="custom-radio-button">
      <label :for="randomNumber" class="custom-radio-button__label">
         {{ label }}
      </label>
      <div class="custom-radio-button__wrapper">
         <div class="custom-radio-button__item">
            <input
               :id="randomNumber.labelItem1"
               type="radio"
               :name="randomNumber.group"
               value="1"
               @change="inputEvent"
               checked
            />
            <label :for="randomNumber.labelItem1">{{ getRadioLabel(0) }}</label>
         </div>
         <div class="custom-radio-button__item">
            <input
               :id="randomNumber.labelItem2"
               type="radio"
               :name="randomNumber.group"
               @change="inputEvent"
               value="0"
            />
            <label :for="randomNumber.labelItem2">{{ getRadioLabel(1) }}</label>
         </div>
      </div>
   </div>
</template>
