import axios from 'axios'

export default {
   namespaced: true,
   state: {
      // tagihan:[]
   },
   getters: {
      // getTagihan(state){
      //   return state.tagihan
      // }
   },
   mutations: {
      // setTagihan(state,data){
      //   state.tagihan = data
      // }
   },
   actions: {
      async pay({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('transaksi', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve()
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
   },
}
