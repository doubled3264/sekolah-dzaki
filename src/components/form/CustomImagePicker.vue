<script setup>
import { startsWith } from 'lodash'
import { ref } from 'vue'
import { imageEdit } from '../../utils/svg-vars'
import CustomIcon from '../CustomIcon.vue'

const emit = defineEmits(['onSelectFile'])
defineProps(['title', 'imageIsExist'])
const fileInput = ref(null)
const isVisited = ref(false)

function toggleIsVisited() {
   isVisited.value = !isVisited.value
}
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
   <div
      v-show="imageIsExist"
      @click="selectFile"
      :class="[
         'custom-image-picker',
         {
            'visited ': isVisited,
         },
      ]"
      @mouseenter="toggleIsVisited"
      @mouseleave="toggleIsVisited"
   >
      <CustomIcon :svg-icon="imageEdit" width="54" />
      <p>{{ title[1] }}</p>
   </div>
   <div
      @click="selectFile"
      v-show="!imageIsExist"
      class="custom-image-picker--empty"
   >
      <CustomIcon :svg-icon="imageEdit" width="54" />
      <p>{{ title[0] }}</p>
   </div>
   <input ref="fileInput" type="file" hidden @input="onSelectFile" />
</template>
