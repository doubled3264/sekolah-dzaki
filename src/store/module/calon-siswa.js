import axios from 'axios'

export default {
  namespaced: true,
  state: {
    calonSiswa: {
      list: {},
    },
  },
  getters: {
    getList(state) {
      return state.calonSiswa.list
    },
  },
  mutations: {
    setList(state, data) {
      state.calonSiswa.list = data
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
    /**
     * delete calon siswa data
     * @param {object} credentials calon siswa id
     */
    async delete({ }, credentials) {
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
