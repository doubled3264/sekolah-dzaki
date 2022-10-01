import axios from 'axios'

export default {
  namespaced: true,
  state:{
    tagihan:[]
  },
  getters:{
    getTagihan(state){
      return state.tagihan
    }
  },
  mutations:{
    setTagihan(state,data){
      state.tagihan = data
    }
  },
  actions:{
      async getSpecific({ commit }, credentials) {
         return new Promise((resolve, reject) => {
           console.log(credentials)
            axios
               .post('pembayaran/specific', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setTagihan', response.data.collection))
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },

  }
}
