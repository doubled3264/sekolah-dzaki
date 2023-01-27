import BaseSiswa from '@pages/Siswa/BaseSiswa.vue'
import BaseCalonSiswa from '@pages/Siswa/CalonSiswa/BaseCalonSiswa.vue'
import CalonSiswaList from '@pages/Siswa/CalonSiswa/CalonSiswaList.vue'
import BiodataCalonSiswa from '@pages/Siswa/CalonSiswa/Biodata.vue'
import CalonSiswaEdit from '@pages/Siswa/CalonSiswa/CalonSiswaEdit.vue'

const routes = [
   {
      path: '/siswa',
      name: 'siswa',
      component: BaseSiswa,
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
