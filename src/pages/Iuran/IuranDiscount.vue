<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowRight } from '../../utils/svg-var'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
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
               <span>potongan iuran</span>
            </div>
            <div class="content__title">
               <h3>daftar potongan iuran</h3>
            </div>
         </div>
      </div>
   </div>
</template>
