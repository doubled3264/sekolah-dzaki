<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import TagihanItem from './TagihanItem.vue'
import { setToIDR } from '../../utils/formater'
import CustomDoubleSwitch from '../../components/CustomDoubleSwitch.vue'
import CustomInput from '../../components/CustomInput.vue'
import CustomButton from '../../components/CustomButton.vue'

const store = useStore()
const props = defineProps({ id_siswa: { type: String } })

const tagihanList = ref([])
const pembayaranList = ref([])
const metodePembayaran = ref({
   metode: 0,
   catatan: '',
   totalTagihan: 0,
})
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
}

function updatePembayaranList(pembayaran) {
   let indexToUpdate = _.findIndex(pembayaranList.value, {
      id: pembayaran.id,
   })
   console.log('sebelum')
   _.forEach(pembayaranList.value, (item) => {
      console.log(item.id)
      console.log(item.bayar)
      console.log(item.cicil)
      console.log(item.nominal)
      console.log(item.nominal_cicilan)
   })
   _.set(pembayaranList.value, indexToUpdate, pembayaran)
   console.log('sesudah')
   _.forEach(pembayaranList.value, (item) => {
      console.log(item.id)
      console.log(item.bayar)
      console.log(item.cicil)
      console.log(item.nominal)
      console.log(item.nominal_cicilan)
   })
}

const getTotalPembayaran = computed(() => {
   return (jenis) => {
      let total = 0
      _.forEach(pembayaranList.value, (item) => {
         if (jenis == 'kontan') {
            if (!item.cicil) {
               total += Number(item.nominal)
            }
         } else if (jenis == 'cicil') {
            if (item.cicil) {
               total += Number(item.nominal_cicilan)
            }
         }
      })
      return setToIDR(total)
   }
})
const getBanyakPembayaran = computed(() => {
   return (jenis) => {
      let count = 0
      _.forEach(pembayaranList.value, (item) => {
         if (jenis == 'kontan') {
            if (!item.cicil) {
               count++
            }
         } else if (jenis == 'cicil') {
            if (item.cicil) {
               count++
            }
         }
      })
      return count
   }
})

const getGrandTotalPembayaran = computed(() => {
   let total = 0
   _.forEach(pembayaranList.value, (item) => {
      if (!item.cicil) {
         total += Number(item.nominal)
      } else if (item.cicil) {
         total += Number(item.nominal_cicilan)
      }
   })
   metodePembayaran.value.totalTagihan = total
   return setToIDR(total)
})

function prosesPembayaran() {
   let pembayaran = {
      pembayaran: pembayaranList.value,
      metodePembayaran: metodePembayaran.value,
   }
   store.dispatch('transaksi/pay', pembayaran)
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
               <TagihanItem
                  v-for="(item, index) in tagihanList"
                  :key="index + 1"
                  :tagihan="item"
                  @set-pembayaran="setPembayaranList"
                  @update-pembayaran="updatePembayaranList"
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
         <div class="custom-card__body">
            <div class="pembayaran__ringkasan-tagihan__list">
               <div
                  class="pembayaran__ringkasan-tagihan__item"
                  v-if="getBanyakPembayaran('kontan') != 0"
               >
                  <p>iuran kontan ({{ getBanyakPembayaran('kontan') }})</p>
                  <p>{{ getTotalPembayaran('kontan') }}</p>
               </div>
               <div
                  class="pembayaran__ringkasan-tagihan__item"
                  v-if="getBanyakPembayaran('cicil') != 0"
               >
                  <p>iuran dicicil ({{ getBanyakPembayaran('cicil') }})</p>
                  <p>{{ getTotalPembayaran('cicil') }}</p>
               </div>
            </div>
         </div>
         <div
            class="pembayaran__ringkasan-tagihan__total pembayaran__ringkasan-tagihan__item"
            v-if="pembayaranList.length != 0"
         >
            <p>total</p>
            <p>{{ getGrandTotalPembayaran }}</p>
         </div>
         <div
            class="pembayaran__ringkasan-tagihan__metode-pembayaran"
            v-if="pembayaranList.length != 0"
         >
            <div class="row justify-between">
               <p class="text-verdigris">pembayaran</p>
               <CustomDoubleSwitch
                  :item="['tunai', 'transfer']"
                  v-model:input-value="metodePembayaran.metode"
               />
            </div>
            <div class="row">
               <div class="input-field w-full mb-3">
                  <CustomInput
                     type="text"
                     placeholder="Catatan"
                     v-model:input-value="metodePembayaran.catatan"
                  />
               </div>
            </div>
            <CustomButton
               title="proses pembayaran"
               color="verdigris"
               block
               @button-action="prosesPembayaran"
            />
         </div>
      </div>
   </div>
</template>
