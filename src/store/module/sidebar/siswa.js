import { user } from '@utils/svg-vars'
export default [
   {
      title: 'siswa',
      svgIcon: user,
      path: '/siswa',
      isActive: false,
      role: ['super', 'admin'],
      subItem: [
         {
            title: 'daftar calon siswa',
            path: '/siswa/calon-siswa',
            isActive: false,
         },
         {
            title: 'daftar siswa',
            path: '/siswa',
            isActive: false,
         },
         {
            title: 'penerima bantuan',
            path: '/siswa/penerima-bantuan',
            isActive: false,
         },
      ],
   },
]
