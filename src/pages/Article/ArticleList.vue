<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { VueGoodTable } from 'vue-good-table-next'
/* import CustomButton from '../../components/CustomButton.vue' */
import { textAdd } from '../../utils/svg-vars'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import ContentHead from '../../components/Content/ContentHead.vue'
import Spinner from '../../components/modal/Spinner.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomKebabMenuList from '../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../components/CustomKebabMenu/CustomKebabMenuItem.vue'

const store = useStore()
const router = useRouter()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
   parentItem: String,
   childItem: String,
})
/** @type {object} vue good table props */
const tableData = ref({
   columns: [],
   rows: [],
})
/** @type {Object} content head value */
const contentHeadItem = [
   { title: 'artikel', path: '#' },
   { title: 'daftar artikel', path: '' },
]
const spinnerState = ref(false)
const cardMenu = ref(false)
onMounted(() => {
  document.title = "Daftar Artikel"
   spinnerState.value = true
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   generateVueTable()
   fetchArticle()
   spinnerState.value = false
})
/**
 * get vuetable column props on store
 * @param {}
 */
function generateVueTable() {
   tableData.value.columns = store.getters['vueTable/getColumn']('article')
   /* setColumnFn() */
}
async function fetchArticle() {
   await store.dispatch('article/getSimple')
   tableData.value.rows = store.getters['article/getSimple']
}

function toggleCardMenu() {
   cardMenu.value = !cardMenu.value
}

function selectRow(param) {
   const { id } = param.row
   router.push({
      name: 'article detail',
      params: { id: id },
   })
}

function goToAddForm() {
   router.push({
      path: 'artikel/tambah-data',
   })
}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <ContentHead :items="contentHeadItem"> </ContentHead>
         <div class="content__body">
            <div class="article-list__wrapper">
               <div class="card">
                  <div class="card__head">
                     <div class="card__title">daftar artikel</div>
                     <div
                        class="card__nav"
                        @mouseenter="toggleCardMenu"
                        @mouseleave="toggleCardMenu"
                     >
                        <CustomKebabMenuList :is-show="cardMenu">
                           <CustomKebabMenuItem @on-click="goToAddForm">
                              <CustomIcon :svg-icon="textAdd" />
                              <p>tambah artikel</p>
                           </CustomKebabMenuItem>
                        </CustomKebabMenuList>
                     </div>
                  </div>
                  <div class="card__body">
                     <vue-good-table
                        v-if="
                           !tableData.columns.length == 0 &&
                           !tableData.rows.length == 0
                        "
                        :columns="tableData.columns"
                        :rows="tableData.rows"
                        styleClass="vgt-table striped"
                        v-on:row-dblclick="selectRow"
                     />
                     <p v-else class="empty-list">Artikel tidak tersedia</p>
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
