<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import _ from 'lodash'

const props = defineProps({
   inputValue: { type: String, required: true },
   label: { type: String, required: true },
   items: { type: Array, required: true },
})
/** @type {Array} radioItems  */
const state = reactive({
   radioItems: [],
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
// -------------- function --------------
function inputEvent(event) {
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}
// -------------- cyclehook --------------
onMounted(() => {
   const groupId = _.random(1111, 9999)
   _.forEach(props.items, (item) => {
      state.radioItems.push({
         radioId: _.random(1111, 9999),
         radioLabel: item,
         groupId: groupId,
      })
   })
})
</script>

<template>
   <div class="custom-radio-button">
      <label class="custom-radio-button__label">
         {{ label }}
      </label>
      <div class="custom-radio-button__wrapper">
         <div
            v-for="(item, index) in state.radioItems"
            class="custom-radio-button__item"
         >
            <input
               type="radio"
               :id="item.radioId"
               :name="item.groupId"
               :value="index"
               @change="inputEvent"
               :checked="index == 0"
            />
            <label :for="item.radioId">{{ item.radioLabel }}</label>
         </div>
      </div>
   </div>
</template>
