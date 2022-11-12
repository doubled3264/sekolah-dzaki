import axios from 'axios'

export default {
   namespaced: true,
   state: {
      calonSiswa: {
         list: {},
         single: null,
      },
   },
   getters: {
      getList(state) {
         return state.calonSiswa.list
      },
      getSingle(state) {
         return state.calonSiswa.single
      },
   },
   mutations: {
      setList(state, data) {
         state.calonSiswa.list = data
      },
      setSingle(state, data) {
         state.calonSiswa.single = data
      },
   },
   actions: {
      /**
       * get all calon siswa data
       */
      async getList({ commit }) {
         return new Promise((resolve, reject) => {
            axios
               .get('calon-siswa')
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setList', response.data.data))
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async getSingle({ commit }, credentials) {
         await axios
            .get(`calon-siswa/${credentials}`)
            .then((response) => {
               console.log(response)
               commit('setSingle', response.data.data)
            })
            .catch((err) => {
               console.log(err)
            })
      },
      /**
       * delete calon siswa data
       * @param {object} credentials calon siswa id
       */
      async delete({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .delete('calon-siswa', { data: credentials })
               .then((response) => {
                  resolve(response)
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
   },
}
