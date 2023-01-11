import axios from 'axios'
import { forEach } from 'lodash'
import { ulid } from 'ulid'
import { omit, pick } from '../../utils/objet-helper'

function createFormData(articleData) {
   const formData = new FormData()
   let articleItem = []
   forEach(articleData.item, (item, index) => {
      if (item.type == 'text') {
         articleItem.push(omit(item, 'showOptions'))
      } else if (item.type == 'image') {
         articleItem.push(pick(item, 'type'))
         articleItem[index].value = pick(item.value, 'caption')
      }
   })

   formData.append('article', {
      title: articleData.title,
      item: articleItem,
   })
   // formData.append('thumbnail', articleData.thumbnailImage)
   console.log(articleData)
   // forEach(articleData.item, (item) => {
   //    if (item.type == 'image') {
   //       formData.append('image', item.value.raw)
   //    }
   // })
   return formData
}

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

export default {
   namespaced: true,
   actions: {
      async add({}, articleData) {
         const uuid = ulid()
         // const formData = createFormData(articleData)
         const imageFormData = createImageFormData(articleData, uuid)
         return new Promise((resolve, reject) => {
            axios({
               method: 'post',
               url: 'test-upload',
               data: imageFormData,
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            })
               .then((response) => {
                  resolve(console.log(response))
               })
               .catch((error) => {
                  reject(console.log(error))
               })
         })
      },
   },
}
