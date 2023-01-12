<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { ulid } from 'ulid'
import { forEach } from 'lodash'
import {
  imageAdd,
  textAdd,
  disket,
  arrowNext,
  arrowPrev,
} from '../../../utils/svg-vars'
import { articleSchema } from '../../../utils/validation/article.schema'
import { articleDialog } from '../../../utils/sweetalert-object'
import Swal from 'sweetalert2'
import ContentHead from '../../../components/Content/ContentHead.vue'
import CustomIcon from '../../../components/CustomIcon.vue'
import CustomInput from '../../../components/form/CustomInput.vue'
import CustomSelectBox from '../../../components/form/CustomSelectBox.vue'
import CustomThreeDotOptionsList from '../../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../../components/CustomThreeDotOpions/OptionsItem.vue'
import CustomModalOverlay from '../../../components/CustomModalOverlay.vue'
import CustomImageInput from '../../../components/form/CustomImageInput.vue'
import ArticleAddPreviewList from './ArticleAddPreviewList.vue'
import CustomButton from '../../../components/CustomButton.vue'
import Spinner from '../../../components/modal/Spinner.vue'
import AddNewImage from '../../../components/modal/Article/AddNewImage.vue'
import AddNewText from '../../../components/modal/Article/AddNewText.vue'

const store = useStore()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
  parentItem: String,
  childItem: String,
})
/** @type {Object} content head value */
const contentHeadItem = [
  { title: 'artikel', path: '/artikel' },
  { title: 'tambah data artikel baru', path: '' },
]
const spinnerState = ref(false)
/** @type {Object} article item  */
const article = ref({
  title: '',
  category: '',
  placement: '',
  thumbnailImage: null,
  item: [],
})
/** @type {Object} error state of each field  */
const errorState = ref({
  title: {
    isError: true,
    message: '',
  },
  category: {
    isError: true,
    message: '',
  },
  placement: {
    isError: true,
    message: '',
  },
})
/** @type {Object} category item  */
const categoryOptions = ['artikel', 'berita']
/** @type {Object} placement item  */
const placementOptions = ['yayasan', 'sd', 'smp']
/** @type {Object} modal state  */
const modal = ref({
  textEditor: false,
  imageEditor: false,
})
/** @type {Object} section state  */
const section = ref({
  first: true,
  second: false,
})
/** @type {Boolean} main menu state, only true if second section active  */
const mainMenu = ref(false)
/** @type {Object} state for edit text  */
const textToEdit = ref({
  value: '',
  index: 0,
})
/** @type {String} text editor purpose value, add | edit  */
const editorPurpose = ref('add')

onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
})
/**
* toggle modal form
* @param {String} modal name
*/
function toggleModal(modalName) {
  modal.value[modalName] = !modal.value[modalName]
}
/**
* toggle section
*/
function toggleSection() {
  forEach(section.value, (item, fieldName) => {
    section.value[fieldName] = !item
  })
}
/**
* toggle show options
* @param {Number} index of item 
*/
function toggleShowOptions(index) {
  article.value.item[index].showOptions =
    !article.value.item[index].showOptions
}
/**
* set thumbnailImage value
* @param {Object} image value
*/
function setThumbnailImage(imageValue) {
  article.value.thumbnailImage = imageValue
}
/**
* convert raw image to blob 
* @returns {Blob} image
*/
const getThumbnailImage = computed(() => {
  return URL.createObjectURL(article.value.thumbnailImage)
})
/**
* open text editor for add new text
* @param {}
*/
function addNewText() {
  //fix bug, tell form to add new text action
  editorPurpose.value = 'add'
  toggleModal('textEditor')
}
/**
* open text editor for edit text
* @param {String} index of item
*/
function editText(textIndex) {
  textToEdit.value.value = article.value.item[textIndex].value
  textToEdit.value.index = textIndex
  //fix bug, tell form to edit text action
  editorPurpose.value = 'edit'
  toggleModal('textEditor')
}
/**
* prevent accidentally close text editor modal
*/
function closeTextEditor() {
  Swal.fire(articleDialog.preventClose).then(async (result) => {
    if (result.isConfirmed) {
      /* if agree to close */
      textToEdit.value.value = ''
      textToEdit.value.index = 0
      toggleModal('textEditor')
    }
  })
}
/**
* push new item to article
* @param {String} text editor value
*/
function pushNewText(textValue) {
  article.value.item.push({
    type: 'text',
    value: textValue,
    showOptions: false,
  })
  toggleModal('textEditor')
}
/**
* remove text from article item
* @param {Number} index of text to remove
*/
function removeText(textIndex) {
  Swal.fire(articleDialog.deleteText).then(async (result) => {
    if (result.isConfirmed) {
      article.value.item.splice(textIndex, 1)
    }
  })
}
/**
* replace exist text on article item
* @param {String} text editor value 
* @param {Number} index of text to replace
*/
function pushEditedText(textValue, textIndex) {
  article.value.item[textIndex].value = textValue
  toggleModal('textEditor')
}

/**
* prevent accidentally close add image modal
*/
function closeAddImageModal() {
  Swal.fire(articleDialog.preventClose).then(async (result) => {
    if (result.isConfirmed) {
      toggleModal('imageEditor')
    }
  })
}
/**
* push new item to article
* @param {Object} image object 
*/
function pushNewImage(imageValue) {
  article.value.item.push({
    type: 'image',
    value: {
      ...imageValue,
    },
    showOptions: false,
  })
  toggleModal('imageEditor')
}
/**
* reordering image to go up or go down
* @param {Number} index of image to reordering
* @oaram {String} action fo reordering go up | go down
*/
function reorderingImage(imageIndex, to) {
  // fix bug, change state show options after change image item order
  article.value.item[imageIndex].showOptions = false
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
  }
  if (to === 'go up') {
    article.value.item.move(imageIndex, imageIndex - 1)
  } else if (to === 'go down') {
    article.value.item.move(imageIndex, imageIndex + 1)
  }
}
/**
* remove image from article item
* @param {Number} infex of image to remove
*/
function removeImage(imageIndex) {
  Swal.fire(articleDialog.deleteImage).then(async (result) => {
    if (result.isConfirmed) {
      article.value.item.splice(imageIndex, 1)
    }
  })
}

/**
 * validate input when event triggered
 * @param {String} article field 
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
/**
* validate all form before send article to backend
*/
async function validateForm() {
  /* validate input component */
  for (const item in errorState.value) {
    if (errorState.value[item].isError) {
      Swal.fire({
        icon: 'warning',
        text: 'terdapat form yang belum terisi',
        confirmButtonText: 'tutup',
      })
      return ''
    }
  }
  /* validate thumbnail input */
  if (!article.value.thumbnailImage) {
    Swal.fire({
      icon: 'warning',
      text: 'Thumbnail belum dipilih',
      confirmButtonText: 'tutup',
    })
    return ''
  }
  /* validate article length */
  if (article.value.item.length == 0) {
    Swal.fire({
      icon: 'warning',
      text: 'Tambahkan minimal 2 artikel',
      confirmButtonText: 'tutup',
    })
    return ''
  }

  Swal.fire({
    title: 'Anda yakin ?',
    text: 'Artikel akan disimpan.',
    icon: 'question',
    showCancelButton: true,
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, simpan !',
    confirmButtonColor: '#41c3a9',
  }).then((result) => {
    if (result.isConfirmed) {
      createArticleData()
    }
  })
}
/**
* send article to backend
*/
async function createArticleData() {
  spinnerState.value = true
  const uuid = ulid()
  //first, upload image file
  await store.dispatch('article/addImage', {
    articleData: article.value,
    uuid: uuid,
  })
  //sencond, upload article
  await store.dispatch('article/addArticle', {
    articleData: article.value,
    uuid: uuid,
  })
  spinnerState.value = false
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="contentHeadItem" />
      <div class="content__body">
        <div class="card artikel-add">
          <div class="card__head">
            <div class="card__title">
              <h3>Masukan Data Artikel</h3>
            </div>
            <div v-show="section.second" class="card__nav article-add" @mouseenter="mainMenu = !mainMenu"
              @mouseleave="mainMenu = !mainMenu">
              <CustomThreeDotOptionsList :is-show="mainMenu">
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="addNewText">
                    <CustomIcon :svg-icon="textAdd" />
                    <p>tambah teks</p>
                  </div>
                </CustomThreeDotOptionsItem>
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="toggleModal('imageEditor')">
                    <CustomIcon :svg-icon="imageAdd" />
                    <p>tambah gambar</p>
                  </div>
                </CustomThreeDotOptionsItem>
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="validateForm">
                    <CustomIcon :svg-icon="disket" />
                    <p>simpan artikel</p>
                  </div>
                </CustomThreeDotOptionsItem>
              </CustomThreeDotOptionsList>
            </div>
          </div>
          <div class="card__body article-add">
            <form v-show="section.first">
              <CustomInput type="text" label="Judul" placeholder="Masukan judul artikel.."
                v-model:input-value="article.title" :error-state="errorState.title"
                @validate-input="validateInput('title')" />
              <div class="flex gap-2">
                <div class="w-6/12">
                  <CustomSelectBox label="kategori" placeholder="pilih kategori" :options="categoryOptions"
                    v-model:input-value="article.category" :error-state="errorState.category"
                    @validate-input="validateInput('category')" />
                </div>
                <div class="w-6/12">
                  <CustomSelectBox label="penempatan" placeholder="pilih penempatan" :options="placementOptions"
                    v-model:input-value="article.placement" :error-state="errorState.placement"
                    @validate-input="validateInput('placement')" />
                </div>
              </div>
              <h5>tambahkan thumbnail</h5>
              <div v-if="!article.thumbnailImage" class="text-center">
                <CustomImageInput @on-select-file="setThumbnailImage" />
              </div>
              <div v-if="article.thumbnailImage" class="w-3/5 my-4 mx-auto rounded-lg overflow-hidden">
                <img :src="getThumbnailImage" alt="" />
              </div>
            </form>
            <ArticleAddPreviewList v-show="section.second" :article="article" @edit-text="editText"
              @remove-text="removeText" @reordering-image="reorderingImage" @remove-image="removeImage"
              @toggle-show-options="toggleShowOptions" />
          </div>
          <div class="card__footer">
            <div v-show="section.second" class="flex justify-start">
              <CustomButton title="sebelumnya" :start-icon="{ value: arrowPrev, width: '18' }" variant="link"
                color="verdigris" @button-action="toggleSection" />
            </div>
            <div v-show="section.first" class="flex justify-end">
              <CustomButton title="selanjutnya" :end-icon="{ value: arrowNext, width: '18' }" variant="link"
                color="verdigris" @button-action="toggleSection" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <CustomModalOverlay v-if="modal.textEditor" @close-modal="closeTextEditor()">
      <AddNewText @process-text="pushNewText" @process-edit="pushEditedText" :text-to-edit="textToEdit"
        :purpose="editorPurpose" />
    </CustomModalOverlay>
    <CustomModalOverlay v-if="modal.imageEditor" @close-modal="closeAddImageModal">
      <AddNewImage @cancel-action="toggleModal('imageEditor')" @process-image="pushNewImage" />
    </CustomModalOverlay>
    <CustomModalOverlay v-if="spinnerState">
      <Spinner :is-active="spinnerState" />
    </CustomModalOverlay>
  </teleport>
</template>
