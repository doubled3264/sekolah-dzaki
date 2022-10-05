<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { VueGoodTable } from 'vue-good-table-next'

const store = useStore()
const props = defineProps({
   siswaId: { type: String },
   maman: { type: String },
})
const tableData = ref({
   columns: [],
   rows: [],
})

onMounted(() => {
   generateVueTable()
   fetchRiwayatPembayaran()
})

function generateVueTable() {
   tableData.value.columns =
      store.getters['vueTable/getColumn']('riwayat-pembayaran')
}
async function fetchRiwayatPembayaran() {
   await store.dispatch('pembayaran/getAllById', { id_siswa: props.maman })
   tableData.value.rows = store.getters['pembayaran/getRiwayat']
}
</script>
<template>
   <div class="pembayaran__riwayat">
      <div class="custom-card">
         <div class="custom-card__header">
            <div class="custom-card__title">
               <h4>riwayat pembayaran</h4>
            </div>
         </div>
         <div class="custom-card__body">
            <div class="custom-table__wrapper">
               <VueGoodTable
                  v-if="tableData.columns.length != 0"
                  :columns="tableData.columns"
                  :rows="tableData.rows"
               />
            </div>
         </div>
      </div>
   </div>
</template>
