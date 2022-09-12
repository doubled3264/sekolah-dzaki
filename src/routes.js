import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'

import BaseLogin from './pages/Login/BaseLogin.vue'
import BasePegawai from './pages/Pegawai/BasePegawai.vue'
import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BasePembayaran from './pages/Pembayaran/BasePembayaran.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: BaseLogin,
    meta: { requiresAuth: false },
  },
  {
    path: '/pegawai',
    name: 'Pegawai',
    component: BasePegawai,
    meta: { requiresAuth: true },
  },
  {
    path: '/siswa',
    name: 'Siswa',
    component: BaseSiswa,
    meta: { requiresAuth: true },
  },
  {
    path: '/pembayaran',
    name: 'Pembayaran',
    component: BasePembayaran,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: (to) => {
      return 'login'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // requiresAuth = true ?
//     console.log(store.getters['auth/authenticated'])
//     if (!store.getters['auth/authenticated']) {
//       next({
//         name: 'login',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
export default router
