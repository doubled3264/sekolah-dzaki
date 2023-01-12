import axios from 'axios'
import { forEach } from 'lodash'
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
      } else if (data.type == 'image') {
         article.item.push(pick(data, 'type'))
         article.item[index].content = data.value.raw.name
         article.item[index].caption = data.value.caption
      }
   })
   return article
}

export default {
   namespaced: true,
   actions: {
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
   },
}
