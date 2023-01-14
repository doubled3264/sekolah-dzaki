<script setup>
import { ref } from 'vue'
import { startsWith } from 'lodash'

const emit = defineEmits(['onSelectFile'])
defineProps({
isShow: Boolean

  })
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
   <div @click="selectFile" class="custom-image-input">
      <h3>pilih gambar</h3>
      <input ref="fileInput" type="file" hidden @input="onSelectFile" />
   </div>
</template>
