<script setup>
import { ref } from 'vue'
import { startsWith } from 'lodash'
import { imageAdd } from '../../utils/svg-var'
import CustomIcon from '../CustomIcon.vue'

const emit = defineEmits(['pushImage'])
const fileInput = ref(null)
function selectFile() {
   fileInput.value.click()
}

function onSelectFile() {
   if (fileInput.value.files && fileInput.value.files[0]) {
      if (startsWith(fileInput.value.files[0].type, 'image')) {
         emit('pushImage', fileInput.value.files[0])
      } else {
         console.log('not image')
      }
   } else {
      console.log('file kosong')
   }
}
</script>
<template>
   <div class="icon__wrapper" @click="selectFile">
      <CustomIcon :svg-icon="imageAdd" />
   </div>
   <input ref="fileInput" type="file" hidden @input="onSelectFile" />
</template>
