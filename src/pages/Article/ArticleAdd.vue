<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import {
   arrowSolidUp,
   arrowSolidDown,
   arrowRight,
   imageAdd,
   textAdd,
   disket,
} from '../../utils/svg-vars'
import * as tinyMceCustomIcon from '../../utils/tinyMceCustomIcon'
import { artikelSchema } from '../../utils/validation/artikel.schema'
import Editor from '@tinymce/tinymce-vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import AddNewImage from '../../components/modal/Article/AddNewImage.vue'
import ContentHead from '../../components/Content/ContentHead.vue'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
const artikel = ref({
   title: '',
   item: [],
})

const errorState = ref({
   title: {
      isError: true,
      message: '',
   },
})
const modal = ref({
   chooseItem: false,
   textEditor: false,
   imageEditor: false,
})
const tinyMceOptions = ref({
   apiKey: 'emcqski0nlymetzrqpc6wq5pg0klreddh5chpfs8qipwf9jk',
   init: {
      menubar: false,
      toolbar:
         'undo redo | blocks | bold italic |  bullist numlist | customSave',
      plugins: 'save lists',
      save_onsavecallback: () => {
         pushTextArticle()
      },
      setup: (editor) => {
         editor.ui.registry.addIcon(
            'customSaveIcon',
            tinyMceCustomIcon.save('18')
         )
         editor.ui.registry.addButton('customSave', {
            icon: 'customSaveIcon',
            onAction: function (_) {
               pushTextArticle()
            },
         })
      },
   },
   contentValue: '',
})
onMounted(() => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
})

function toggleModal(modalName) {
   modal.value[modalName] = !modal.value[modalName]
}

function pushTextArticle() {
   if (tinyMceOptions.value.contentValue.length != 0) {
      artikel.value.item.push({
         type: 'text',
         value: tinyMceOptions.value.contentValue,
      })
      tinyMceOptions.value.contentValue = ''
      toggleModal('textEditor')
      console.log(artikel.value.item)
   }
}

function pushImageArticle(imageValue) {
   console.log(imageValue)
   artikel.value.item.push({
      type: 'image',
      value: {
         rawImage: imageValue,
         previewImage: URL.createObjectURL(imageValue),
      },
   })
}
/**
 * validate input when event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
   await artikelSchema
      .validateAt(field, artikel.value)
      .then(() => {
         errorState.value[field].isError = false
      })
      .catch((err) => {
         errorState.value[field].isError = true
         errorState.value[field].message = err.message
      })
}

function addTextItem() {
   toggleModal('chooseItem')
   toggleModal('textEditor')
}
function addPictureAction() {
   toggleModal('chooseItem')
   console.log('addPictureAction run')
}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <ContentHead
            :items="[
               { title: 'artikel', path: '/artikel' },
               { title: 'tambah data artikel baru', path: '' },
            ]"
         />
         <div class="content__body">
            <div class="card artikel-add">
               <div class="card__head">
                  <div class="card__title">
                     <h3>Masukan Data Artikel</h3>
                  </div>
                  <div class="card__nav">
                     <div
                        class="icon__wrapper"
                        @click="toggleModal('textEditor')"
                     >
                        <CustomIcon :svg-icon="textAdd" />
                     </div>
                     <div
                        class="icon__wrapper"
                        @click="toggleModal('imageEditor')"
                     >
                        <CustomIcon :svg-icon="imageAdd" />
                     </div>
                     <div class="icon__wrapper">
                        <CustomIcon :svg-icon="disket" />
                     </div>
                  </div>
               </div>
               <div class="card__body">
                  <form>
                     <div>
                        <CustomInput
                           type="text"
                           label="Judul"
                           placeholder="Masukan judul artikel.."
                           v-model:input-value="artikel.nama"
                           :error-state="errorState.nama"
                           @validate-input="validateInput('title')"
                        />
                     </div>
                  </form>
                  <ul class="artikel-add__preview-list">
                     <li
                        v-for="(item, index) in artikel.item"
                        class="artikel-add__preview-item"
                     >
                        <div
                           v-if="item.type === 'text'"
                           v-html="item.value"
                        ></div>
                        <div v-if="item.type === 'image'" class="image-content">
                           <img
                              :src="item.value.previewImage"
                              :alt="item.value.rawImage.name"
                           />
                           <div class="image-content__nav">
                              <CustomIcon :svg-icon="arrowSolidUp" />
                              <CustomIcon :svg-icon="arrowSolidDown" />
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
   <teleport to="#modal">
      <CustomModalOverlay
         v-show="modal.textEditor"
         @close-modal="toggleModal('textEditor')"
      >
         <div class="tinymce__wrapper">
            <form>
               <Editor
                  :api-key="tinyMceOptions.apiKey"
                  :init="tinyMceOptions.init"
                  v-model="tinyMceOptions.contentValue"
               />
            </form>
         </div>
      </CustomModalOverlay>
      <CustomModalOverlay
         v-show="modal.imageEditor"
         @close-modal="toggleModal('imageEditor')"
      >
         <AddNewImage />
      </CustomModalOverlay>
   </teleport>
</template>
