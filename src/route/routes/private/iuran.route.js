import { lazyLoad } from '../../../utils/object-helper'

const routes = [
   {
      path: '/iuran',
      name: 'iuran',
      component: lazyLoad('Iuran/BaseIuran'),
      children: [
         {
            path: '',
            name: 'daftar iuran',
            component: lazyLoad('Iuran/IuranList'),
            props: { parentItem: 'iuran', childItem: 'daftar iuran' },
         },
         {
            path: ':id',
            name: 'info iuran',
            component: lazyLoad('Iuran/IuranInfo'),
            props: { parentItem: 'iuran', childItem: 'daftar iuran' },
         },
         {
            path: 'potongan-biaya',
            name: 'potongan biaya',
            component: lazyLoad('Iuran/IuranDiscount'),
            props: { parentItem: 'iuran', childItem: 'daftar potongan' },
         },
         {
            path: 'tambah-data',
            component: lazyLoad('/Iuran/IuranAdd'),
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
