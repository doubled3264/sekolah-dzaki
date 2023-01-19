import axios from 'axios'
import { filter } from 'lodash'
export default {
  namespaced: true,
  state: {
    banner: '',
  },
  getters: {
    get: (state) => (placement) => {
      console.log(placement)
      return filter(state.banner, { placement: placement })
    },
  },
  mutations: {
    set: (state, data) => {
      state.banner = data
    },
  },
  actions: {
    async get({ commit }) {
      await axios
        .get('banner')
        .then((response) => {
          commit('set', response.data.data)
        })
        .catch((err) => console.log(err))
    },
    async add({ }, data) {
      let formData = new FormData()
      formData.append('banner', data.raw.name)
      formData.append('link', data.link)
      formData.append('placement', data.placement)
      formData.append('bannerImage', data.raw)
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'banner',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
