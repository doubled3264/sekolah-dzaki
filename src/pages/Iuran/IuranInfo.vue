<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowRight } from '../../utils/svg-vars'
import CustomInfo from '../../components/form/CustomInfo.vue'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
const route = useRoute()
const iuranId = ref(null)
const iuranData = ref({})
onMounted(() => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
   iuranId.value = route.params.id
   fetchIuran()
})
/**
 * fetch single calon siswa data on DB and get from store
 */
async function fetchIuran() {
   await store.dispatch('iuran/getSingle', iuranId.value)
   iuranData.value = store.getters['iuran/getSingle']
}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <div class="content__head">
            <div class="content__path">
               <span>iuran</span>
               <CustomIcon :svg-icon="arrowRight" width="10" />
               <span @click="$router.back">daftar iuran</span>
               <CustomIcon :svg-icon="arrowRight" width="10" />
               <span>info iuran</span>
            </div>
            <div class="content__title">
               <h3>detail iuran</h3>
            </div>
         </div>
         <div class="content__body">
            <div class="flex gap-4">
               <div class="card iuran-info__left">
                  <div class="card__head">
                     <div class="card__title">info iuran</div>
                  </div>
                  <div class="card__body">
                     <div class="iuran-info__list">
                        <CustomInfo
                           label="nama"
                           :value="iuranData.nama"
                           vertical
                        />
                        <CustomInfo
                           label="interval"
                           :value="iuranData.interval"
                           vertical
                        />
                        <CustomInfo
                           label="keterangan interval"
                           :value="
                              iuranData.interval_detail
                                 ? iuranData.interval_detail
                                 : '-'
                           "
                           vertical
                        />
                     </div>
                  </div>
               </div>
               <div class="card iuran-info__right">
                  <div class="card__head">
                     <div class="card__title">rincian iuran</div>
                  </div>
                  <div class="card__body"></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
