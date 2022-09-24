<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import VueMultiselect from 'vue-multiselect'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'
import CustomOverlay from '../../components/CustomOverlay.vue'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomModal from '../../components/CustomModal.vue'
import CustomRadioButton from '../../components/CustomRadioButton.vue'
import CustomInput from '../../components/CustomInput.vue'

const store = useStore()
const overlayIsActive = ref(false)
let iuranKey = null
const iuranOption = ref('0')
const iuran = ref({
  nama: '',
  keterangan: '',
  nominal: '',
  interval: '',
  interval_detail: '',
})
const errorState = ref({
  nama: {
    isError: true,
    message: '',
  },
  nominal: {
    isError: true,
    message: '',
  },
  interval: {
    isError: true,
    message: '',
  },
})
const multiSelect = reactive({
  value: '',
  options: [],
})
const iuranInklusiTable = ref({
  columns: [],
  rows: [],
})
function activeModal(active) {
  if (active) {
    overlayIsActive.value = true
  } else if (!active) {
    overlayIsActive.value = false
    clearForm()
    iuranOption.value = '0'
  }
}
function clearForm() { }

const getWindowSize = computed(() => {
  if (store.getters['windowProp/getWidth'] >= 1024) {
    return 'sm'
  }
  return 'lg'
})

async function fetchIuranList(
await multiSelect.options   
) { }

onMounted(() => {
  store.commit('sidebar/setActivePage', 'iuran inklusi')
  iuranKey = _.keys(iuran.value)
})
</script>
<template>
  <div class="content">
    <div class="wrapper">
      <CustomHeader />
      <div class="table-data">
        <div class="table-data__title">
          <h4>data iuran inklusi</h4>
          <CustomButton title="tambah data" color="primary" @button-action="activeModal(true)" :size="getWindowSize" />
        </div>
      </div>
    </div>
    <CustomOverlay v-if="overlayIsActive" @click="activeModal(false)">
      <CustomModal>
        <template v-slot:title>
          <h4>tambah data iuran inklusi</h4>
        </template>
        <template v-slot:body> </template>
      </CustomModal>
    </CustomOverlay>
  </div>
  <Sidebar />
</template>
