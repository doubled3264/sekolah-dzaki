<script setup>
import { ref, watch } from 'vue'
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
const emit = defineEmits(['onCloseModal', 'onAddImage', 'onEditImage'])
const image = ref({
   raw: '',
   preview: '',
   link: '',
})
function setImage(imageValue) {
   image.value.raw = imageValue
   image.value.preview = URL.createObjectURL(imageValue)
}

function processImage() {
   if (props.purpose == 'add') {
      emit('onAddImage', image.value)
   } else if (props.purpose == 'edit without raw') {
      emit('onEditImage', image.value, props.imageToEdit.index)
   }
}

watch(
   () => props.purpose,
   (value) => {
      if (value == null) {
         image.value.raw = ''
         image.value.preview = ''
         image.value.link = ''
      } else if (value == 'edit without raw') {
         image.value.preview = props.imageToEdit.preview
         image.value.link = props.imageToEdit.link
      }
   }
)
</script>
<template>
   <div class="banner__modal-image-editor">
      <div class="card" @click.stop>
         <div class="card__head">
            <div class="card__title">
               <h3>tambahkan gambar</h3>
            </div>
         </div>
         <div class="card__body">
            <div class="upload">
               <CustomImagePicker
                  :title="['tambahkan gambar', 'ubah gambar']"
                  @on-select-file="setImage"
                  :image-is-exist="image.preview"
               />
               <img crossorigin="anonymous" :src="image.preview" alt="" />
            </div>
            <div v-show="image.preview" class="link-item">
               <CustomInput
                  label="link banner  *optional"
                  placeholder="Masukan link"
                  v-model:input-value="image.link"
               />
            </div>
         </div>
         <div v-show="image.preview" class="card__footer">
            <div class="flex justify-center mt-6">
               <div class="2xl:w-1/4 3xl:w-1/6">
                  <CustomButton
                     title="batal"
                     variant="link"
                     color="secondary"
                     block
                     @button-action="$emit('onCloseModal')"
                  >
                  </CustomButton>
               </div>
               <div class="2xl:w-1/4 3xl:w-1/6">
                  <CustomButton
                     title="simpan"
                     color="verdigris"
                     block
                     @button-action="processImage"
                  >
                  </CustomButton>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
