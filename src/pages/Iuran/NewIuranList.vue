<script setup>
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowRight, plus } from '../../utils/svg-var'
import CustomButton from '../../components/CustomButton.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
const router = useRouter()
onMounted(() => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
})
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <div class="content__head">
            <div class="content__path">
               <span>iuran</span>
               <CustomIcon :svg-icon="arrowRight" width="10" />
               <span>daftar iuran</span>
            </div>
            <div class="content__title">
               <h3>daftar iuran</h3>
               <CustomButton
                  title="tambah data"
                  color="verdigris"
                  size="sm"
                  :start-icon="{ svgIcon: plus, width: '12' }"
                  @button-action="router.push('/iuran/tambah-data')"
               />
            </div>
         </div>
      </div>
   </div>
</template>
