export default {
  namespaced: true,
  state: {
    width: document.documentElement.clientWidth,
  },
  getters: {
    getWidth(state) {
      return state.width
    },
  },
  mutations: {
    setWidth(state, payload) {
      state.width = payload
    },
  },
}
