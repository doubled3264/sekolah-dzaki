import BaseAdmin from '@pages/Admin/BaseAdmin.vue'
import AdminList from '@pages/Admin/AdminList.vue'

const routes = [
   {
      path: '/admin',
      name: 'Admin',
      component: BaseAdmin,
      children: [
         {
            path: '',
            name: 'AdminList',
            component: AdminList,
            props: { parentItem: 'admin' },
         },
      ],
   },
]
export default routes.map((route) => {
   return {
      ...route,
      meta: { public: false, role: ['super'] },
      children: route.children.map((childrens) => {
         return {
            ...childrens,
            meta: { public: false, role: ['super'] },
         }
      }),
   }
})
