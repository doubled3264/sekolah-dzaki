<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import _ from 'lodash'

const props = defineProps({
   inputValue: { type: String, required: true },
   label: { type: String, required: true },
   items: { type: Array, required: true },
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
/** @type {Array} radioItems  */
const radioItems = ref([])
/** @type {number} radioActive  */
const radioActive = ref()

onMounted(() => {
   /* create random id */
   const groupId = _.random(1111, 9999)
   /* set radio id and label */
   _.forEach(props.items, (item) => {
      radioItems.value.push({
         radioId: _.random(1111, 9999),
         radioLabel: item,
         groupId: groupId,
      })
   })
})
function setRadioLabelActive(value) {
   radioActive.value = value
}
/**
 * send value to parent component
 * @param {Object}
 */
function inputEvent(event) {
   emit('update:inputValue', event.target.value)
   sendToValidate()
}
/**
 * send and validate value on parent
 * @param {}
 */
function sendToValidate() {
   emit('validateInput')
}
// -------------- cyclehook --------------
</script>

<template>
   <div class="custom-radio-button">
      <label class="custom-radio-button__label">
         {{ label }}
      </label>
      <div class="custom-radio-button__wrapper">
         <div
            v-for="(item, index) in radioItems"
            :class="[
               'custom-radio-button__item',
               { '  custom-radio-button__item--active': radioActive == index },
            ]"
            @click="setRadioLabelActive(index)"
         >
            <input
               type="radio"
               :id="item.radioId"
               :name="item.groupId"
               :value="index"
               @click="inputEvent"
            />
            <label :for="item.radioId">{{ item.radioLabel }}</label>
         </div>
      </div>
   </div>
</template>
