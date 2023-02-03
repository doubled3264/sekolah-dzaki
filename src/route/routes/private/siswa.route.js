import { lazyLoad } from '../../../utils/object-helper'

const routes = [
   {
      path: '/siswa',
      name: 'siswa',
      component: lazyLoad('Siswa/BaseSiswa'),
      children: [
         {
            path: 'calon-siswa',
            name: 'calon siswa',
            component: lazyLoad('Siswa/CalonSiswa/BaseCalonSiswa'),
            children: [
               {
                  path: '',
                  name: 'daftar calon siswa',
                  component: lazyLoad('Siswa/CalonSiswa/CalonSiswaList'),
                  props: {
                     parentItem: 'siswa',
                     childItem: 'daftar calon siswa',
                  },
               },
               {
                  path: 'biodata/:id',
                  name: 'biodata calon siswa',
                  component: lazyLoad('Siswa/CalonSiswa/Biodata'),
                  props: {
                     parentItem: 'siswa',
                     childItem: 'daftar calon siswa',
                  },
               },
               {
                  path: 'edit/:id',
                  name: 'edit calon siswa',
                  component: lazyLoad('Siswa/CalonSiswa/CalonSiswaEdit'),
                  props: {
                     parentItem: 'siswa',
                     childItem: 'daftar calon siswa',
                  },
               },
            ],
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
