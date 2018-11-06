import { firebaseAction } from 'vuexfire'
import firebaseFunc from '@/utils/firebase'
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
    }
    return res
  },
  setUserLogin: firebaseAction(({
    bindFirebaseRef
  }, { ref }) => {
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
    return firebaseFunc.changePassword(params).then(res => {
      return {
        res,
        success: 1
      }
    }).catch(err => {
      return {
        err,
        success: 0
      }
    })
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
