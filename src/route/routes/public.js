import BaseLogin from '@pages/Login/BaseLogin.vue'
import BaseRegister from '@pages/Register/BaseRegister.vue'
import Page404 from '@pages/Page404.vue'
const routes = [
   {
      path: '/',
      redirect: '/login',
   },
   {
      path: '/login',
      name: 'login',
      component: BaseLogin,
   },
   {
      path: '/register/:invitationCode',
      name: 'register',
      component: BaseRegister,
   },
   {
      path: '/not-found',
      name: 'NotFound',
      component: Page404,
   },
]

export default routes.map((route) => {
   return { ...route, meta: { public: true, onlyLoggedOut: true } }
})
