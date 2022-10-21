import _ from 'lodash'
import { note, power, user } from '../../utils/svg-var'
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
        svgIcon: note,
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
        svgIcon: note,
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
    item: [
      {
        title: 'iuran',
        svgIcon: note,
        path: '/iuran',
        isActive: false,
        subItem: [
          {
            title: 'daftar iuran',
            path: '/iuran',
            isActive: false,
          },
          {
            title: 'daftar potongan',
            path: '/iuran/potongan-biaya',
            isActive: false,
          },
        ],
      },
      {
        title: 'siswa',
        svgIcon: user,
        path: '/siswa',
        isActive: false,
        subItem: [
          {
            title: 'daftar calon siswa',
            path: '/siswa/daftar-calon-siswa',
            isActive: false,
          },
          {
            title: 'daftar  siswa',
            path: '/siswa/daftar-siswa',
            isActive: false,
          },
          {
            title: 'penerima bantuan',
            path: '/siswa/penerima-bantuan',
            isActive: false,
          },
        ],
      },
      {
        title: 'pembayaran',
        svgIcon: note,
        path: '/pembayaran',
        isActive: false,
        subItem: [],
      },
    ],
  },
  getters: {
    getNavigation(state) {
      return state.navigation
    },
    getActivePage(state) {
      return _.find(state.navigation, function(data) {
        return data.isActive
      })
    },
    getItem(state) {
      return state.item
    },
    getActiveItem(state) {
      return _.find(state.item, function(data) {
        return data.isActive
      })
    },
    getActiveSubItem(state) {
      return (itemName) => {
        console.log(itemName)
      }
    },
  },
  mutations: {
    // setActivePage(state, payload) {
    //   _.forEach(state.navigation, function(data) {
    //     data.title === payload
    //       ? (data.isActive = true)
    //       : (data.isActive = false)
    //   })
    // },
    // setActiveItem(state, itemToActive) {
    //   // find index
    //   const itemIndex = _.findIndex(state.item, ['title', itemToActive])
    //   if (state.item[itemIndex].subItem.length > 0) {
    //     _.forEach(state.item, (data) => {
    //       if (data.subItem.length > 0) {
    //         data.title === itemToActive
    //           ? (data.isActive = true)
    //           : (data.isActive = false)
    //       }
    //     })
    //   } else {
    //     _.forEach(state.item, (data) => {
    //       data.title === itemToActive
    //         ? (data.isActive = true)
    //         : (data.isActive = false)
    //     })
    //   }
    // },
    setActiveParent(state, itemToActive) {
      const itemIndex = _.findIndex(state.item, ['title', itemToActive])
      state.item[itemIndex].isActive = !state.item[itemIndex].isActive
    },
    setActiveChild(state, item) {
      const { parent, itemToActive } = item
      const itemIndex = _.findIndex(state.item, ['title', parent])
      _.forEach(state.item[itemIndex].subItem, (data) => {
        data.title === itemToActive ? (data.isActive = true) : ''
      })
    },
    setAllToNormal(state) {
      _.forEach(state.item, (data) => {
        data.isActive = false
        _.forEach(data.subItem, (subData) => {
          subData.isActive = false
        })
      })
    },
  },
}
