<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { VueGoodTable } from 'vue-good-table-next'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomKebabMenuList from '../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../components/CustomKebabMenu/CustomKebabMenuItem.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import { textAdd } from '../../utils/svg-vars'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import CustomCopyLink from '../../components/CustomCopyLink.vue'
import { forEach } from 'lodash'

const store = useStore()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
  parentItem: String,
})
const APIURL = import.meta.env.VITE_APPURL
/** @type {object} vue good table props */
const tableData = ref({
  columns: [],
  rows: [],
})
/** @type {Object} content head value */
const contentHeadItem = [
  { title: 'admin', path: '#' },
  { title: 'daftar admin', path: '' },
]
const cardMenu = ref(false)
const modalRegistrationLink = ref(false)
const invitationUrl = ref([])

onMounted(async () => {
  document.title = 'Daftar Admin'
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  generateVueTable()
  await fetchAdmin()
  await fetchInvitation()
})

/**
 * get vuetable column props on store
 * @param {}
 */
function generateVueTable() {
  tableData.value.columns = store.getters['vueTable/getColumn']('admin')
}

async function fetchAdmin() {
  await store.dispatch('admin/getAll')
  tableData.value.rows = store.getters['admin/getAdmin']
}

async function fetchInvitation() {
  await store.dispatch('invitation/get')
  forEach(store.getters['invitation/get'], (item, index) => {
    invitationUrl.value.push({
      link: `${APIURL}/registration/${item.code}`,
    })
    if (item.description == 'super') {
      invitationUrl.value[index].label = 'pendaftaran super admin'
    } else if (item.description == 'admin') {
      invitationUrl.value[index].label = 'admin'
    } else if (item.description == 'content writer') {
      invitationUrl.value[index].label = 'content writer'
    }
  })
}

function toggleCardMenu() {
  cardMenu.value = !cardMenu.value
}

function toggleModalRegistrationLink() {
  modalRegistrationLink.value = !modalRegistrationLink.value
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <ContentHead :items="contentHeadItem" />
      <div class="content__body">
        <div class="admin-list__wrapper">
          <div class="card">
            <div class="card__head">
              <div class="card__title">
                <h3>daftar admin</h3>
              </div>
              <div class="card__nav" @mouseenter="toggleCardMenu" @mouseleave="toggleCardMenu">
                <CustomKebabMenuList :is-show="cardMenu">
                  <CustomKebabMenuItem @on-click="toggleModalRegistrationLink">
                    <CustomIcon :svg-icon="textAdd" />
                    <p>tambah admin</p>
                  </CustomKebabMenuItem>
                </CustomKebabMenuList>
              </div>
            </div>
            <div class="card__body">
              <vue-good-table v-if="
  !tableData.columns.length == 0 &&
  !tableData.rows.length == 0
" :columns="tableData.columns" :rows="tableData.rows" styleClass="vgt-table striped" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <CustomModalOverlay v-show="modalRegistrationLink" @close-modal="toggleModalRegistrationLink">
      <div class="admin-list__registration card" @click.stop>
        <div class="card__head">
          <div class="card__title">
            <h3>Link Registrasi</h3>
          </div>
        </div>
        <div class="card__body">
          <CustomCopyLink v-for="(item, index) in invitationUrl" :key="index + 1" :label="item.label"
            :invitation-link="item.link" />
        </div>
      </div>
    </CustomModalOverlay>
  </Teleport>
</template>
