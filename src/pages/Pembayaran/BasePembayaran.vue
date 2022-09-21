<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { VueGoodTable } from 'vue-good-table-next'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'

const store = useStore()
const overlayIsActive = ref(false)

const tableData = ref({
  columns: [
    {
      label: 'No',
      field: 'nomor',
      type: 'number',
      thClass: 'text-left !w-16',
      tdClass: 'text-left !pl-5',
    },
    {
      label: 'ID Pembayaran',
      field: 'id',
      thClass: 'text-left',
    },
    /* { */
    /*   label: 'Tanggal Lahir', */
    /*   field: 'tanggal_lahir', */
    /*   type: 'date', */
    /*   dateInputFormat: 'yyyy-MM-dd', */
    /*   dateOutputFormat: 'MMM do yy', */
    /*   thClass: 'text-left', */
    /* }, */
    {
      label: 'ID Siswa',
      field: 'id_siswa',
      thClass: 'text-left',
    },
    {
      label: 'Pembayaran',
      field: 'nama_pembayaran',
      thClass: 'text-left',
    },
    {
      label: 'Nominal',
      field: 'nominal',
      thClass: 'text-left',
    },
    {
      label: 'Status',
      field: 'status',
      thClass: 'text-left',
    },
    {
      label: 'Metode Pembayaran',
      field: 'metode_pembayaran',
      thClass: 'text-left',
    },
  ],
  rows: [
    /* { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 }, */
    /* { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 }, */
    /* { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 }, */
    /* { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 }, */
    /* { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 }, */
  ],
})
function activeModal() {
  overlayIsActive.value = !overlayIsActive.value
}
// -------------- computed --------------
const getWindowSize = computed(() => {
  if (store.getters['windowProp/getWidth'] >= 1024) {
    return 'sm'
  }
  return 'lg'
})
// -------------- cyclehook --------------
onMounted(() => {
  overlayIsActive.value = true
  store.commit('sidebar/setActivePage', 'pembayaran')
})
</script>
<template>
  <div class="content">
    <div class="wrapper">
      <CustomHeader />
      <div class="table-data">
        <div class="table-data__title">
          <h4>data pembayaran</h4>
          <CustomButton title="tambah data" color="primary" @button-action="activeModal" :size="getWindowSize"/>
        </div>
        <vue-good-table :columns="tableData.columns" :rows="tableData.rows" styleClass="vgt-table stiped" />
      </div>
    </div>
  </div>
  <Sidebar />
</template>
