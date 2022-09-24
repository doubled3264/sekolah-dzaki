import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'

import BaseLogin from './pages/Login/BaseLogin.vue'
import BasePegawai from './pages/Pegawai/BasePegawai.vue'
import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BasePembayaran from './pages/Pembayaran/BasePembayaran.vue'
import BaseIuran from './pages/Iuran/BaseIuran.vue'
import BaseIuranInklusi from './pages/Iuran/BaseIuranInklusi.vue'

const routes = [
   {
      path: '/',
      redirect: (to) => {
         return 'login'
      },
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
   {
      path: '/iuran',
      name: 'iuran',
      component: BaseIuran,
      meta: { requiresAuth: true },
   },
   {
      path: '/iuran-inklusi',
      name: 'iuran-inklusi',
      component: BaseIuranInklusi,
      meta: { requiresAuth: true },
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

router.beforeEach((to, from, next) => {
   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters['auth/authenticated']) {
         next({
            name: 'login',
         })
      } else {
         next()
      }
   } else {
      next()
   }
   // if (to.matched.some((record) => record.meta.hideForAuth)) {
   //    if (store.getters['auth/authenticated']) {
   //       router.push({
   //          name: 'siswa',
   //       })
   //    } else {
   //       router.push({
   //          name: 'login',
   //       })
   //    }
   // }
})
export default router
