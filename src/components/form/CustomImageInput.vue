<script setup>
import { ref } from 'vue'
import { startsWith } from 'lodash'
import { imageAdd } from '../../utils/svg-vars'
import CustomIcon from '../CustomIcon.vue'
import CustomButton from '../CustomButton.vue'

const emit = defineEmits(['onSelectFile'])
const fileInput = ref(null)
function selectFile() {
  fileInput.value.click()
}

function onSelectFile() {
  if (fileInput.value.files && fileInput.value.files[0]) {
    if (startsWith(fileInput.value.files[0].type, 'image')) {
      emit('onSelectFile', fileInput.value.files[0])
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
    <CustomButton title="pilih gambar" />
  </div>
  <input ref="fileInput" type="file" hidden @input="onSelectFile" />
</template>
