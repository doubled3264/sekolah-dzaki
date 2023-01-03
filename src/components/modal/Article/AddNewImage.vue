<script setup>
import { ref } from 'vue'
import CustomImageInput from '../../form/CustomImageInput.vue'
import CustomInput from '../../form/CustomInput.vue'

/* defineEmits(['']) */
const image = ref({
  raw: '',
  preview: '',
  caption: '',
})
function setPreviewImage(value) {
  image.value.raw = value
  image.value.preview = URL.createObjectURL(value)
}
</script>
<template>
  <div class="card artikel-add__image">
    <div class="card__body">
      <CustomImageInput @on-select-file="setPreviewImage" />
      <img :src="image.preview" :alt="image.raw.name" />
      <CustomInput />
    </div>
  </div>
</template>
