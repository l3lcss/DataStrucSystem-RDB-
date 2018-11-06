import { firebaseAction } from 'vuexfire'
import firebaseFunc from '@/utils/firebase'
function delay () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
const state = {
  userLogin: {},
  userRef: ''
}
const actions = {
  async verifyUserLogin ({ commit, dispatch }, payload) {
    let res = await firebaseFunc.verifyUserLogin(payload)
    if (res.success) {
      commit('SET_USER_REF', res.data.userRef)
      dispatch('setUserLogin', res.data.userRef)
      await delay()
    }
    return res
  },
  setUserLogin: firebaseAction(({
    bindFirebaseRef
  }, ref) => {
    bindFirebaseRef('userLogin', ref)
  }),
  async setPassword (_, params) {
    let res = await firebaseFunc.setPassword(params)
    return res
  },
  async solveSchedule ({ getters }) {
    await firebaseFunc.solveSchedule(getters.getUserLogin, getters.getTADetails)
  },
  async firebaseLogout ({ getters }) {
    await firebaseFunc.firebaseLogout(getters.getUserRef)
  },
  async changePassword (_, params) {
    let res = await firebaseFunc.changePassword(params)
    return res
  }
}
const mutations = {
  SET_USER_REF: (state, payload) => {
    state.userRef = payload
  }
}
const getters = {
  getUserLogin: state => state.userLogin,
  getUserRef: state => state.userRef
}
export default {
  state,
  actions,
  mutations,
  getters
}
