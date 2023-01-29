<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
import { swalDialog } from '../../../utils/sweetalert-object'
import Swal from 'sweetalert2'
import ContentHead from '../../../components/Content/ContentHead.vue'
import CustomIcon from '../../../components/CustomIcon.vue'
import CustomSelectBox from '../../../components/form/CustomSelectBox.vue'
import CustomModalOverlay from '../../../components/CustomModalOverlay.vue'
import CustomImagePicker from '../../../components/form/CustomImagePicker.vue'
import ArticleAddPreviewList from './ArticleAddPreviewList.vue'
import CustomButton from '../../../components/CustomButton.vue'
import Spinner from '../../../components/modal/Spinner.vue'
import AddNewImage from '../../../components/modal/Article/AddNewImage.vue'
import AddNewText from '../../../components/modal/Article/AddNewText.vue'
import CustomTextArea from '../../../components/form/CustomTextArea.vue'
import CustomKebabMenuList from '../../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../../components/CustomKebabMenu/CustomKebabMenuItem.vue'

const store = useStore()
const router = useRouter()
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
  first: {
    isActive: true,
    title: 'Masukan artikel info',
  },
  second: {
    isActive: false,
    title: 'Masukan artikel item',
  },
})
/** @type {Boolean} main menu state, only true if second section active  */
const cardMenu = ref(false)
/** @type {Object} state for edit text  */
const textToEdit = ref({
  content: '',
  index: 0,
})
const imageToEdit = ref({
  raw: null,
  preview: null,
  caption: null,
  index: null,
})
/** @type {String} text editor purpose value, add | edit  */
const textEditorPurpose = ref(null)
const imageEditorPurpose = ref(null)

onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
})

function spinner(toggle) {
  if (toggle == 'on') {
    spinnerState.value = true
  } else if (toggle == 'off') {
    spinnerState.value = false
  }
}
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
    section.value[fieldName].isActive = !item.isActive
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
function toggleCardMenu() {
  cardMenu.value = !cardMenu.value
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
const getCardTitle = computed(() => {
  if (section.value.first.isActive) {
    return section.value.first.title
  } else {
    return section.value.second.title
  }
})
/**
 * open text editor for add new text
 * @param {}
 */
function addNewText() {
  //fix bug, tell form to add new text action
  textEditorPurpose.value = 'add'
  toggleModal('textEditor')
}
/**
 * open text editor for edit text
 * @param {String} index of item
 */
function editText(textIndex) {
  textToEdit.value.content = article.value.item[textIndex].content
  textToEdit.value.index = textIndex
  //fix bug, tell form to edit text action
  textEditorPurpose.value = 'edit'
  toggleModal('textEditor')
}
/**
 * prevent accidentally close text editor modal
 */
function closeTextEditor() {
  Swal.fire(swalDialog.preventClose('Artikel yang sudah diketik akan terhapus.')).then(async (result) => {
    if (result.isConfirmed) {
      /* if agree to close */
      textToEdit.value.content = ''
      textToEdit.value.index = 0
      textEditorPurpose.value = null
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
    content: textValue,
    showOptions: false,
  })
  textEditorPurpose.value = null
  toggleModal('textEditor')
}
/**
 * remove text from article item
 * @param {Number} index of text to remove
 */
function removeText(textIndex) {
  Swal.fire(swalDialog.delete('Teks akan dihapus.')).then(async (result) => {
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
  article.value.item[textIndex].content = textValue
  toggleModal('textEditor')
  textEditorPurpose.value = null
}

/**
 * prevent accidentally close add image modal
 */
function closeImageModal() {
  Swal.fire(swalDialog.preventClose('Gambar yang dipilih akan terhapus')).then(async (result) => {
    if (result.isConfirmed) {
      imageEditorPurpose.value = null
      toggleModal('imageEditor')
    }
  })
}
function addNewImage() {
  //fix bug, tell form to add new text action
  imageEditorPurpose.value = 'add'
  toggleModal('imageEditor')
}
/**
 * push new item to article
 * @param {Object} image object
 */
function pushNewImage(imageValue) {
  article.value.item.push({
    type: 'image',
    content: {
      ...imageValue,
    },
    showOptions: false,
  })
  imageEditorPurpose.value = null
  toggleModal('imageEditor')
}
function editImage(imageIndex) {
  imageToEdit.value.raw = article.value.item[imageIndex].content.raw
  imageToEdit.value.preview = article.value.item[imageIndex].content.preview
  imageToEdit.value.caption = article.value.item[imageIndex].content.caption
  imageToEdit.value.index = imageIndex

  imageEditorPurpose.value = 'edit'
  toggleModal('imageEditor')
}

function pushEditedImage(imageObject, imageIndex) {
  article.value.item[imageIndex].content = imageObject
  toggleModal('imageEditor')
  imageEditorPurpose.value = null
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
  Swal.fire(swalDialog.delete('Gambar akan dihapus.')).then(async (result) => {
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
      Swal.fire(swalDialog.error('terdapat form yang belum terisi'))
      return ''
    }
  }
  /* validate thumbnail input */
  if (!article.value.thumbnailImage) {
    Swal.fire(swalDialog.error('Thumbnail belum dipilih'))
    return ''
  }
  /* validate article length */
  if (article.value.item.length == 0) {
    Swal.fire(swalDialog.error('Tambahkan minimal 2 artikel'))
    return ''
  }

  Swal.fire(swalDialog.confirm('Simpan artikel.')).then((result) => {
    if (result.isConfirmed) {
      createArticleData()
    }
  })
}
/**
 * send article to backend
 */
async function createArticleData() {
  spinner('on')
  const uuid = ulid()
  await store.dispatch('article/add', {
    articleData: article.value,
    uuid: uuid,
  })
    .then(() => {
      Swal.fire(swalDialog.success('Artikel berhasil di simpan.'))
      router.push({
        name: 'article detail',
        params: { id: uuid }
      })
    })
    .catch(() => {
      Swal.fire(swalDialog.error('Terjadi kesalahan.'))
    })
  spinner('off')
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="contentHeadItem" />
      <div class="content__body">
        <div class="article-add__wrapper">
          <div class="card">
            <div class="card__head">
              <div class="card__title">
                <h3>{{ getCardTitle }}</h3>
              </div>
              <div v-show="section.second.isActive" class="card__nav" @mouseenter="toggleCardMenu"
                @mouseleave="toggleCardMenu">
                <CustomKebabMenuList :is-show="cardMenu">
                  <CustomKebabMenuItem>
                    <div class="flex gap-4" @click="addNewText">
                      <CustomIcon :svg-icon="textAdd" />
                      <p>tambah teks</p>
                    </div>
                  </CustomKebabMenuItem>
                  <CustomKebabMenuItem>
                    <div class="flex gap-4" @click="addNewImage">
                      <CustomIcon :svg-icon="imageAdd" />
                      <p>tambah gambar</p>
                    </div>
                  </CustomKebabMenuItem>
                  <CustomKebabMenuItem>
                    <div class="flex gap-4" @click="validateForm">
                      <CustomIcon :svg-icon="disket" />
                      <p>simpan artikel</p>
                    </div>
                  </CustomKebabMenuItem>
                </CustomKebabMenuList>
              </div>
            </div>
            <div class="card__body">
              <div v-show="section.first.isActive" class="first-section">
                <div class="w-5/12 flex flex-col">
                  <h3>thumbnail</h3>
                  <div class="thumbnail-image">
                    <CustomImagePicker :title="[' tambahkan gambar', 'ubah gambar']" @on-select-file="setThumbnailImage"
                      :image-is-exist="article.thumbnailImage" />
                    <div class="thumbnail-image__content">
                      <img v-if="article.thumbnailImage" :src="getThumbnailImage" alt="" />
                    </div>
                  </div>
                </div>
                <div class="w-7/12">
                  <CustomTextArea type="text" label="Judul" placeholder="Masukan judul artikel.."
                    v-model:input-value="article.title" :error-state="errorState.title"
                    @validate-input="validateInput('title')" />
                  <CustomSelectBox label="kategori" placeholder="pilih kategori" :options="categoryOptions"
                    v-model:input-value="article.category" :error-state="errorState.category"
                    @validate-input="validateInput('category')" />
                  <CustomSelectBox label="penempatan" placeholder="pilih penempatan" :options="placementOptions"
                    v-model:input-value="article.placement" :error-state="errorState.placement"
                    @validate-input="validateInput('placement')" />
                </div>
              </div>
              <div v-show="section.second.isActive" class="second-section">
                <ArticleAddPreviewList v-show="section.second" :article="article" @edit-image="editImage"
                  @edit-text="editText" @remove-text="removeText" @reordering-image="reorderingImage"
                  @remove-image="removeImage" @toggle-show-options="toggleShowOptions" />
              </div>
            </div>
            <div class="card__footer">
              <div v-show="section.second.isActive" class="flex justify-start">
                <CustomButton :title="section.first.title" :start-icon="{ value: arrowPrev, width: '18' }"
                  variant="link" color="verdigris" @button-action="toggleSection" />
              </div>
              <div v-show="section.first.isActive" class="flex justify-end">
                <CustomButton :title="section.second.title" :end-icon="{ value: arrowNext, width: '18' }" variant="link"
                  color="verdigris" @button-action="toggleSection" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <CustomModalOverlay v-show="modal.textEditor" @close-modal="closeTextEditor">
      <AddNewText @process-text="pushNewText" @process-edit="pushEditedText" :text-to-edit="textToEdit"
        :purpose="textEditorPurpose" />
    </CustomModalOverlay>
    <CustomModalOverlay v-show="modal.imageEditor" @close-modal="closeImageModal">
      <AddNewImage :image-to-edit="imageToEdit" :purpose="imageEditorPurpose" @cancel-action="closeImageModal"
        @process-image="pushNewImage" @process-edit="pushEditedImage" />
    </CustomModalOverlay>
    <CustomModalOverlay v-if="spinnerState">
      <Spinner :is-active="spinnerState" />
    </CustomModalOverlay>
  </teleport>
</template>
