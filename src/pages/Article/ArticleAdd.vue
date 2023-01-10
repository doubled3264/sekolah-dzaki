<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { imageAdd, textAdd, disket } from '../../utils/svg-vars'
import { articleSchema } from '../../utils/validation/article.schema'
import { articleDialog } from '../../utils/sweetalert-object'
import Swal from 'sweetalert2'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomThreeDotOptionsList from '../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../components/CustomThreeDotOpions/OptionsItem.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import ArticleAddPreviewList from './ArticleAddPreviewList.vue'
import AddNewImage from '../../components/modal/Article/AddNewImage.vue'
import AddNewText from '../../components/modal/Article/AddNewText.vue'

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
  textEditor: false,
  imageEditor: false,
})

const mainMenu = ref(false)
const textToEdit = ref({
  value: '',
  index: 0,
})
const editorPurpose = ref('add')

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

function addNewText() {
  //fix bug
  editorPurpose.value = 'add'
  toggleModal('textEditor')
}

function editText(textIndex) {
  textToEdit.value.value = article.value.item[textIndex].value
  textToEdit.value.index = textIndex
  editorPurpose.value = 'edit'
  toggleModal('textEditor')
}

function closeTextEditor() {
  Swal.fire(articleDialog.preventClose).then(async (result) => {
    if (result.isConfirmed) {
      textToEdit.value.value = ''
      textToEdit.value.index = 0
      toggleModal('textEditor')
    }
  })
}

function pushNewText(textValue) {
  article.value.item.push({
    type: 'text',
    value: textValue,
    showOptions: false,
  })
  toggleModal('textEditor')
}

function removeText(textIndex) {
  console.log(textIndex)
  Swal.fire(articleDialog.deleteText).then(async (result) => {
    if (result.isConfirmed) {
      article.value.item.splice(textIndex, 1)
    }
  })
}

function pushEditedText(content, textIndex) {
  article.value.item[textIndex].value = content
  toggleModal('textEditor')
}

function closeAddImageModal() {
  Swal.fire(articleDialog.preventClose).then(async (result) => {
    if (result.isConfirmed) {
      toggleModal('imageEditor')
    }
  })
}

function pushNewImage(imageValue) {
  console.log(imageValue)
  article.value.item.push({
    type: 'image',
    value: {
      ...imageValue,
    },
    showOptions: false,
  })
  console.log(article.value.item)
  toggleModal('imageEditor')
}

function reorderingImage(imageIndex, to) {
  // fix bug
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

function removeImage(imageIndex) {
  Swal.fire(articleDialog.deleteImage).then(async (result) => {
    if (result.isConfirmed) {
      article.value.item.splice(imageIndex, 1)
    }
  })
}

function toggleShowOptions(index) {
  article.value.item[index].showOptions =
    !article.value.item[index].showOptions
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

async function validateForm() {
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
async function createArticleData() {
  store.dispatch('article/add', article.value)
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="[
  { title: 'artikel', path: '/artikel' },
  { title: 'tambah data artikel baru', path: '' },
]" />
      <div class="content__body">
        <div class="card artikel-add">
          <div class="card__head">
            <div class="card__title">
              <h3>Masukan Data Artikel</h3>
            </div>
            <div class="card__nav article-add" @mouseenter="mainMenu = !mainMenu" @mouseleave="mainMenu = !mainMenu">
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
              <!--
              <div class="icon__wrapper" @click="addNewText">
                <CustomIcon :svg-icon="textAdd" />
              </div>
              <div class="icon__wrapper" @click="toggleModal('imageEditor')">
                <CustomIcon :svg-icon="imageAdd" />
              </div>
              <div class="icon__wrapper">
                <CustomIcon :svg-icon="disket" />
              </div>
              -->
            </div>
          </div>
          <div class="card__body">
            <form>
              <div>
                <CustomInput type="text" label="Judul" placeholder="Masukan judul artikel.."
                  v-model:input-value="article.title" :error-state="errorState.title"
                  @validate-input="validateInput('title')" />
              </div>
            </form>
            <ArticleAddPreviewList :items="article.item" @edit-text="editText" @remove-text="removeText"
              @reordering-image="reorderingImage" @remove-image="removeImage"
              @toggle-show-options="toggleShowOptions" />
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
  </teleport>
</template>
