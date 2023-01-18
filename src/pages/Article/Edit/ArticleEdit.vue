<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { forEach } from 'lodash'
import { arrowNext, arrowPrev, disket, imageAdd, textAdd } from '../../../utils/svg-vars'
import { articleSchema } from '../../../utils/validation/article.schema'
import Swal from 'sweetalert2'
import ContentHead from '../../../components/Content/ContentHead.vue'
import CustomButton from '../../../components/CustomButton.vue'
import CustomModalOverlay from '../../../components/CustomModalOverlay.vue'
import CustomTextArea from '../../../components/form/CustomTextArea.vue'
import CustomSelectBox from '../../../components/form/CustomSelectBox.vue'
import CustomThreeDotOptionsList from '../../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../../components/CustomThreeDotOpions/OptionsItem.vue'
import CustomImagePicker from '../../../components/form/CustomImagePicker.vue'
import CustomIcon from '../../../components/CustomIcon.vue'
import Spinner from '../../../components/modal/Spinner.vue'
import ArticleEditItem from './ArticleEditItem.vue'
import AddNewText from '../../../components/modal/Article/AddNewText.vue'
import AddNewImage from '../../../components/modal/Article/AddNewImage.vue'
import { articleDialog } from '../../../utils/sweetalert-object'

const store = useStore()
const route = useRoute()
const router = useRouter()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
  parentItem: String,
  childItem: String,
})
/** @type {Object} content head value */
const contentHeadItem = [
  { title: 'artikel', path: '/artikel' },
  { title: 'edit artikel', path: '' },
]
const spinnerState = ref(false)
/** @type {Object} section state  */
const section = ref({
  first: {
    isActive: true,
    mainMenu: false,
    title: 'artikel info',
  },
  second: {
    isActive: false,
    mainMenu: false,
    title: 'artikel item',
  },
})
const article = ref({})
const articleInfo = ref({
  id: '',
  title: '',
  category: '',
  placement: '',
  thumbnailImage: {
    preview: null,
    raw: null,
    isEdited: false,
    showOptions: false,
    fileName: '',
  },
})
/** @type {Object} error state of each field  */
const errorState = ref({
  title: {
    isError: false,
    message: '',
  },
  category: {
    isError: false,
    message: '',
  },
  placement: {
    isError: false,
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
/** @type {Object} state for edit text  */
const textToEdit = ref({
  value: '',
  index: 0,
})
const imageToEdit = ref({
  raw: '',
  preview: '',
  caption: '',
  index: 0,
})
/** @type {String} text editor purpose value, add | edit  */
const editorPurpose = ref('add')
const imageEditorPurpose = ref(null)
onMounted(async () => {
  spinner('on')
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
  await fetchArticle()
  /* setAvailHeight() */
  spinner('off')
})
/**
 * toggle modal form
 * @param {String} modal name
 */
function toggleModal(modalName) {
  modal.value[modalName] = !modal.value[modalName]
}
function spinner(toggle) {
  if (toggle == 'on') {
    spinnerState.value = true
  } else if (toggle == 'off') {
    spinnerState.value = false
  }
}
async function fetchArticle() {
  await store.dispatch('article/getSingle', route.params.id)
  article.value = store.getters['article/getSingle']
  articleInfo.value.id = article.value.id
  articleInfo.value.title = article.value.title
  articleInfo.value.category = article.value.category
  articleInfo.value.placement = article.value.placement
  articleInfo.value.thumbnailImage.preview = `http://localhost:3000/files/article/${article.value.id}/${article.value.thumbnail}`
  articleInfo.value.thumbnailImage.isEdited = false

  forEach(article.value.ArticleDetails, (item, index) => {
    article.value.ArticleDetails[index].showOptions = false
  })
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
  article.value.ArticleDetails[index].showOptions =
    !article.value.ArticleDetails[index].showOptions
}

function toggleMainMenu(sectionName) {
  section.value[sectionName].mainMenu = !section.value[sectionName].mainMenu
}

/* function toggleShowOptions() { */
/*    articleInfo.value.thumbnailImage.showOptions = */
/*       !articleInfo.value.thumbnailImage.showOptions */
/* } */

const getCardTitle = computed(() => {
  if (section.value.first.isActive) {
    return section.value.first.title
  } else {
    return section.value.second.title
  }
})

function setNewThumbnail(imageValue) {
  articleInfo.value.thumbnailImage.preview = URL.createObjectURL(imageValue)
  articleInfo.value.thumbnailImage.isEdited = true

  articleInfo.value.thumbnailImage.new.raw = imageValue
  articleInfo.value.thumbnailImage.new.thumbnail = imageValue.name
}

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
  textToEdit.value.content = article.value.ArticleDetails[textIndex].content
  textToEdit.value.index = textIndex
  //fix bug, tell form to edit text action
  editorPurpose.value = 'edit'
  toggleModal('textEditor')
}
/**
 * prevent accidentally close text editor modal
 */
function closeTextEditor() {
  Swal.fire(articleDialog.preventClose('Artikel yang sudah diketik akan terhapus.')).then(async (result) => {
    if (result.isConfirmed) {
      /* if agree to close */
      textToEdit.value.value = ''
      textToEdit.value.index = 0
      toggleModal('textEditor')
    }
  })
}
/**
 * prevent accidentally close add image modal
 */
function closeImageModal() {
  Swal.fire(articleDialog.preventClose('Gambar yang dipilih akan terhapus')).then(async (result) => {
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

function editImageItem(imageIndex) {
  imageToEdit.value.raw = ''
  imageToEdit.value.preview = `http://localhost:3000/files/article/${article.value.id}/${article.value.ArticleDetails[imageIndex].content}`
  imageToEdit.value.caption = article.value.ArticleDetails[imageIndex].caption
  imageToEdit.value.index = imageIndex
  imageEditorPurpose.value = 'edit without raw'
  toggleModal('imageEditor')
}
/**
 * replace exist text on article item
 * @param {String} text editor value
 * @param {Number} index of text to replace
 */
/* function pushEditedText(textValue, textIndex) { */
/*   article.value.ArticleDetails[textIndex].content = textValue */
/*   toggleModal('textEditor') */
/* } */

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

async function validateFormInfo() {
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

  Swal.fire({
    title: 'Anda yakin ?',
    text: 'Info artikel akan disimpan.',
    icon: 'question',
    showCancelButton: true,
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, simpan !',
    confirmButtonColor: '#41c3a9',
  }).then((result) => {
    if (result.isConfirmed) {
      /* if (articleInfo.value.thumbnailImage.isEdited) { */
      /*   processArticleInfoImage() */
      /* } */
      /* processArticleInfo() */
      pushEditedInfo()
    }
  })
}
async function pushEditedInfo() {
  console.log(articleInfo.value)
  let infoItem = {
    id: article.value.id,
    category: articleInfo.value.category,
    placement: articleInfo.value.placement
  }
  if (articleInfo.value.thumbnailImage.isEdited) {
    infoItem.raw = articleInfo.value.thumbnailImage.new.raw
    infoItem.itemToDelete = article.value.thumbnail
    /* infoItem.isEdited */
  }


}
/* async function processArticleInfo() { */
/*   await store.dispatch('article/editInfo', { */
/*     article: articleInfo.value */
/*   }).then(() => { */
/*     Swal.fire({ */
/*       icon: 'success', */
/*       text: 'Artikel info berhasil diubah.', */
/*       showConfirmButton: false, */
/*       timer: 1500, */
/*     }) */
/*     router.push({ */
/*       name: 'article detail', */
/*       params: { id: article.value.id } */
/*     }) */
/*     spinner('off') */
/*   }) */
/*     .catch(() => { */
/*       Swal.fire({ */
/*         icon: 'warning', */
/*         text: 'Terjadi kesalahan', */
/*         confirmButtonText: 'tutup', */
/*       }) */
/*       spinner('off') */
/*     }) */
/* } */

/* async function processArticleInfoImage() { */
/*   await store.dispatch('article/editInfoImage', { article: articleInfo.value }).catch(() => { */
/*     Swal.fire({ */
/*       icon: 'warning', */
/*       text: 'Terjadi kesalahan', */
/*       confirmButtonText: 'tutup', */
/*     }) */
/*     spinner('off') */
/*   }) */
/* } */
async function pushNewText(textValue) {
  let textItem = {
    article_id: article.value.id,
    type: 'text',
    content: textValue,
    position: article.value.ArticleDetails.length + 1
  }
  Swal.fire(articleDialog.confirm('Teks akan ditambahkan pada artikel.')).then(async (result) => {
    if (result.isConfirmed) {
      spinner('on')
      await store.dispatch('article/addTextItem', textItem)
        .then(() => {
          Swal.fire(articleDialog.success('Teks berhasil ditambahkan.'))
          router.push({
            name: 'article detail',
            params: { id: article.value.id }
          })
        })
        .catch(() => {
          Swal.fire(articleDialog.error('Terjadi kesalahan.'))
        })
      toggleModal('textEditor')
      spinner('off')
    }
  })
}
async function removeTextItem(textIndex) {
  let textItem = {
    articleId: article.value.id,
    itemId: article.value.ArticleDetails[textIndex].id,
  }
  Swal.fire(articleDialog.delete('Teks akan dihapus')).then(async (result) => {
    if (result.isConfirmed) {
      spinner('on')
      await store.dispatch('article/removeTextItem', { data: textItem })
        .then(async () => {
          Swal.fire(articleDialog.success('Teks berhasil dihapus.'))
          await fetchArticle()
        })
        .catch(() => {
          Swal.fire(articleDialog.error('Terjadi kesalahan.'))
        })
      spinner('off')
    }
  })
}
async function pushEditedText(textValue, textIndex) {
  let textItem = {
    id: article.value.ArticleDetails[textIndex].id,
    content: textValue,
  }
  Swal.fire(articleDialog.confirm('Simpan perubahan.')).then(async (result) => {
    if (result.isConfirmed) {
      spinner('on')
      await store.dispatch('article/editTextItem', textItem)
        .then(async () => {
          Swal.fire(articleDialog.success('Teks berhasil diubah.'))
          await fetchArticle()
        })
        .catch(() => {
          Swal.fire(articleDialog.error('Terjadi kesalahan.'))
        })
      toggleModal('textEditor')
      spinner('off')
    }
  })
}
async function addImageItem(imageObject) {
  let imageItem = {
    articleId: article.value.id,
    type: 'image',
    raw: imageObject.raw,
    caption: imageObject.caption,
    position: article.value.ArticleDetails.length + 1
  }

  Swal.fire(articleDialog.confirm('Gambar akan ditambahkan pada artikel.')).then(async (result) => {
    if (result.isConfirmed) {
      spinner('on')
      await store.dispatch('article/addImageItem', imageItem)
        .then(() => {
          Swal.fire(articleDialog.success('Gambar berhasil ditambahkan.'))
          router.push({
            name: 'article detail',
            params: { id: article.value.id }
          })
        })
        .catch(() => {
          Swal.fire(articleDialog.error('Terjadi kesalahan.'))
        })
      imageEditorPurpose.value = null
      toggleModal('imageEditor')
      spinner('off')
    }
  })
}
async function pushEditImageItem(imageObject, imageIndex) {
  let imageItem = {
    id: article.value.ArticleDetails[imageIndex].id,
    caption: imageObject.caption,
    captionOnly: true
  }
  if (imageObject.raw != '') {
    imageItem.articleId = article.value.id
    imageItem.itemToDelete = article.value.ArticleDetails[imageIndex].content
    imageItem.raw = imageObject.raw
    imageItem.captionOnly = false
  }

  Swal.fire(articleDialog.confirm('Simpan perubahan.')).then(async (result) => {
    if (result.isConfirmed) {
      spinner('on')
      await store.dispatch('article/editImageItem', imageItem)
        .then(async () => {
          Swal.fire(articleDialog.success('Gambar berhasil diubah.'))
          await fetchArticle()
        })
        .catch(() => {
          Swal.fire(articleDialog.error('Terjadi kesalahan.'))
        })
      toggleModal('imageEditor')
      spinner('off')
    }
  })
}
async function removeImageItem(imageIndex) {
  let imageItem = {
    articleId: article.value.id,
    itemId: article.value.ArticleDetails[imageIndex].id,
    itemName: article.value.ArticleDetails[imageIndex].content,
  }
  Swal.fire(articleDialog.delete('Gambar akan dihapus')).then(async (result) => {
    if (result.isConfirmed) {
      spinner('on')
      await store.dispatch('article/removeImageItem', { data: imageItem })
        .then(async () => {
          Swal.fire(articleDialog.success('Gambar berhasil dihapus.'))
          await fetchArticle()
        })
        .catch(() => {
          Swal.fire(articleDialog.error('Terjadi kesalahan.'))
        })
      spinner('off')
    }
  })
}
/* function validateForm() { } */
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="contentHeadItem" />
      <div class="content__body">
        <div class="card">
          <div class="card__head">
            <div class="card__title">
              <h3>{{ getCardTitle }}</h3>
            </div>
            <div v-show="section.first.isActive" class="card__nav article-edit" @mouseenter="toggleMainMenu('first')"
              @mouseleave="toggleMainMenu('first')">
              <CustomThreeDotOptionsList :is-show="section.first.mainMenu">
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="validateFormInfo">
                    <CustomIcon :svg-icon="disket" />
                    <p>simpan info</p>
                  </div>
                </CustomThreeDotOptionsItem>
              </CustomThreeDotOptionsList>
            </div>
            <div v-show="section.second.isActive" class="card__nav article-edit" @mouseenter="toggleMainMenu('second')"
              @mouseleave="toggleMainMenu('second')">
              <CustomThreeDotOptionsList :is-show="section.second.mainMenu">
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="addNewText">
                    <CustomIcon :svg-icon="textAdd" />
                    <p>tambah teks</p>
                  </div>
                </CustomThreeDotOptionsItem>
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="addNewImage">
                    <CustomIcon :svg-icon="imageAdd" />
                    <p>tambah gambar</p>
                  </div>
                </CustomThreeDotOptionsItem>
              </CustomThreeDotOptionsList>
            </div>
          </div>
          <div class="card__body article-edit">
            <div v-show="section.first.isActive" class="section-first">
              <div class="w-2/3">
                <CustomTextArea type="text" label="Judul" placeholder="Masukan judul artikel.."
                  v-model:input-value="articleInfo.title" :error-state="errorState.title"
                  @validate-input="validateInput('title')" />
                <CustomSelectBox label="kategori" placeholder="pilih kategori" :options="categoryOptions"
                  v-model:input-value="articleInfo.category" :error-state="errorState.category"
                  @validate-input="validateInput('category')" />
                <CustomSelectBox label="penempatan" placeholder="pilih penempatan" :options="placementOptions"
                  v-model:input-value="articleInfo.placement" :error-state="errorState.placement"
                  @validate-input="validateInput('placement')" />
              </div>
              <div class="w-1/3 flex flex-col">
                <h3>thumbnail</h3>
                <div class="thumbnail-image">
                  <CustomImagePicker :title="[' tambahkan gambar', 'ubah gambar']" @on-select-file="setNewThumbnail"
                    :image-is-exist="articleInfo.thumbnailImage.preview" />
                  <div class="thumbnail-image__content">
                    <img v-if="articleInfo.thumbnailImage.preview" crossorigin="anonymous"
                      :src="articleInfo.thumbnailImage.preview" alt="" />
                  </div>
                </div>

              </div>
            </div>
            <div v-if="section.second.isActive" class="section-second">
              <ArticleEditItem :article="article" @toggle-show-options="toggleShowOptions" @edit-text="editText"
                @remove-text="removeTextItem" @remove-image="removeImageItem" @edit-image="editImageItem" />
            </div>
          </div>
          <div class="card__footer">
            <div v-show="section.second.isActive" class="flex justify-start">
              <CustomButton :title="section.first.title" :start-icon="{ value: arrowPrev, width: '18' }" variant="link"
                color="verdigris" @button-action="toggleSection" />
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
  <Teleport to="#modal">
    <CustomModalOverlay v-if="spinnerState">
      <Spinner :is-active="spinnerState" />
    </CustomModalOverlay>
    <CustomModalOverlay v-if="modal.textEditor" @close-modal="closeTextEditor">
      <AddNewText @process-text="pushNewText" @process-edit="pushEditedText" :text-to-edit="textToEdit"
        :purpose="editorPurpose" />
    </CustomModalOverlay>
    <CustomModalOverlay v-show="modal.imageEditor" @close-modal="closeImageModal">
      <AddNewImage :image-to-edit="imageToEdit" :purpose="imageEditorPurpose" @cancel-action="closeImageModal"
        @process-image="addImageItem" @process-edit="pushEditImageItem" />
    </CustomModalOverlay>
  </Teleport>
</template>
