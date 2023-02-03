import { lazyLoad } from '../../../utils/object-helper'

const routes = [
   {
      path: '/banner',
      name: 'banner',
      component: lazyLoad('Banner/BaseBanner'),
      meta: { requiresAuth: true, role: ['super', 'admin', 'content writer'] },
      children: [
         {
            path: 'yayasan',
            name: 'yayasan banner',
            component: lazyLoad('Banner/BannerAllPlacement'),
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
            component: lazyLoad('Banner/BannerAllPlacement'),
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
            component: lazyLoad('Banner/BannerAllPlacement'),
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
]

export default routes.map((route) => {
   return {
      ...route,
      meta: { public: false, role: ['super', 'admin', 'content writer'] },
      children: route.children.map((childrens) => {
         return {
            ...childrens,
            meta: { public: false, role: ['super', 'admin', 'content writer'] },
         }
      }),
   }
})
