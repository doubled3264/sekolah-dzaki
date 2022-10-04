<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import VueMultiSelect from 'vue-multiselect'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import SidebarPembayaran from './SidebarPembayaran.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import Tagihan from './Tagihan.vue'
import Riwayat from './Riwayat.vue'
import Catatan from './Catatan.vue'

const store = useStore()
const siswaId = ref('')
const multiSelect = ref({
   value: '',
   options: [],
})
/**
 * @type {Object}
 */
const switchComponent = ref({
   searchBox: true,
   pembayaranContent: false,
})

/** @type {Object}  */
const pembayaranComponent = ref({
   tagihan: false,
   riwayat: false,
   catatan: true,
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
async function fetctSiswaSingle() {
   await store.dispatch('siswa/getSingle', siswaId.value)
}
function customMultiSelectLabel({ no_induk, nama }) {
   return `${no_induk} - ${nama}`
}

/**
 * show iuran siswa sidebar
 * @param {string} siswa
 */
function showSiswaSidebar(siswa) {
   siswaId.value = siswa.id
   toggleSwitchComponent('pembayaranContent')
}

/**
 * toggle component
 * @param {string} name searchBox | pembayaranComponent
 */
function toggleSwitchComponent(name) {
   _.forEach(switchComponent.value, (item, key) => {
      switchComponent.value[key] = false
   })
   switchComponent.value[name] = true
}
/**
 * toggle component inside pembayaran content
 * @param {string} name tagihan | riwayat | catatan
 */
function togglePembayaranComponent(name) {
   _.forEach(pembayaranComponent.value, (item, key) => {
      pembayaranComponent.value[key] = false
   })
   pembayaranComponent.value[name] = true
}
// -------------- cyclehook --------------
watch(
   () => multiSelect.value.value,
   (value) => {
      if (value != null) {
         showSiswaSidebar(value)
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
                  size="sm"
                  @button-action="toggleSwitchComponent('searchBox')"
               />
            </template>
         </CustomHeader>
         <div class="content__body" v-if="switchComponent.searchBox">
            <div class="pembayaran__search">
               <div class="custom-card">
                  <div class="custom-card__header">
                     <div class="custom-card__title">
                        <h4>cari data siswa</h4>
                     </div>
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
                  <div class="custom-card__footer"></div>
               </div>
            </div>
         </div>
         <div
            class="content__body pembayaran gap-4"
            v-if="switchComponent.pembayaranContent"
         >
            <SidebarPembayaran
               @toggle-menu="togglePembayaranComponent"
               :siswa-id="siswaId"
               :sidebar-item-active="pembayaranComponent"
            />
            <Tagihan v-if="pembayaranComponent.tagihan" :id_siswa="siswaId" />
            <Riwayat v-if="pembayaranComponent.riwayat" />
            <Catatan v-if="pembayaranComponent.catatan" :id_siswa="siswaId" />
         </div>
      </div>
   </div>
</template>
