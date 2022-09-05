import _ from 'lodash'
import { pembayaran, student2 } from '../../utils/svg-var'
export default {
  namespaced: true,
  state: {
    navigation: [
      {
        title: 'siswa',
        svgIcon: student2,
        name: 'Siswa',
        path: '/siswa',
        isActive: false,
      },
      {
        title: 'pembayaran',
        svgIcon: pembayaran,
        name: 'Pembayaran',
        path: '/pembayaran',
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
  },
}
