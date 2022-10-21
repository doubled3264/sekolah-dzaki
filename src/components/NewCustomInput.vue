<script setup>
import _ from 'lodash'
defineProps({
  inputValue: {
    type: String,
    required: true,
  },
  label: String,
  type: String,
  placeholder: String,
  errorState: {
    type: Object,
    default: {
      isError: false,
      message: 'maman racing',
    },
  },
})
const emit = defineEmits(['update:inputValue'])
const randomNumberForLabel = _.random(1111, 9999)
</script>
<template>
  <div class="custom-input">
    <label :for="randomNumberForLabel">{{ label }}</label>
    <input :id="randomNumberForLabel" type="text" :placeholder="placeholder" />
    <p class="custom-input__helper">{{ errorState.message }}</p>
  </div>
</template>
