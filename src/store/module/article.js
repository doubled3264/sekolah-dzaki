import axios from 'axios'
import { forEach, reject } from 'lodash'
import { omit, pick } from '../../utils/objet-helper'

function createImageFormData(articleData, uuid) {
   const formData = new FormData()
   formData.append('id', uuid)
   formData.append('thumbnail', articleData.thumbnailImage)
   forEach(articleData.item, (item) => {
      if (item.type == 'image') {
         formData.append('image', item.value.raw)
      }
   })
   return formData
}

function createArticleData(articleData, uuid) {
   const article = {}
   article.id = uuid
   article.title = articleData.title
   article.thumbnail = articleData.thumbnailImage.name
   article.category = articleData.category
   article.placement = articleData.placement
   article.item = []
   forEach(articleData.item, (data, index) => {
      if (data.type == 'text') {
         article.item.push(pick(data, 'type'))
         article.item[index].content = data.value
         article.item[index].position = index + 1
      } else if (data.type == 'image') {
         article.item.push(pick(data, 'type'))
         article.item[index].content = data.value.raw.name
         article.item[index].caption = data.value.caption
         article.item[index].position = index + 1
      }
   })
   return article
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
         console.log(data)
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
            })
      },
      async addImage({}, data) {
         const { articleData, uuid } = data
         const imageFormData = createImageFormData(articleData, uuid)
         return new Promise((resolve, reject) => {
            axios({
               method: 'post',
               url: 'article/add-image',
               data: imageFormData,
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
      // second, add article
      async addArticle({}, data) {
         const { articleData, uuid } = data
         const article = createArticleData(articleData, uuid)
         return new Promise((resolve, reject) => {
            axios
               .post('article', { article: article })
               .then((response) => {
                  resolve(response)
               })
               .catch((error) => {
                  reject(error)
               })
         })
      },
      async editInfo({}, data) {
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
      async editInfoImage({}, data) {
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
