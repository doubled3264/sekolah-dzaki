<script setup>
import { ref } from 'vue'

defineProps({
   item: { type: Array, default: ['item'] },
   inputValue: { type: Number, required: true },
})
const emit = defineEmits(['update:inputValue', 'changeSwithValue'])

const activeIndex = ref(0)

function toggleActiveIndex(event) {
   if (!event.target.checked) {
      activeIndex.value = 0
   } else {
      activeIndex.value = 1
   }
   emit('update:inputValue', activeIndex.value)
}

function checkedInput(event) {}
</script>

<template>
   <div class="custom-double-switch">
      <p :class="[{ 'custom-double-switch--active': activeIndex == 0 }]">
         {{ item[0] }}
      </p>
      <label class="custom-double-switch__wrapper">
         <input
            type="checkbox"
            :checked="inputValue == 1"
            @click="toggleActiveIndex"
         />
         <span class="custom-double-switch__slider"></span>
      </label>
      <p :class="[{ 'custom-double-switch--active': activeIndex == 1 }]">
         {{ item[1] }}
      </p>
   </div>
</template>
