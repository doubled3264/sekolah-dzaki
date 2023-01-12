import _ from 'lodash'
import { note, power, user } from '../../utils/svg-vars'
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
                  path: '/siswa/calon-siswa',
                  isActive: false,
               },
               {
                  title: 'daftar siswa',
                  path: '/siswa',
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
         {
            title: 'artikel',
            svgIcon: note,
            path: '/artikel',
            isActive: false,
            subItem: [
               {
                  title: 'daftar artikel',
                  path: '/artikel',
                  isActive: false,
               },
            ],
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
      getItem(state) {
         return state.item
      },
      getActiveItem(state) {
         return _.find(state.item, function (data) {
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
      /**
       * set active parent
       * @param {Object} state
       * @param {String} parent name
       */
      setActiveParent(state, itemToActive) {
         const itemIndex = _.findIndex(state.item, ['title', itemToActive])
         state.item[itemIndex].isActive = !state.item[itemIndex].isActive
      },
      /**
       * set active parent
       * @param {Object} state
       * @param {Object} parent & child name
       */
      setActiveChild(state, item) {
         const { parent, itemToActive } = item
         const itemIndex = _.findIndex(state.item, ['title', parent])
         _.forEach(state.item[itemIndex].subItem, (data) => {
            data.title === itemToActive ? (data.isActive = true) : ''
         })
      },
      /**
       * set all parent & child state to off
       * @param {Object} state
       */
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
