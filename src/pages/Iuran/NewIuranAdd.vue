<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { iuranScheme } from '../../utils/validation/iuran.scheme'
import { arrowRight } from '../../utils/svg-var'
import CustomIcon from '../../components/CustomIcon.vue'
import NewCustomInput from '../../components/NewCustomInput.vue'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
/** @type {Object} iuran */
const iuran = ref({
    nama: '',
    nominal: '',
    keterangan_interval: ''
  })
/** @type {Object} error state for each input */
const errorState = ref({
   nama: {
      isError: true,
      message: '',
   },
   nominal: {
      isError: true,
      message: '',
   },
   keterangan_interval: {
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
 * validate input when some event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
   console.log(field)
   await iuranScheme
      .validateAt(field, iuran.value)
      .then((valid) => {
         errorState.value[field].isError = false
         console.log(valid)
      })
      .catch((err) => {
         errorState.value[field].isError = true
         errorState.value[field].message = err.message
         console.log(err)
      })
}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <div class="content__head">
            <div class="content__path">
               <span>iuran</span>
               <CustomIcon :svg-icon="arrowRight" width="10" />
               <span>tambah data iuran baru</span>
            </div>
            <div class="content__title">
               <h3>tambah data iuran baru</h3>
            </div>
         </div>
         <div class="content__body">
            <div class="iuran-add__content">
               <div class="iuran-add__data card">
                  <div class="card__head">
                     <div class="card__title">formulir data iuran</div>
                  </div>
                  <div class="card__body">
                     <form>
                        <NewCustomInput
                           type="text"
                           label="nama"
                           placeholder="Masukan nama iuran.."
                           :error-state="errorState.nama"
                           v-model:input-value="iuran.nama"
                           @validate-input="validateInput('nama')"
                        />
                        <NewCustomInput
                           type="number"
                           label="nominal"
                           placeholder="Masukan nominal iuran.."
                           :error-state="errorState.nominal"
                           v-model:input-value="iuran.nominal"
                           @validate-input="validateInput('nominal')"
                        />
                        <NewCustomInput
                           type="text"
                           label="keterangan interval"
                           placeholder="Masukan keterangan iuran.."
                           :error-state="errorState.keterangan_interval"
                           v-model:input-value="iuran.keterangan_interval"
                           @validate-input="validateInput('keterangan_interval')"
                        />
                     </form>
                  </div>
               </div>
               <div class="iuran-add__rincian card">
                  <div class="card__head">
                     <div class="card__title">formulir rincian iuran</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
