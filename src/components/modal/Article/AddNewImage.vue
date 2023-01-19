<script setup>
import { ref, watch } from 'vue'
import { forEach, size } from 'lodash'
import { articleSchema } from '../../../utils/validation/article.schema'
import Swal from 'sweetalert2'
import CustomButton from '../../CustomButton.vue'
import CustomImagePicker from '../../form/CustomImagePicker.vue'
import CustomInput from '../../form/CustomInput.vue'

const props = defineProps({
   imageToEdit: {
      type: Object,
      default: {
         raw: null,
         preview: null,
         caption: null,
         index: null,
      },
   },
   purpose: {
      type: String,
   },
})
const emit = defineEmits(['cancelAction', 'processImage', 'processEdit'])
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
      } else {
         if (props.purpose == 'edit without raw' && image.value.caption != '') {
            validCount++
         }
      }
   })
   if (validCount == size(errorState.value)) {
      if (props.purpose == 'add') {
         emit('processImage', image.value)
      } else if (props.purpose == 'edit') {
         emit('processEdit', image.value, props.imageToEdit.index)
      } else if (props.purpose == 'edit without raw') {
         emit('processEdit', image.value, props.imageToEdit.index)
      }
   } else {
      Swal.fire({
         icon: 'warning',
         text: 'terdapat form yang belum terisi',
         confirmButtonText: 'tutup',
      })
   }
}
watch(
   () => props.purpose,
   (value) => {
      if (value == 'edit') {
         image.value.raw = props.imageToEdit.raw
         image.value.preview = props.imageToEdit.preview
         image.value.caption = props.imageToEdit.caption
      } else if (value == 'edit without raw') {
         image.value.preview = props.imageToEdit.preview
         image.value.caption = props.imageToEdit.caption
      } else if (value == null) {
         image.value.raw = ''
         image.value.preview = ''
         image.value.caption = ''
      }
   }
)
</script>
<template>
   <div class="card article-add__image" @click.stop>
      <div class="card__head">
         <div class="card__title">
            <h3>tambahkan gambar</h3>
         </div>
      </div>
      <div class="card__body">
         <div class="article-add__image-upload">
            <CustomImagePicker
               :title="[' tambahkan gambar', 'ubah gambar']"
               @on-select-file="setPreviewImage"
               :image-is-exist="image.preview"
            />
            <div class="article-add__image-preview">
               <img crossorigin="anonymous" :src="image.preview" alt="" />
            </div>
         </div>
         <div v-if="image.preview" class="article-add__image-caption">
            <CustomInput
               label="keterangan gambar"
               placeholder="Masukan keterangan.."
               v-model:input-value="image.caption"
               :errorState="errorState.caption"
               @validate-input="validateInput('caption')"
            />
         </div>
      </div>
      <div v-if="image.preview" class="card__footer">
         <div class="flex justify-center mt-6">
            <div class="2xl:w-1/4 3xl:w-1/6">
               <CustomButton
                  title="batal"
                  variant="link"
                  color="secondary"
                  block
                  @button-action="$emit('cancelAction')"
               >
               </CustomButton>
            </div>
            <div class="2xl:w-1/4 3xl:w-1/6">
               <CustomButton
                  title="simpan"
                  color="verdigris"
                  block
                  @button-action="validateForm"
               >
               </CustomButton>
            </div>
         </div>
      </div>
   </div>
</template>
