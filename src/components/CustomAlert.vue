<script setup>
import { computed } from 'vue'
import swal from 'sweetalert2'
import { success, warning, error } from './../utils/svg-vars'
import CustomIcon from './CustomIcon.vue'
import CustomButton from './CustomButton.vue'

const props = defineProps({
   status: { type: String, required: true },
   message: { type: String, required: true },
})

const getIcon = computed(() => {
   if (props.status == 'success') {
      return success
   } else if (props.status == 'warning') {
      return warning
   } else if (props.status == 'error') {
      return error
   }
})

function alertConfirm() {
   alert('maman')
}
</script>

<template>
   <div id="custom-alert">
      <CustomIcon :svg-icon="getIcon" width="30" color="salmon" />
      <CustomButton color="primary" @button-action="alertConfirm" />
      {{ message }}
   </div>
</template>
