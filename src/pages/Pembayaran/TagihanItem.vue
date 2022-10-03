<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import CustomInput from '../../components/CustomInput.vue'
import { setToIDR } from '../../utils/formater'

const emit = defineEmits(['setPembayaran', 'updatePembayaran'])
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

function bayarEvent(event) {
   if (event.target.checked) {
      pembayaran.value.bayar = true
      setPembayaran()
   } else {
      pembayaran.value.bayar = false
      pembayaran.value.cicil = false
      setPembayaran()
   }
}

function cicilEvent(event) {
   /* cicilan cheked */
   if (event.target.checked) {
      /* if bayar not chekced */
      pembayaran.value.cicil = true
      if (!pembayaran.value.bayar) {
         pembayaran.value.bayar = true
         setPembayaran()
      }
      updatePembayaran()
   } else {
      pembayaran.value.cicil = false
      updatePembayaran()
      clearCicilanInput()
   }
}

function clearCicilanInput() {
   pembayaran.value.nominal_cicilan = ''
}

function cekPembayaranValue() {
   console.log('bayar : ' + pembayaran.value.bayar)
   console.log('cicil : ' + pembayaran.value.cicil)
   console.log('nominal cicilan : ' + pembayaran.value.nominal_cicilan)
}

function setPembayaran() {
   emit('setPembayaran', pembayaran.value)
}

function updatePembayaran() {
   emit('updatePembayaran', pembayaran.value)
}

const getNominalIDR = computed(() => {
   return setToIDR(props.tagihan.nominal)
})
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
            @click="bayarEvent"
            :checked="pembayaran.bayar"
         />
      </div>
      <div class="pembayaran__tagihan__item__detail">
         <div class="pembayaran__tagihan__item__keterangan">
            <p>{{ tagihan.nama }}</p>
            <p>{{ getNominalIDR }}</p>
         </div>
         <div class="pembayaran__tagihan__item__checkbox-cicilan">
            <div class="input-field w-3/5">
               <label>cicil pembayaran</label>
               <input
                  type="checkbox"
                  @click="cicilEvent"
                  :checked="pembayaran.cicil"
               />
            </div>
            <div class="input-field w-2/5">
               <CustomInput
                  v-if="pembayaran.cicil"
                  type="number"
                  placeholder="masukan nominal"
                  v-model:input-value="pembayaran.nominal_cicilan"
                  @input="updatePembayaran"
               />
            </div>
         </div>
      </div>
   </div>
</template>
