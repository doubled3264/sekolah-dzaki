import { createWebHistory, createRouter } from 'vue-router'
import { store } from './store'
import { includes, last } from 'lodash'
import allRoute from '@route/routes/'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      ...allRoute,
      {
         path: '/:pathMatch(.*)*',
         redirect: '/not-found',
      },
   ],
})

router.beforeEach(async (to, from, next) => {
   // localStorage.removeItem('token')
   let isPublic = last(to.matched).meta.public
   let isAuthenticated = false
   const token = localStorage.getItem('token')
   let allowedRoles = last(to.matched).meta.role
   let role = null

   await store
      .dispatch('auth/getAccess', token)
      .then(() => {
         isAuthenticated = true
         role = store.getters['auth/user'].role
      })
      .catch(() => {
         isAuthenticated = false
      })

   //if not public
   if (!isPublic) {
      // if not authenticated
      if (!isAuthenticated) {
         next({ path: '/login' })
      } else {
         // if authenticated but role not allowed
         if (!includes(allowedRoles, role)) {
            next({ path: '/artikel' })
         } else {
            next()
         }
      }
      //   //check if authenticated, direct to private route
   } else {
      if (isAuthenticated) {
         next({ path: '/artikel' })
      } else {
         next()
      }
   }
})
export default router
