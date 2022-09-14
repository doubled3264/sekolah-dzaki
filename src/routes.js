import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'

import BaseLogin from './pages/Login/BaseLogin.vue'
import BasePegawai from './pages/Pegawai/BasePegawai.vue'
import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BasePembayaran from './pages/Pembayaran/BasePembayaran.vue'

const routes = [
  {
    path: '/',
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: BaseLogin,
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: '/pegawai',
    name: 'pegawai',
    component: BasePegawai,
    meta: { requiresAuth: true },
  },
  {
    path: '/siswa',
    name: 'siswa',
    component: BaseSiswa,
    meta: { requiresAuth: true },
  },
  {
    path: '/pembayaran',
    name: 'pembayaran',
    component: BasePembayaran,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
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
//   if (to.matched.some((record) => record.meta.hideForAuth)) {
//     if (store.getters['auth/authenticated']) {
//       router.push({
//         name: 'siswa',
//       })
//     } else {
//       router.push({
//         name: 'login',
//       })
//     }
//   }
// })
export default router
