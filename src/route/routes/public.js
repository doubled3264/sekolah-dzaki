import { lazyLoad } from '../../utils/object-helper'
// function lazyLoad(view) {
//    return () => import(`/src/pages/${view}.vue`)
// }

const routes = [
   {
      path: '/',
      redirect: '/login',
   },
   {
      path: '/login',
      name: 'login',
      component: lazyLoad('Login/BaseLogin'),
   },
   {
      path: '/register/:invitationCode',
      name: 'register',
      component: lazyLoad('Register/BaseRegister'),
   },
   {
      path: '/not-found',
      name: 'NotFound',
      component: lazyLoad('Page404'),
   },
]

export default routes.map((route) => {
   return { ...route, meta: { public: true, onlyLoggedOut: true } }
})
