const state = {
  isLoading: false
}
const actions = {
  setIsLoading ({ commit }, payload) {
    commit('SET_IS_LOADING', payload)
  }
}
const mutations = {
  SET_IS_LOADING: (state, payload) => {
    state.isLoading = payload
  }
}
const getters = {
  getIsLoading: state => state.isLoading
}

export default {
  state,
  actions,
  mutations,
  getters
}
