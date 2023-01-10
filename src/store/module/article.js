import axios from 'axios'
import { forEach } from 'lodash'

function createFormData(articleData) {
  console.log(articleData)
  const formData = new FormData()
  // formData.append('article', articleData)
  forEach(articleData.item, (item) => {
    if (item.type == 'image') {
      console.log(item.value)
      formData.append('file', item.value.raw)
    }
  })
  // remove preview | contain blob object & raw file
  // forEach(articleData.item, (item) => {
  //   if (item.type == 'image') {
  //     delete item.value.preview
  //     delete item.value.raw
  //   }
  // })
  console.log(formData)
  return formData
}

export default {
  namespaced: true,
  actions: {
    async add({ }, articleData) {
      const formData = createFormData(articleData)
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'test-upload',
          data: formData,
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
