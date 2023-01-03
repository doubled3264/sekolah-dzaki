<script setup>
import { note, user, payment, paymentHistory } from '../../utils/svg-vars'
import CustomIcon from '../../components/CustomIcon.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { object } from 'yup'

const store = useStore()
const props = defineProps({
   siswaId: {
      type: String,
   },
   sidebarItemActive: {
      type: Object,
      defaut: {
         tagihan: false,
         riwayat: false,
         catatan: false,
      },
   },
})

const activeMenu = ref('')

const siswa = ref({
   no_induk: '',
   nama: '',
})

async function fetchSiswa() {
   await store.dispatch('siswa/getSingle', { id: props.siswaId })
}

function setSiswa() {
   const temp = store.getters['siswa/getSingle']
   siswa.value.no_induk = temp.no_induk
   siswa.value.nama = temp.nama
}

onMounted(async () => {
   activeMenu.value = await fetchSiswa()
   setSiswa()
})
</script>
<template>
   <div class="pembayaran__sidebar">
      <div class="pembayaran__info-siswa">
         <div class="pembayaran__info-siswa__icon">
            <CustomIcon :svg-icon="user" width="38" />
         </div>
         <div class="pembayaran__info-siswa__detail">
            <p>{{ siswa.nama }}</p>
            <p>{{ siswa.no_induk }}</p>
         </div>
      </div>
      <ul class="pembayaran__sidebar__list">
         <li
            class="pembayaran__sidebar__item"
            :class="[
               {
                  'text-white bg-verdigris rounded-lg':
                     sidebarItemActive.tagihan,
               },
            ]"
            @click="$emit('toggleMenu', 'tagihan')"
         >
            <CustomIcon :svg-icon="payment" />
            <p>tagihan</p>
         </li>
         <li
            class="pembayaran__sidebar__item"
            :class="[
               {
                  'text-white bg-verdigris rounded-lg':
                     sidebarItemActive.riwayat,
               },
            ]"
            @click="$emit('toggleMenu', 'riwayat')"
         >
            <CustomIcon :svg-icon="paymentHistory" />
            <p>riwayat pembayaran</p>
         </li>
         <li
            class="pembayaran__sidebar__item"
            :class="[
               {
                  'text-white bg-verdigris rounded-lg':
                     sidebarItemActive.catatan,
               },
            ]"
            @click="$emit('toggleMenu', 'catatan')"
         >
            <CustomIcon :svg-icon="note" />
            <p>catatan orang tua</p>
         </li>
      </ul>
   </div>
</template>
