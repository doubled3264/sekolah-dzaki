import { createWebHistory, createRouter } from 'vue-router'

import BasePegawai from './pages/Pegawai/BasePegawai.vue'
import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BasePembayaran from './pages/Pembayaran/BasePembayaran.vue'

const routes = [
   {
      path: '/pegawai',
      name: 'Pegawai',
      component: BasePegawai,
   },
   {
      path: '/siswa',
      name: 'Siswa',
      component: BaseSiswa,
   },
   {
      path: '/pembayaran',
      name: 'Pembayaran',
      component: BasePembayaran,
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router
