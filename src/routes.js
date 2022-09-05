import { createWebHistory, createRouter } from 'vue-router'

import BaseLogin from './pages/Login/BaseLogin.vue'
import BasePegawai from './pages/Pegawai/BasePegawai.vue'
import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BasePembayaran from './pages/Pembayaran/BasePembayaran.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: BaseLogin,
  },
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
  {
    path: '/',
    redirect: (to) => {
      return 'Siswa'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
