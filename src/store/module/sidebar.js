import _ from 'lodash'
import { detail, power, user } from '../../utils/svg-var'
export default {
   namespaced: true,
   state: {
      navigation: [
         {
            title: 'siswa',
            svgIcon: user,
            name: 'siswa',
            path: '/siswa',
            isActive: false,
         },
         {
            title: 'iuran',
            svgIcon: detail,
            name: 'iuran',
            path: '/iuran',
            isActive: false,
         },
         // {
         //    title: 'iuran inklusi',
         //    svgIcon: pembayaran,
         //    name: 'iuran-inklusi',
         //    path: '/iuran-inklusi',
         //    isActive: false,
         // },
         {
            title: 'pembayaran',
            svgIcon: detail,
            name: 'pembayaran',
            path: '/pembayaran',
            isActive: false,
         },
         {
            title: 'logout',
            svgIcon: power,
            name: 'logout',
            path: '/',
            isActive: false,
         },
      ],
   },
   getters: {
      getNavigation(state) {
         return state.navigation
      },
      getActivePage(state) {
         return _.find(state.navigation, function (data) {
            return data.isActive
         })
      },
   },
   mutations: {
      setActivePage(state, payload) {
         _.forEach(state.navigation, function (data) {
            data.title === payload
               ? (data.isActive = true)
               : (data.isActive = false)
         })
      },
      setToLogout(state) {},
   },
}
