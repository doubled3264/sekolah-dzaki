import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'

import BaseLogin from './pages/Login/BaseLogin.vue'
import BaseRegister from './pages/Register/BaseRegister.vue'
// import BasePegawai from './pages/Pegawai/BasePegawai.vue'
// import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
// import BasePembayaran from './pages/Pembayaran/BasePembayaran.vue'
// import BaseIuran from './pages/Iuran/BaseIuran.vue'
// import BaseIuranInklusi from './pages/Iuran/BaseIuranInklusi.vue'
// import BaseTestArea from './pages/TestArea/BaseTestArea.vue'

import BaseIuran from './pages/Iuran/BaseIuran.vue'
import IuranList from './pages/Iuran/IuranList.vue'
import IuranAdd from './pages/Iuran/IuranAdd.vue'
import IuranInfo from './pages/Iuran/IuranInfo.vue'
import IuranDiscount from './pages/Iuran/IuranDiscount.vue'

import BaseArticle from './pages/Article/BaseArticle.vue'
import ArticleList from './pages/Article/ArticleList.vue'
import ArticleAdd from './pages/Article/Add/ArticleAdd.vue'
import ArticleDetail from './pages/Article/ArticleDetail.vue'
import ArticleEdit from './pages/Article/Edit/ArticleEdit.vue'

import BaseBanner from './pages/Banner/BaseBanner.vue'
import BannerAllPlacement from './pages/Banner/BannerAllPlacement.vue'

import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BaseCalonSiswa from './pages/Siswa/CalonSiswa/BaseCalonSiswa.vue'
import CalonSiswaList from './pages/Siswa/CalonSiswa/CalonSiswaList.vue'
import BiodataCalonSiswa from './pages/Siswa/CalonSiswa/Biodata.vue'
import CalonSiswaEdit from './pages/Siswa/CalonSiswa/CalonSiswaEdit.vue'

import Page404 from './pages/Page404.vue'
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
      path: '/register/:invitationCode',
      name: 'register',
      component: BaseRegister,
   },
   // {
   //   path: '/pegawai',
   //   name: 'pegawai',
   //   component: BasePegawai,
   //   meta: { requiresAuth: true },
   // },
   {
      path: '/siswa',
      name: 'siswa',
      component: BaseSiswa,
      meta: { requiresAuth: true, role: ['super', 'admin'] },
      children: [
         {
            path: 'calon-siswa',
            name: 'calon siswa',
            component: BaseCalonSiswa,
            meta: { requiresAuth: true, role: ['super', 'admin'] },
            children: [
               {
                  path: '',
                  name: 'daftar calon siswa',
                  component: CalonSiswaList,
                  meta: { requiresAuth: true, role: ['super', 'admin'] },
                  props: {
                     parentItem: 'siswa',
                     childItem: 'daftar calon siswa',
                  },
               },
               {
                  path: 'biodata/:id',
                  name: 'biodata calon siswa',
                  component: BiodataCalonSiswa,
                  meta: { requiresAuth: true, role: ['super', 'admin'] },
                  props: {
                     parentItem: 'siswa',
                     childItem: 'daftar calon siswa',
                  },
               },
               {
                  path: 'edit/:id',
                  name: 'edit calon siswa',
                  component: CalonSiswaEdit,
                  meta: { requiresAuth: true, role: ['super', 'admin'] },
                  props: {
                     parentItem: 'siswa',
                     childItem: 'daftar calon siswa',
                  },
               },
            ],
         },
      ],
   },
   // {
   //   path: '/pembayaran',
   //   name: 'pembayaran',
   //   component: BasePembayaran,
   //   meta: { requiresAuth: true },
   // },
   {
      path: '/banner',
      name: 'banner',
      component: BaseBanner,
      meta: { requiresAuth: true, role: ['super', 'admin', 'content writer'] },
      children: [
         {
            path: 'yayasan',
            name: 'yayasan banner',
            component: BannerAllPlacement,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: {
               parentItem: 'banner',
               childItem: 'banner yayasan',
               placement: 'yayasan',
               contentHeadItem: [
                  { title: 'banner', path: '#' },
                  { title: 'banner yayasan', path: '' },
               ],
            },
         },
         {
            path: 'sd',
            name: 'sd banner',
            component: BannerAllPlacement,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: {
               parentItem: 'banner',
               childItem: 'banner sd',
               placement: 'sd',
               contentHeadItem: [
                  { title: 'banner', path: '#' },
                  { title: 'banner sd', path: '' },
               ],
            },
         },
         {
            path: 'smp',
            name: 'smp banner',
            component: BannerAllPlacement,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: {
               parentItem: 'banner',
               childItem: 'banner smp',
               placement: 'smp',
               contentHeadItem: [
                  { title: 'banner', path: '#' },
                  { title: 'banner smp', path: '' },
               ],
            },
         },
      ],
   },
   {
      path: '/artikel',
      name: 'article',
      component: BaseArticle,
      meta: { requiresAuth: true, role: ['super', 'admin', 'content writer'] },
      children: [
         {
            path: '',
            name: 'article list',
            component: ArticleList,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: { parentItem: 'artikel', childItem: 'daftar artikel' },
         },
         {
            path: 'tambah-data',
            component: ArticleAdd,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: { parentItem: 'artikel', childItem: 'daftar artikel' },
         },
         {
            path: ':id',
            name: 'article detail',
            component: ArticleDetail,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: { parentItem: 'artikel', childItem: 'daftar artikel' },
         },
         {
            path: 'edit/:id',
            name: 'article change',
            component: ArticleEdit,
            meta: {
               requiresAuth: true,
               role: ['super', 'admin', 'content writer'],
            },
            props: { parentItem: 'artikel', childItem: 'daftar artikel' },
         },
      ],
   },
   {
      path: '/iuran',
      name: 'iuran',
      component: BaseIuran,
      meta: { requiresAuth: true, role: ['super', 'admin'] },
      children: [
         {
            path: '',
            name: 'daftar iuran',
            component: IuranList,
            meta: { requiresAuth: true, role: ['super', 'admin'] },
            props: { parentItem: 'iuran', childItem: 'daftar iuran' },
         },
         {
            path: ':id',
            name: 'info iuran',
            component: IuranInfo,
            meta: { requiresAuth: true, role: ['super', 'admin'] },
            props: { parentItem: 'iuran', childItem: 'daftar iuran' },
         },
         {
            path: 'potongan-biaya',
            name: 'potongan biaya',
            component: IuranDiscount,
            meta: { requiresAuth: true, role: ['super', 'admin'] },
            props: { parentItem: 'iuran', childItem: 'daftar potongan' },
         },
         {
            path: 'tambah-data',
            component: IuranAdd,
            meta: { requiresAuth: true, role: ['super', 'admin'] },
            props: { parentItem: 'iuran', childItem: 'daftar iuran' },
         },
      ],
   },
   {
      path: '/not-found',
      name: 'NotFound',
      component: Page404,
   },

   {
      path: '/:pathMatch(.*)*',
      redirect: '/not-found',
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

router.beforeEach(async (to, from, next) => {
   let authenticated = false
   const token = localStorage.getItem('token')
  let allowedRoles =  to.matched.pop()
   let role = ''

   await store
      .dispatch('auth/getAccess', token)
      .then(() => {
         authenticated = true
         role = store.getters['auth/user'].role
      })
      .catch(() => {
         authenticated = false
      })

  console.log(allowedRoles)

   //check if route require auth
   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!authenticated) {
         next({ path: '/login' })
      } else {
         next()
      }
      //check if authenticated, direct to private route
   } else if (to.matched.some((record) => record.meta.hideForAuth)) {
      if (authenticated) {
         next({ path: '/artikel' })
      } else {
         next()
      }
   }
   // console.log('getter :')
   // console.log(store.getters['auth/authenticated'])
   // if (to.matched.some((record) => record.meta.requiresAuth)) {
   //    console.log(localStorage.getItem('token'))
   //    await store.dispatch('auth/getAccess', localStorage.getItem('token'))
   //    if (!store.getters['auth/authenticated']) {
   //       console.log('gagal masuk private route')
   //       next({ name: 'login' })
   //    } else {
   //       console.log('berhasil masuk private route')
   //       next()
   //    }
   // } else if (to.matched.some((record) => record.meta.hideForAuth)) {
   //    console.log('on login')
   //    if (store.getters['auth/authenticated']) {
   //       next({ path: '/artikel' })
   //    } else {
   //       next()
   //    }
   // } else if (to.path == '/') {
   //    next({ name: 'login' })
   // } else {
   //    next()
   // }

   // if (to.matched.some((record) => record.meta.requiresAuth)) {
   //    if (!store.getters['auth/authenticated']) {
   //       next({
   //          name: 'login',
   //       })
   //    } else {
   //       next()
   //    }
   // } else {
   //    next()
   // }
   // if (to.matched.some((record) => record.meta.hideForAuth)) {
   //    if (store.getters['auth/authenticated']) {
   //       next({ path: '/artikel' })
   //    } else {
   //       console.log('bisa tanpa login')
   //       next({ name: 'login' })
   //    }
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
   // if (to.matched.length == 0) {
   //    console.log('route ngga adad')
   //    next({ name: 'NotFound' })
   // }
})
export default router
