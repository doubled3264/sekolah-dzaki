<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import TagihanItem from './TagihanItem.vue'

const store = useStore()
const props = defineProps({ id_siswa: { type: String } })

const tagihanList = ref([])
const pembayaranList = ref([])
async function fetchTagihan() {
  await store.dispatch('pembayaran/getSpecific', { id_siswa: props.id_siswa })
  tagihanList.value = store.getters['pembayaran/getTagihan']
  console.log(tagihanList.value)
}

function setPembayaranList(pembayaran) {
  if (pembayaran.bayar) {
    console.log("pembayaran + ")
  } else {
    console.log("pembayaran - ")
  }
}

onMounted(() => {
  fetchTagihan()
})
</script>

<template>
  <div class="pembayaran__tagihan">
    <div class="custom-card">

      <div class="custom-card__header">
        <div class="custom-card__title">
          <h4>daftar tagihan</h4>
        </div>
      </div>
      <div class="custom-card__body">
        <div class="pembayaran__tagihan__list">
          <TagihanItem v-for="(item, index) in tagihanList" :key="index + 1" :tagihan="item"
            @set-pembayaran="setPembayaranList" />
        </div>
      </div>
    </div>
  </div>
  <div class="pembayaran__ringkasan-tagihan">
    <div class="custom-card">
      <div class="custom-card__header">
        <div class="custom-card__title">
          <h4>ringkasan tagihan</h4>
        </div>
      </div>
      <div class="custom-card__body">

      </div>
    </div>
  </div>
</template>
