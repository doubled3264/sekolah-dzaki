<script setup>
import { computed, onMounted, ref } from 'vue'
import Treeselect from 'vue3-treeselect'
import _ from 'lodash'

const props = defineProps({
   label: {
      type: String,
      required: true,
   },
})

const options = [
   {
      id: 'a',
      label: 'a',
   },
   {
      id: 'b',
      label: 'b',
   },
   {
      id: 'c',
      label: 'c',
   },
]

const randomNumber = ref(0)
// -------------- computed --------------
// -------------- cyclehook --------------
onMounted(() => {
   randomNumber.value = _.random(1111, 9999)
})
</script>

<template>
   <div class="custom-treeselect">
      <label :for="randomNumber" class="custom-treeselect__label">
         {{ label }}
      </label>
      <div class="custom-treeselect__wrapper">
         <Treeselect :options="options" />
      </div>
   </div>
</template>
