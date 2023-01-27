import { megaphone } from '@utils/svg-vars'

export default [
   {
      title: 'banner',
      svgIcon: megaphone,
      path: '/banner',
      isActive: false,
      role: ['super', 'admin', 'content writer'],
      subItem: [
         {
            title: 'banner yayasan',
            path: '/banner/yayasan',
            isActive: false,
         },
         {
            title: 'banner sd',
            path: '/banner/sd',
            isActive: false,
         },
         {
            title: 'banner smp',
            path: '/banner/smp',
            isActive: false,
         },
      ],
   },
]
