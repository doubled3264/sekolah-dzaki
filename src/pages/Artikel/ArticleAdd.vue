<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { arrowRight, imageAdd, textAdd, disket } from '../../utils/svg-var'
import { artikelSchema } from '../../utils/validation/artikel.schema'
import Editor from '@tinymce/tinymce-vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import ArticleChooseItem from '../../components/modal/ArticleAddItem.vue'

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
    toolbar: 'undo redo | blocks | bold italic |  bullist numlist | save',
    plugins: 'save lists',
    save_onsavecallback: () => {
      pushArticle()
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

function pushArticle() {
  /* console.log(tinyMceOptions.value.contentValue) */
  artikel.value.item.push(tinyMceOptions.value.contentValue)
  tinyMceOptions.value.contentValue = ''
  toggleModal('textEditor')
  console.log(artikel.value.item)
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
      <div class="content__head">
        <div class="content__path">
          <span class="cursor-pointer" @click="cancelAction">artikel</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>tambah data artikel baru</span>
        </div>
        <div class="content__title">
          <h3>tambah data artikel baru</h3>
        </div>
      </div>
      <div class="content__body">
        <div class="card artikel-add">
          <div class="card__head">
            <div class="card__title">
              <h3>Masukan Data Artikel</h3>
            </div>
            <div class="card__nav">
              <div class="icon__wrapper" @click="toggleModal('textEditor')">
                <CustomIcon :svg-icon="textAdd" />
              </div>
              <div class="icon__wrapper">
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
                <CustomInput type="text" label="Judul" placeholder="Masukan judul artikel.."
                  v-model:input-value="artikel.nama" :error-state="errorState.nama"
                  @validate-input="validateInput('title')" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <CustomModalOverlay v-show="modal.textEditor" @close-modal="toggleModal('textEditor')">
      <div class="tinymce__wrapper">
        <form>
          <Editor :api-key="tinyMceOptions.apiKey" :init="tinyMceOptions.init" v-model="tinyMceOptions.contentValue" />
        </form>
      </div>
    </CustomModalOverlay>
  </teleport>
</template>
