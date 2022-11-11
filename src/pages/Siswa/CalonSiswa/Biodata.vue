<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CustomIcon from '../../../components/CustomIcon.vue'
import { arrowRight } from '../../../utils/svg-var'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
const route = useRoute()
const calonSiswaId = ref(null)
const calonSiswaData = ref({})
onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
  calonSiswaId.value = route.params.id
})

/**
 * fetch single calon siswa data on DB and get from store
 */
async function fetchCalonSiswa() {
  await store.dispatch('calonSiswa/getList')
  tableData.value.rows = store.getters['calonSiswa/getList']
}

function pushBack() {
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__head">
        <div class="content__path">
          <span>siswa</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span @click="$router.push({ name: 'calon siswa' })">calon siswa</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>biodata</span>
        </div>
        <div class="content__title">
          <h3>biodata calon siswa</h3>
        </div>
        <div class="content__body"></div>
      </div>
    </div>
  </div>
</template>
