<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { parse, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { pencil, trash } from '../../utils/svg-vars'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import CustomKebabMenuList from '../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../components/CustomKebabMenu/CustomKebabMenuItem.vue'
import Spinner from '../../components/modal/Spinner.vue'
import Swal from 'sweetalert2'
import { swalDialog } from '../../utils/sweetalert-object'

const store = useStore()
const route = useRoute()
const router = useRouter()
const APIURL = import.meta.env.VITE_APIURL
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
   parentItem: String,
   childItem: String,
})
/** @type {Object} content head value */
const contentHeadItem = [
   { title: 'artikel', path: '/artikel' },
   { title: 'detail artikel', path: '' },
]
const spinnerState = ref(false)
const mainMenuState = ref(false)
const cardMenu = ref(false)
const availHeight = ref(0)
const article = ref({})

onMounted(async () => {
   spinner('on')
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
   await fetchArticle()
   setAvailHeight()
   spinner('off')
})
function spinner(toggle) {
   if (toggle == 'on') {
      spinnerState.value = true
   } else if (toggle == 'off') {
      spinnerState.value = false
   }
}
function setAvailHeight() {
   availHeight.value = window.innerHeight - (32 + 24 + 20 + 36 + 90 + 12)
}
async function fetchArticle() {
   await store.dispatch('article/getSingle', route.params.id)
   article.value = store.getters['article/getSingle']
}
function toggleCardMenu() {
   cardMenu.value = !cardMenu.value
}

const getAuthor = computed(() => {
   if (article.value.Admin) {
      return article.value.Admin.nama
   }
})

const getArticleDate = computed(() => {
   if (article.value.write_date) {
      const date = parse(article.value.write_date, 'yyyy-MM-dd', new Date())
      return format(date, 'dd MMMM yyyy', { locale: id })
   }
})

const getThumbnail = computed(() => {
   if (article.value.id) {
      return `${APIURL}/files/article/${article.value.id}/${article.value.thumbnail}`
   } else {
      return ''
   }
})
const getContentImage = computed(() => {
   return (value) => {
      return `${APIURL}/files/article/${article.value.id}/${value}`
   }
})

function editArticle() {
   router.push({
      name: 'article change',
      params: { id: article.value.id },
   })
}

async function removeArticle() {
   spinner('on')
   Swal.fire(swalDialog.delete('Artikel akan dihapus.')).then(
      async (result) => {
         if (result.isConfirmed) {
            await store
               .dispatch('article/delete', article.value.id)
               .then(() => {
                  Swal.fire(swalDialog.success('Artikel berhasil dihapus.'))
                  router.push({
                     name: 'article list',
                  })
               })
               .catch(() => {
                  Swal.fire(swalDialog.error('Terjadi kesalahan.'))
               })
         }
      }
   )
   spinner('off')
}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <ContentHead :items="contentHeadItem" />
         <div class="content__body">
            <div class="article-detail__wrapper">
               <div class="card">
                  <div class="card__head">
                     <div class="card__title">
                        <h3>detail artikel</h3>
                     </div>
                     <div
                        class="card__nav"
                        @mouseenter="toggleCardMenu"
                        @mouseleave="toggleCardMenu"
                     >
                        <CustomKebabMenuList :is-show="cardMenu">
                           <CustomKebabMenuItem>
                              <div class="flex gap-4" @click="editArticle">
                                 <CustomIcon :svg-icon="pencil" />
                                 <p>edit artikel</p>
                              </div>
                           </CustomKebabMenuItem>
                           <CustomKebabMenuItem>
                              <div class="flex gap-4" @click="removeArticle">
                                 <CustomIcon :svg-icon="trash" />
                                 <p>hapus artikel</p>
                              </div>
                           </CustomKebabMenuItem>
                        </CustomKebabMenuList>
                     </div>
                  </div>
                  <div class="card__body">
                     <div
                        :style="{ maxHeight: availHeight + 'px' }"
                        class="article-detail__content"
                     >
                        <div class="article-detail__title">
                           <h2>{{ article.title }}</h2>
                        </div>
                        <div class="article-detail__info">
                           <p>
                              oleh <span>{{ getAuthor }}</span>
                           </p>
                           <p>{{ getArticleDate }}</p>
                        </div>
                        <div class="article-detail__thumbnail">
                           <img
                              crossorigin="anonymous"
                              :src="getThumbnail"
                              alt=""
                           />
                        </div>
                        <ul class="article-detail__list">
                           <li
                              v-for="(item, index) in article.ArticleDetails"
                              class="article-detail__item"
                           >
                              <div
                                 v-if="item.type == 'text'"
                                 class="text-content"
                                 v-html="item.content"
                              ></div>
                              <div
                                 v-if="item.type == 'image'"
                                 class="image-content"
                              >
                                 <div class="image-wrapper">
                                    <img
                                       crossorigin="anonymous"
                                       :src="getContentImage(item.content)"
                                       alt=""
                                    />
                                 </div>
                                 <p>{{ item.caption }}</p>
                              </div>
                           </li>
                        </ul>
                     </div>
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
