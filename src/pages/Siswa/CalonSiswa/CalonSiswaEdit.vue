<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { calonSiswaSchema } from '../../../utils/validation/calon-siswa.schema'
import CustomIcon from '../../../components/CustomIcon.vue'
import { arrowRight } from '../../../utils/svg-var'
import CustomInput from '../../../components/form/CustomInput.vue'
import CustomTextArea from '../../../components/form/CustomTextArea.vue'
import CustomSelectBox from '../../../components/form/CustomSelectBox.vue'

const props = defineProps({
   parentItem: String,
   childItem: String,
})
const store = useStore()
const route = useRoute()
const calonSiswaId = ref(null)
const calonSiswa = ref({})
const errorState = ref({
   nama: {
      isError: true,
      message: '',
   },
   jenis_kelamin: {
      isError: true,
      message: '',
   },
   tempat_lahir: {
      isError: true,
      message: '',
   },
   tanggal_lahir: {
      isError: true,
      message: '',
   },
   nama_ayah: {
      isError: true,
      message: '',
   },
   nama_ibu: {
      isError: true,
      message: '',
   },
   alamat: {
      isError: true,
      message: '',
   },
   no_telepon: {
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
   calonSiswaId.value = route.params.id
   fetchCalonSiswa()
})
/**
 * fetch single calon siswa data on DB and get from store
 */
async function fetchCalonSiswa() {
   await store.dispatch('calonSiswa/getSingle', calonSiswaId.value)
   calonSiswa.value = store.getters['calonSiswa/getSingle']
}

/**
 * validate input when event triggered
 * @param {string} siswa object key
 */
async function validateInput(field) {
   console.log(calonSiswa.value[field])
   await calonSiswaSchema
      .validateAt(field, calonSiswa.value)
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
               <span>siswa</span>
               <CustomIcon :svg-icon="arrowRight" width="10" />
               <span class="cursor-pointer" @click="$router.go(-1)"
                  >calon siswa</span
               >
               <CustomIcon :svg-icon="arrowRight" width="10" />
               <span>ubah</span>
            </div>
            <div class="content__title">
               <h3>ubah data calon siswa</h3>
            </div>
         </div>
         <div class="content__body">
            <div class="card edit-calon-siswa">
               <div class="card__head">
                  <div class="card__title">formulir ubah data calon siswa</div>
               </div>
               <div class="card__body">
                  <form>
                     <div>
                        <CustomInput
                           label="nama"
                           placeholder="Masukan nama calon siswa.."
                           v-model:input-value="calonSiswa.nama"
                           :errorState="errorState.nama"
                           @validate-input="validateInput('nama')"
                        />
                     </div>
                     <div class="flex gap-2">
                        <div class="w-1/3">
                           <CustomSelectBox
                              label="jenis kelamin"
                              placeholder="Pilih jenis kelamin"
                              :options="['laki-laki', 'perempuan']"
                              v-model:input-value="calonSiswa.jenis_kelamin"
                              :errorState="errorState.jenis_kelamin"
                              @validate-input="validateInput('jenis_kelamin')"
                           />
                        </div>
                        <div class="w-1/3">
                           <CustomInput
                              label="tempat lahir"
                              placeholder="Masukan tempat lahir"
                              v-model:input-value="calonSiswa.tempat_lahir"
                              :errorState="errorState.tempat_lahir"
                              @validate-input="validateInput('tempat_lahir')"
                           />
                        </div>
                     </div>
                     <div>
                        <CustomTextArea
                           label="alamat"
                           placeholder="Masukan alamat.."
                           v-model:input-value="calonSiswa.alamat"
                           :errorState="errorState.alamat"
                           @validate-input="validateInput('alamat')"
                        />
                     </div>
                     <div class="flex gap-2">
                        <div class="w-1/2">
                           <CustomInput
                              label="nama ayah"
                              placeholder="Masukan nama ayah.."
                              v-model:input-value="calonSiswa.nama_ayah"
                              :errorState="errorState.nama_ayah"
                              @validate-input="validateInput('nama_ayah')"
                           />
                        </div>
                        <div class="w-1/2">
                           <CustomInput
                              label="nama ibu"
                              placeholder="Masukan nama ibu.."
                              v-model:input-value="calonSiswa.nama_ibu"
                              :errorState="errorState.nama_ibu"
                              @validate-input="validateInput('nama_ibu')"
                           />
                        </div>
                     </div>
                     <div>
                        <CustomInput
                           label="no telepon"
                           placeholder="Masukan no telepon.."
                           v-model:input-value="calonSiswa.no_telepon"
                           :errorState="errorState.no_telepon"
                           @validate-input="validateInput('no_telepon')"
                        />
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
