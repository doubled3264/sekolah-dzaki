<script setup>
import { computed, ref } from 'vue'
import { link, copy, doubleTick } from '../utils/svg-vars'
import CustomIcon from './CustomIcon.vue'

defineProps({
   label: {
      type: String,
      required: true,
   },
})
const isCopied = ref(false)
const getCopyIcon = computed(() => {
   return isCopied.value ? doubleTick : copy
})
function toggleIsCopied() {
   isCopied.value = !isCopied.value
}

function copyLink() {
   if (!isCopied.value) {
      console.log('copy proses..')
      toggleIsCopied()
      setTimeout(toggleIsCopied, 5000)
   }
}
</script>
<template>
   <div class="custom-copy-link">
      <label>{{ label }}</label>
      <div class="link-item">
         <CustomIcon :svg-icon="link" width="20" />
         <p>hehehe</p>
         <div
            :class="[' copy-icon', { 'copy-icon--active': isCopied }]"
            @click="copyLink"
         >
            <CustomIcon :svg-icon="getCopyIcon" width="20" />
         </div>
      </div>
   </div>
</template>
