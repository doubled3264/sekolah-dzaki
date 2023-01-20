import axios from 'axios'
import { filter } from 'lodash'
export default {
  namespaced: true,
  state: {
    banner: '',
  },
  getters: {
    get: (state) => (placement) => {
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
            console.log(error)
            reject(error)
          })
      })
    },
    async edit({ }, data) {
      let formData = new FormData()
      formData.append('id', data.id)
      formData.append('link', data.link)
      formData.append('placement', data.placement)
      formData.append('withImage', data.withImage)
      if (data.withImage) {
        formData.append('banner', data.raw.name)
        formData.append('itemToDelete', data.itemToDelete)
        formData.append('bannerImage', data.raw)
      }

      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `banner/${data.id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    async remove({ }, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`banner/${data.id}`, {
            data: data,
          })
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
