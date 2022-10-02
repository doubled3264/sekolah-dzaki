<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import TagihanItem from './TagihanItem.vue'

const store = useStore()
const props = defineProps({ id_siswa: { type: String } })

const tagihanList = ref([])
const pembayaranList = ref([])
async function fetchTagihan() {
   await store.dispatch('pembayaran/getSpecific', { id_siswa: props.id_siswa })
   tagihanList.value = store.getters['pembayaran/getTagihan']
}

function setPembayaranList(pembayaran) {
   if (pembayaran.bayar) {
      pembayaranList.value.push(pembayaran)
   } else {
      let indexToRemove = _.findIndex(pembayaranList.value, {
         id: pembayaran.id,
      })
      _.pullAt(pembayaranList.value, [indexToRemove])
   }

   _.forEach(pembayaranList.value, (item) => {
      console.log(item.id)
   })
}

watch(
   () => pembayaranList.value.length,
   (value) => {
      console.log(value)
   }
)

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
               <TagihanItem
                  v-for="(item, index) in tagihanList"
                  :key="index + 1"
                  :tagihan="item"
                  @set-pembayaran="setPembayaranList"
               />
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
         <div class="custom-card__body"></div>
      </div>
   </div>
</template>
