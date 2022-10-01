<script setup>
import { onMounted, ref, watch } from 'vue'
import CustomInput from '../../components/CustomInput.vue';

const emit = defineEmits(['setPembayaran'])
const props = defineProps({
  tagihan: {
    type: Object,
    default: {
      id: '',
      nama: '',
      keterangan: '',
      nominal: '',
      tahun_ajaran: ''
    },
  },
})

const checked = ref(true)
const pembayaran = ref({
  id: '',
  bayar: false,
  nominal: '',
  cicil: false,
  nominal_cicilan: ''
})

function inputEvent(event) {
  if (event.target.name == 'bayar') {
    pembayaran.value.bayar = !pembayaran.value.bayar
    pembayaran.value.cicil = false
  } else if (event.target.name == 'cicilan') {
    pembayaran.value.cicil = !pembayaran.value.cicil
    if (!event.target.checked) {
      pembayaran.value.nominal_cicilan = ''

    } else {
      pembayaran.value.bayar = false;
    }
  }
}

function cekPembayaranValue() {
  console.log("bayar : " + pembayaran.value.bayar)
  console.log("cicil : " + pembayaran.value.cicil)
  console.log("nominal cicilan : " + pembayaran.value.nominal_cicilan)
}

function setPembayaran() {
  emit('setPembayaran', pembayaran.value)
}

watch(() => pembayaran.value.nominal_cicilan, (value) => {
  if (value != '') {
    pembayaran.value.bayar = true
    setPembayaran()
  }
  else {
    pembayaran.value.bayar = false
  }
  const numberTest = new RegExp('^[0-9]+$')
  console.log(numberTest.test(value))
})

watch(() => pembayaran.value.bayar, (value) => {
  if (value) {
    setPembayaran()
  }
})

onMounted(() => {
  pembayaran.value.id = props.id
  pembayaran.value.nominal = props.nominal
})
</script>

<template>
  <div class="pembayaran__tagihan__item">
    <div class="pembayaran__tagihan__item__checkbox">
      <input type="checkbox" name="bayar" @click="inputEvent" :checked="pembayaran.bayar">
    </div>
    <div class="pembayaran__tagihan__item__detail">
      <div class="pembayaran__tagihan__item__keterangan">
        <p>{{ tagihan.nama }}</p>
        <p>{{ tagihan.nominal }}</p>
      </div>
      <div class="pembayaran__tagihan__item__checkbox-cicilan">
        <label>cicil pembayaran</label>
        <input type="checkbox" name="cicilan" @click="inputEvent" :checked="pembayaran.cicil">
        <CustomInput v-if="pembayaran.cicil" type="number" placeholder="masukan nominal"
          v-model:input-value="pembayaran.nominal_cicilan" />
      </div>
    </div>
  </div>
</template>
