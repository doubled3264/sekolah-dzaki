<script setup>
import { computed, ref, watch } from 'vue'
import { link, copy, doubleTick } from '../utils/svg-vars'
import CustomIcon from './CustomIcon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  invitationLink: {
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
    navigator.clipboard.writeText(props.invitationLink)
    toggleIsCopied()
    setTimeout(toggleIsCopied, 5000)
  }
}

watch(
  () => props.link,
  (value) => {
    console.log(value)
  }
)
</script>
<template>
  <div class="custom-copy-link">
    <label>{{ label }}</label>
    <div class="link-item">
      <CustomIcon :svg-icon="link" width="20" />
      <p>{{ invitationLink }}</p>
      <div :class="[' copy-icon', { 'copy-icon--active': isCopied }]" @click="copyLink">
        <CustomIcon :svg-icon="getCopyIcon" width="20" />
      </div>
    </div>
  </div>
</template>
