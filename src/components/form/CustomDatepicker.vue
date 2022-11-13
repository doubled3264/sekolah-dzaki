<script setup>
import { DatePicker } from 'v-calendar'
import { ref, toRef, watch } from 'vue'
import CustomIcon from '../CustomIcon.vue'
import { calendar } from '../../utils/svg-var'
const props = defineProps({
  inputValue: String,
  label: String,
  placeholder: { type: String, default: '' },
  errorState: {
    type: Object,
    default: {
      isError: false,
      message: '',
    },
  },
})
const emit = defineEmits(['update:inputValue', 'validateInput'])
const isFocus = ref(false)
const isTouched = ref(false)
const modelConfig = {
  type: 'string',
  mask: 'YYYY-MM-DD',
}
function inputFocus(event, popOverAction) {
  if (event.type == 'focusin') {
    isFocus.value = true
    popOverAction()
  } else {
    isFocus.value = false
    isTouched.value = true
    popOverAction()
    validateInput()
  }
}

function validateInput() {
  emit('update:inputValue', props.inputValue)
  emit('validateInput')
}
</script>
<template>
  <div :class="[
     ' custom-calendar',
     { 'custom-calendar--error': errorState.isError && isTouched },
  ]">
    <label>{{ label }}</label>
    <DatePicker v-model="inputValue" :model-config="modelConfig" locale="id" :masks="{ weekdays: 'WWW' }"
      @dayclick="validateInput">
      <template v-slot="{ inputValue, inputEvents, showPopover, hidePopover }">
        <div :class="[
           ' custom-calendar__inner',
           { 'custom-calendar__inner--active': isFocus },
           {
              'custom-calendar__inner--active-error':
                 isFocus && errorState.isError && isTouched,
           },
           {
              'custom-calendar__inner--error':
                 errorState.isError && isTouched,
           },
        ]">
          <div class="custom-calendar__icon">
            <CustomIcon :svg-icon="calendar" />
          </div>
          <input :value="inputValue" @focusin="inputFocus($event, showPopover)"
            @focusout="inputFocus($event, hidePopover)" @keyup.enter="inputFocus($event, hidePopover)"
            v-on="inputEvents" />
        </div>
      </template>
    </DatePicker>
    <p class="custom-selectbox__helper" v-show="errorState.isError && isTouched">
      {{ errorState.message }}
    </p>
  </div>
</template>
