import BaseIuran from '@pages/Iuran/BaseIuran.vue'
import IuranList from '@pages/Iuran/IuranList.vue'
import IuranAdd from '@pages/Iuran/IuranAdd.vue'
import IuranInfo from '@pages/Iuran/IuranInfo.vue'
import IuranDiscount from '@pages/Iuran/IuranDiscount.vue'

const routes = [
   {
      path: '/iuran',
      name: 'iuran',
      component: BaseIuran,
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
]

export default routes.map((route) => {
   return {
      ...route,
      meta: { public: false, role: ['super', 'admin'] },
      children: route.children.map((childrens) => {
         return {
            ...childrens,
            meta: { public: false, role: ['super', 'admin'] },
         }
      }),
   }
})
