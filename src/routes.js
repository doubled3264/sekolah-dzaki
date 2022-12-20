import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'

import BaseLogin from './pages/Login/BaseLogin.vue'
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

import BaseArticle from './pages/Artikel/BaseArticle.vue'
import ArticleList from './pages/Artikel/ArticleList.vue'
import ArticleAdd from './pages/Artikel/ArticleAdd.vue'

import BaseSiswa from './pages/Siswa/BaseSiswa.vue'
import BaseCalonSiswa from './pages/Siswa/CalonSiswa/BaseCalonSiswa.vue'
import CalonSiswaList from './pages/Siswa/CalonSiswa/CalonSiswaList.vue'
import BiodataCalonSiswa from './pages/Siswa/CalonSiswa/Biodata.vue'
import CalonSiswaEdit from './pages/Siswa/CalonSiswa/CalonSiswaEdit.vue'
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
    meta: { requiresAuth: true },
    children: [
      {
        path: 'calon-siswa',
        name: 'calon siswa',
        component: BaseCalonSiswa,
        children: [
          {
            path: '',
            name: 'daftar calon siswa',
            component: CalonSiswaList,
            props: {
              parentItem: 'siswa',
              childItem: 'daftar calon siswa',
            },
          },
          {
            path: 'biodata/:id',
            name: 'biodata calon siswa',
            component: BiodataCalonSiswa,
            props: {
              parentItem: 'siswa',
              childItem: 'daftar calon siswa',
            },
          },
          {
            path: 'edit/:id',
            name: 'edit calon siswa',
            component: CalonSiswaEdit,
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
    path: '/artikel',
    name: 'artikel',
    component: BaseArticle,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'daftar artikel',
        component: ArticleList,
        props: { parentItem: 'artikel', childItem: 'daftar artikel' },
      },
      {
        path: 'tambah-data',
        component: ArticleAdd,
        props: { parentItem: 'artikel', childItem: 'daftar artikel' },
      },
    ],
  },
  {
    path: '/iuran',
    name: 'iuran',
    component: BaseIuran,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'daftar iuran',
        component: IuranList,
        props: { parentItem: 'iuran', childItem: 'daftar iuran' },
      },
      {
        path: ':id',
        name: 'info iuran',
        component: IuranInfo,
        props: { parentItem: 'iuran', childItem: 'daftar iuran' },
      },
      {
        path: 'potongan-biaya',
        name: 'potongan biaya',
        component: IuranDiscount,
        props: { parentItem: 'iuran', childItem: 'daftar potongan' },
      },
      {
        path: 'tambah-data',
        component: IuranAdd,
        props: { parentItem: 'iuran', childItem: 'daftar iuran' },
      },
    ],
  },
  // {
  //   path: '/iuran-inklusi',
  //   name: 'iuran-inklusi',
  //   component: BaseIuranInklusi,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/test-area',
  //   component: BaseTestArea,
  //   meta: { requiresAuth: true },
  // },
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
