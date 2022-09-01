import { home, student } from '../../utils/svg-var'
export default {
  namespaced: true,
  state: {
    navigation: [
      {
        title: 'home',
        svgIcon: home,
      },
      {
        title: 'siswa',
        svgIcon: student,
      },
    ],
  },
  getters: {
    getNavigation(state) {
      return state.navigation
    },
  },
}
