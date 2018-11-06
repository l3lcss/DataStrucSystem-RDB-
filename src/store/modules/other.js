const state = {
  isLoading: false,
  isVerify: false
}
const actions = {
  setIsLoading ({ commit }, payload) {
    commit('SET_IS_LOADING', payload)
  },
  setIsVerify ({ commit }, payload) {
    commit('SET_IS_VERIFY', payload)
  }
}
const mutations = {
  SET_IS_LOADING: (state, payload) => {
    state.isLoading = payload
  },
  SET_IS_VERIFY: (state, payload) => {
    state.isVerify = payload
  }
}
const getters = {
  getIsLoading: state => state.isLoading,
  getIsVerify: state => state.isVerify
}

export default {
  state,
  actions,
  mutations,
  getters
}
