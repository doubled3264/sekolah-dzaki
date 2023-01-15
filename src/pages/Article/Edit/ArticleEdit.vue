<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { forEach } from 'lodash'
import {
   arrowNext,
   arrowPrev,
   disket,
   imageEdit,
} from '../../../utils/svg-vars'
import { articleSchema } from '../../../utils/validation/article.schema'
import Swal from 'sweetalert2'
import ContentHead from '../../../components/Content/ContentHead.vue'
import CustomButton from '../../../components/CustomButton.vue'
import CustomModalOverlay from '../../../components/CustomModalOverlay.vue'
import CustomTextArea from '../../../components/form/CustomTextArea.vue'
import CustomSelectBox from '../../../components/form/CustomSelectBox.vue'
import CustomThreeDotOptionsList from '../../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../../components/CustomThreeDotOpions/OptionsItem.vue'
import CustomImageInput from '../../../components/form/CustomImageInput.vue'
import CustomImagePicker from '../../../components/form/CustomImagePicker.vue'
import CustomIcon from '../../../components/CustomIcon.vue'
import Spinner from '../../../components/modal/Spinner.vue'
import ArticleEditItem from './ArticleEditItem.vue'

const store = useStore()
const route = useRoute()
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
      title: 'artikel info',
   },
   second: {
      isActive: false,
      title: 'artikel item',
   },
})
const mainMenu = ref(false)
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
      fileName: ''
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

   forEach(article.value.ArticleDetails, (item, index)=>{
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

function toggleMainMenu() {
   mainMenu.value = !mainMenu.value
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

function setNewThumbnail(value) {
   articleInfo.value.thumbnailImage.fileName = value.name
   articleInfo.value.thumbnailImage.raw = value
   articleInfo.value.thumbnailImage.preview = URL.createObjectURL(value)
   articleInfo.value.thumbnailImage.isEdited = true
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
         if (articleInfo.value.thumbnailImage.isEdited) {
            processArticleInfoImage()
         }
         processArticleInfo()
      }
   })
}
async function processArticleInfo() {
   spinner('on')
   await store.dispatch('article/editInfo', { article: articleInfo.value })
   spinner('off')
}

async function processArticleInfoImage() {
   spinner('on')
   await store.dispatch('article/editInfoImage', { article: articleInfo.value })
   spinner('off')
}
function validateForm() {}
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
                  <div
                     class="card__nav article-edit"
                     @mouseenter="toggleMainMenu"
                     @mouseleave="toggleMainMenu"
                  >
                     <CustomThreeDotOptionsList :is-show="mainMenu">
                        <CustomThreeDotOptionsItem>
                           <div class="flex gap-4" @click="validateFormInfo">
                              <CustomIcon :svg-icon="disket" />
                              <p>simpan info</p>
                           </div>
                        </CustomThreeDotOptionsItem>
                     </CustomThreeDotOptionsList>
                  </div>
               </div>
               <div class="card__body article-edit">
                  <div v-show="section.first.isActive" class="section-first">
                     <div class="w-1/2">
                        <CustomTextArea
                           type="text"
                           label="Judul"
                           placeholder="Masukan judul artikel.."
                           v-model:input-value="articleInfo.title"
                           :error-state="errorState.title"
                           @validate-input="validateInput('title')"
                        />
                        <CustomSelectBox
                           label="kategori"
                           placeholder="pilih kategori"
                           :options="categoryOptions"
                           v-model:input-value="articleInfo.category"
                           :error-state="errorState.category"
                           @validate-input="validateInput('category')"
                        />
                        <CustomSelectBox
                           label="penempatan"
                           placeholder="pilih penempatan"
                           :options="placementOptions"
                           v-model:input-value="articleInfo.placement"
                           :error-state="errorState.placement"
                           @validate-input="validateInput('placement')"
                        />
                     </div>
                     <div class="w-1/2">
                        <h3>gambar thumbnail</h3>
                        <div
                           class="h-56 flex justify-center items-center relative"
                        >
                           <div class="image__wrapper">
                              <CustomImagePicker
                                 title="ganti gambar"
                                 @on-select-file="setNewThumbnail"
                              />
                              <img
                                 crossorigin="anonymous"
                                 :src="articleInfo.thumbnailImage.preview"
                                 alt=""
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div v-if="section.second.isActive" class="section-second">
                     <ArticleEditItem :article="article" />
                  </div>
               </div>
               <div class="card__footer">
                  <div
                     v-show="section.second.isActive"
                     class="flex justify-start"
                  >
                     <CustomButton
                        :title="section.first.title"
                        :start-icon="{ value: arrowPrev, width: '18' }"
                        variant="link"
                        color="verdigris"
                        @button-action="toggleSection"
                     />
                  </div>
                  <div v-show="section.first.isActive" class="flex justify-end">
                     <CustomButton
                        :title="section.second.title"
                        :end-icon="{ value: arrowNext, width: '18' }"
                        variant="link"
                        color="verdigris"
                        @button-action="toggleSection"
                     />
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
   </Teleport>
</template>
