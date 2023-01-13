<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { parse, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { pencil, trash } from '../../utils/svg-vars'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import CustomThreeDotOptionsList from '../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../components/CustomThreeDotOpions/OptionsItem.vue'
import Spinner from '../../components/modal/Spinner.vue'

const store = useStore()
const route = useRoute()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
  parentItem: String,
  childItem: String,
})
/** @type {Object} content head value */
const contentHeadItem = [
  { title: 'artikel', path: '#' },
  { title: 'daftar artikel', path: '/artikel' },
  { title: 'detail artikel', path: '' },
]
const spinnerState = ref(false)
const mainMenuState = ref(false)
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
  return `http://localhost:3000/files/article/${article.value.id}/${article.value.thumbnail}`
})
const getContentImage = computed(() => {
  return (value) => {
    return `http://localhost:3000/files/article/${article.value.id}/${value}`
  }
})
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="contentHeadItem" />
      <div class="content__body">
        <div class="card article-detail">
          <div class="card__head">
            <div class="card__title">
              <h3>detail artikel</h3>
            </div>
            <div class="card__nav article-detail" @mouseenter="mainMenuState = !mainMenuState"
              @mouseleave="mainMenuState = !mainMenuState">
              <CustomThreeDotOptionsList :is-show="mainMenuState">
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="addNewText">
                    <CustomIcon :svg-icon="pencil" />
                    <p>edit artikel</p>
                  </div>
                </CustomThreeDotOptionsItem>
                <CustomThreeDotOptionsItem>
                  <div class="flex gap-4" @click="toggleModal('imageEditor')">
                    <CustomIcon :svg-icon="trash" />
                    <p>hapus artikel</p>
                  </div>
                </CustomThreeDotOptionsItem>
              </CustomThreeDotOptionsList>
            </div>
          </div>
          <div class="card__body">
            <div :style="{ maxHeight: availHeight + 'px' }" class="article-detail__wrapper">
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
                <img crossorigin="anonymous" :src="getThumbnail" alt="" />
              </div>
              <ul class="article-detail__list">
                <li v-for="(item, index) in article.ArticleDetails" class="article-detail__item">
                  <div v-if="item.type == 'text'" class="text-content" v-html="item.content"></div>
                  <div else class="image-content">
                    <div class="image-wrapper">
                      <img crossorigin="anonymous" :src="getContentImage(item.content)" alt="" />
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
  <Teleport to="#modal">
    <CustomModalOverlay v-if="spinnerState">
      <Spinner :is-active="spinnerState" />
    </CustomModalOverlay>
  </Teleport>
</template>
