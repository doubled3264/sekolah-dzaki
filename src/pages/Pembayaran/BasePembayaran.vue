<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _, { keys } from 'lodash'
import VueMultiSelect from 'vue-multiselect'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'

const store = useStore()

const multiSelect = ref({
   value: '',
   options: [],
})
const componentToShow = ref({
   siswaSearch: true,
   siswaSidebar: false,
})

/**
 * to set active class for sidebar item
 */
function setActivePage() {
   store.commit('sidebar/setActivePage', 'pembayaran')
}

/**
 * fetch data siswa from db and assign to multiSelect
 */
async function fetchSiswaForMultiSelect() {
   await store.dispatch('siswa/getAllSimple', {
      only: ['id', 'no_induk', 'nama'],
   })
   multiSelect.value.options = store.getters['siswa/getAllSimple']
}

function customMultiSelectLabel({ no_induk, nama }) {
   return `${no_induk} - ${nama}`
}

/**
 * show iuran siswa sidebar
 * @param {string} idSiswa
 */
function showSiswaSidebar(siswaId) {
   toggleShowComponent('siswaSidebar')
}

function toggleShowComponent(name) {
   _.forEach(componentToShow.value, (item, key) => {
      componentToShow.value[key] = false
   })
   componentToShow.value[name] = true
}
// -------------- cyclehook --------------
watch(
   () => multiSelect.value.value,
   (value) => {
      if (value != null) {
         showSiswaSidebar(value.id)
         multiSelect.value.value = null
      }
   }
)
onMounted(() => {
   setActivePage()
   fetchSiswaForMultiSelect()
})
</script>
<template>
   <Sidebar />
   <div class="content">
      <div class="wrapper">
         <CustomHeader>
            <template v-slot:right-nav>
               <CustomButton
                  title="cari data siswa"
                  variant="solid"
                  color="verdigris"
                  size="md"
                  @button-action="toggleShowComponent('siswaSearch')"
               />
            </template>
         </CustomHeader>
         <div class="content__body" v-if="componentToShow.siswaSearch">
            <div class="custom-card">
               <div class="custom-card__header">
                  <div class="custom-card__title">
                     <h4>cari data siswa</h4>
                  </div>
                  <div class="custom-card__body">
                     <VueMultiSelect
                        v-model="multiSelect.value"
                        :options="multiSelect.options"
                        :custom-label="customMultiSelectLabel"
                        placeholder="Masukan no induk atau nama siswa"
                     >
                     </VueMultiSelect>
                  </div>
               </div>
            </div>
         </div>
         <div class="content__body" v-if="componentToShow.siswaSidebar">
            sidebar siswa
         </div>
      </div>
   </div>
</template>
