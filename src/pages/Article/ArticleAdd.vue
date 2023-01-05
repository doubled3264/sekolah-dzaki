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
import { articleSchema } from '../../utils/validation/article.schema'
import ArticleAddPreviewList from './ArticleAddPreviewList.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import AddNewImage from '../../components/modal/Article/AddNewImage.vue'
import AddNewText from '../../components/modal/Article/AddNewText.vue'
import ContentHead from '../../components/Content/ContentHead.vue'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
const article = ref({
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
const contentValue = ref({})

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

function pushTextArticle(textValue) {
   article.value.item.push({
      type: 'text',
      value: textValue,
   })
   toggleModal('textEditor')
}

function pushImageArticle(imageValue) {
   article.value.item.push({
      type: 'image',
      value: {
         ...imageValue,
      },
   })
   toggleModal('imageEditor')
}

function editText(textIndex) {
   contentValue.value = article.value.item[textIndex].value
   toggleModal('textEditor')
}

function reorderingImage(imageIndex, to) {
   Array.prototype.move = function (from, to) {
      this.splice(to, 0, this.splice(from, 1)[0])
   }
   if (to === 'go up') {
      article.value.item.move(imageIndex, imageIndex - 1)
   } else if (to === 'go down') {
      article.value.item.move(imageIndex, imageIndex + 1)
   }
}

function removeImage(imageIndex) {
   article.value.item.splice(imageIndex, 1)
}
/**
 * validate input when event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
   await articleSchema
      .validateAt(field, article.value)
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
                           v-model:input-value="article.nama"
                           :error-state="errorState.nama"
                           @validate-input="validateInput('title')"
                        />
                     </div>
                  </form>
                  <ArticleAddPreviewList
                     :items="article.item"
                     @edit-text="editText"
                     @reordering-image="reorderingImage"
                     @remove-image="removeImage"
                  />
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
         <AddNewText
            @process-text="pushTextArticle"
            :content-value="contentValue"
         />
      </CustomModalOverlay>
      <CustomModalOverlay
         v-if="modal.imageEditor"
         @close-modal="toggleModal('imageEditor')"
      >
         <AddNewImage
            @cancel-action="toggleModal('imageEditor')"
            @process-image="pushImageArticle"
         />
      </CustomModalOverlay>
   </teleport>
</template>
