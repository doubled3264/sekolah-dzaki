<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import CustomInput from '../../components/CustomInput.vue'

const emit = defineEmits(['setPembayaran'])
const props = defineProps({
   tagihan: {
      type: Object,
      default: {
         id: '',
         nama: '',
         keterangan: '',
         nominal: '',
         tahun_ajaran: '',
      },
   },
})

const checked = ref(true)
const pembayaran = ref({
   id: '',
   bayar: false,
   nominal: '',
   cicil: false,
   nominal_cicilan: '',
})

function inputEvent(event) {
   if (event.target.name == 'bayar') {
      pembayaran.value.bayar = !pembayaran.value.bayar
   } else if ((event.target.name = 'cicil')) {
      pembayaran.value.cicil = !pembayaran.value.cicil
   }
}

function cekPembayaranValue() {
   console.log('bayar : ' + pembayaran.value.bayar)
   console.log('cicil : ' + pembayaran.value.cicil)
   console.log('nominal cicilan : ' + pembayaran.value.nominal_cicilan)
}

function setPembayaran() {
   emit('setPembayaran', pembayaran.value)
}

const getNominalIDR = computed(() => {
   let formatter = new Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      minimumFractionDigits: 0,
   })
   return formatter.format(props.tagihan.nominal)
})

watch(
   () => pembayaran.value.nominal_cicilan,
   (value) => {
      /* if (value != '') { */
      /*    pembayaran.value.bayar = true */
      /*    setPembayaran() */
      /* } else { */
      /*    pembayaran.value.bayar = false */
      /* } */
      /* const numberTest = new RegExp('^[0-9]+$') */
      /* console.log(numberTest.test(value)) */
      if (new RegExp('^[0-9]+$').test(value)) {
         pembayaran.value.bayar = true
         setPembayaran()
      } else {
         pembayaran.value.bayar = false
      }
   }
)

watch(
   () => pembayaran.value.bayar,
   (value) => {
      if (value && pembayaran.value.nominal_cicilan == '') {
         pembayaran.value.cicil = false
      }
      console.log(value)
      setPembayaran()
   }
)

watch(
   () => pembayaran.value.cicil,
   (value) => {
      if (value) {
         pembayaran.value.bayar = false
      }
   }
)

onMounted(() => {
   pembayaran.value.id = props.tagihan.id
   pembayaran.value.nominal = props.tagihan.nominal
})
</script>

<template>
   <div class="pembayaran__tagihan__item">
      <div class="pembayaran__tagihan__item__checkbox">
         <input
            type="checkbox"
            name="bayar"
            @click="inputEvent"
            :checked="pembayaran.bayar"
         />
      </div>
      <div class="pembayaran__tagihan__item__detail">
         <div class="pembayaran__tagihan__item__keterangan">
            <p>{{ tagihan.nama }}</p>
            <p>{{ getNominalIDR }}</p>
         </div>
         <div class="pembayaran__tagihan__item__checkbox-cicilan">
            <div class="input-field w-2/3">
               <label>cicil pembayaran</label>
               <input
                  type="checkbox"
                  @click="inputEvent"
                  :checked="pembayaran.cicil"
               />
            </div>
            <div class="input-field w-1/3">
               <CustomInput
                  v-if="pembayaran.cicil"
                  type="number"
                  placeholder="masukan nominal"
                  v-model:input-value="pembayaran.nominal_cicilan"
               />
            </div>
         </div>
      </div>
   </div>
</template>
