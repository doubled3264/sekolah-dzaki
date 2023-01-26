import BaseLogin from '@pages/Login/BaseLogin.vue'
import BaseRegister from '@pages/Register/BaseRegister.vue'

const routes = [
  {
    path: '/',

  },
  {
    path: '/login',
    name: 'login',
    component: BaseLogin
  },
  {
    path: '/register/:invitationCode',
    name: 'register',
    component: BaseRegister
  }
]

export default routes.map(route =>{
  return {...route, meta: {public: true, onlyLoggedOut: true}}
})
