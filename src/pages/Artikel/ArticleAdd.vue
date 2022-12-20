<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { arrowRight } from '../../utils/svg-var'
import { artikelSchema } from '../../utils/validation/artikel.schema'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomInput from '../../components/form/CustomInput.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import ArticleAddItem from '../../components/modal/ArticleAddItem.vue'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
const artikel = ref({
   title: '',
})

const errorState = ref({
   title: {
      isError: true,
      message: '',
   },
})
onMounted(() => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
})
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
                     <CustomButton
                        size="sm"
                        color="verdigris"
                        title="tambah item"
                     ></CustomButton>
                     <CustomButton
                        size="sm"
                        color="verdigris"
                        title="simpan"
                     ></CustomButton>
                  </div>
               </div>
               <div class="card__body">
                  <form>
                     <div>
                        <CustomInput
                           type="text"
                           label="Judul"
                           placeholder="Masukan judul artikel.."
                           v-model:input-value="artikel.nama"
                           :error-state="errorState.nama"
                           @validate-input="validateInput('title')"
                        />
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
   <teleport to="#modal">
      <CustomModalOverlay>
         <ArticleAddItem />
      </CustomModalOverlay>
   </teleport>
</template>
