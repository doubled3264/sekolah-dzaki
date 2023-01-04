<script setup>
import { ref } from 'vue'
import { forEach, size } from 'lodash'
import { articleSchema } from '../../../utils/validation/article.schema'
import Swal from 'sweetalert2'
import CustomButton from '../../CustomButton.vue'
import CustomImageInput from '../../form/CustomImageInput.vue'
import CustomInput from '../../form/CustomInput.vue'

const emit = defineEmits(['cancelAction', 'processImage'])
const image = ref({
  raw: '',
  preview: '',
  caption: '',
})
const errorState = ref({
  caption: {
    isError: true,
    message: '',
  },
})
function setPreviewImage(value) {
  image.value.raw = value
  image.value.preview = URL.createObjectURL(value)
}

async function validateInput(field) {
  await articleSchema
    .validateAt(field, image.value)
    .then(() => {
      errorState.value[field].isError = false
    })
    .catch((err) => {
      errorState.value[field].isError = true
      errorState.value[field].message = err.message
    })
}

function validateForm() {
  let validCount = 0
  forEach(errorState.value, (data) => {
    // ++ when each of input is valid
    if (data.isError == false) {
      validCount++
    }
  })
  console.log('validCount : ' + validCount)
  console.log('errorstate : ' + size(errorState.value))
  if (validCount == size(errorState.value)) {
    emit('processImage', image.value)
    emit('cancelAction')
  } else {
    Swal.fire({
      icon: 'warning',
      text: 'terdapat form yang belum terisi',
      confirmButtonText: 'tutup',
    })
  }
}
</script>
<template>
  <div class="card article-add__image" @click.stop>
    <div class="card__head">
      <div class="card__title">
        <h3>tambahkan gambar</h3>
      </div>
    </div>
    <div class="card__body">
      <div v-if="!image.raw" class="text-center">
        <CustomImageInput @on-select-file="setPreviewImage" />
      </div>
      <div v-if="image.raw" class="article-add__preview-image">
        <img :src="image.preview" :alt="image.raw.name" />
        <CustomInput label="keterangan gambar" placeholder="Masukan keterangan.." v-model:input-value="image.caption"
          :errorState="errorState.caption" @validate-input="validateInput('caption')" />
      </div>
    </div>
    <div v-if="image.raw" class="card__footer">
      <div class="flex justify-center mt-6">
        <div class="2xl:w-1/4 3xl:w-1/6">
          <CustomButton title="batal" variant="link" color="secondary" block @button-action="$emit('cancelAction')">
          </CustomButton>
        </div>
        <div class="2xl:w-1/4 3xl:w-1/6">
          <CustomButton title="simpan" color="verdigris" block @button-action="validateForm">
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
