import axios from 'axios'
import { forEach } from 'lodash'

function generateFormData(data) {
  const { articleData, uuid } = data
  let formData = new FormData()
  formData.append('id', uuid)
  formData.append('title', articleData.title)
  formData.append('category', articleData.category)
  formData.append('placement', articleData.placement)
  formData.append('thumbnail', articleData.thumbnailImage.name)
  forEach(articleData.item, (item, index) => {
    if (item.type == 'text') {
      formData.append(`${index + 1}-text`, item.content)
    } else if (item.type == 'image') {
      formData.append(
        `${index + 1}-image`,
        `${item.content.raw.name}#${item.content.caption}`
      )
    }
  })
  formData.append('thumbnailImage', articleData.thumbnailImage)
  forEach(articleData.item, (item) => {
    if (item.type == 'image') {
      formData.append('image', item.content.raw)
    }
  })
  return formData
}

export default {
  namespaced: true,
  state: {
    articleSimple: {},
    articleSingle: {},
  },
  getters: {
    getSimple: (state) => {
      return state.articleSimple
    },
    getSingle: (state) => {
      return state.articleSingle
    },
  },
  mutations: {
    setSimple: (state, data) => {
      state.articleSimple = data
    },
    setSingle: (state, data) => {
      state.articleSingle = data
    },
  },
  actions: {
    async getSimple({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('article/get-simple')
          .then((response) => {
            resolve(commit('setSimple', response.data.data))
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    async getSingle({ commit }, articleId) {
      await axios
        .get(`article/${articleId}`)
        .then((response) => {
          commit('setSingle', response.data.data)
        })
        .catch((err) => {
          console.log(err)
          reject(error)
        })
    },
    async add({ }, data) {
      const formData = generateFormData(data)
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'article',
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
    async delete({ }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`article/${id}`)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async editInfo({ }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('article/edit-info', data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async addTextItem({ }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('article/text-item', data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async removeTextItem({ }, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete('article/text-item', data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async editTextItem({ }, data) {
      return new Promise((resolve, reject) => {
        axios
          .put('article/text-item', data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async editInfoImage({ }, data) {
      let formData = new FormData()
      const { id, thumbnailImage } = data.article
      formData.append('id', id)
      formData.append('thumbnail', thumbnailImage.raw)

      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'article/edit-info-image',
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
