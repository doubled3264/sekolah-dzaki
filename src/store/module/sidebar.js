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
      },
      {
        title: 'pembayaran',
        svgIcon: pembayaran,
        name: 'Pembayaran',
        path: '/pembayaran',
      },
    ],
  },
  getters: {
    getNavigation(state) {
      return state.navigation
    },
  },
}
