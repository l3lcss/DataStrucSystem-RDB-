import { firebaseAction } from 'vuexfire'
import firebaseFunc from '@/utils/firebase'
const state = {
  userLogin: {},
  userRef: ''
}
const actions = {
  verifyUserLogin ({ commit, dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      let res = await firebaseFunc.verifyUserLogin(payload)
      if (res.success) {
        commit('SET_USER_REF', res.data.userRef)
        dispatch('setUserLogin', res.data.userRef)
      }
      resolve(res)
    })
  },
  setUserLogin: firebaseAction(({
    bindFirebaseRef
  }, { ref }) => {
    bindFirebaseRef('userLogin', ref)
  }),
  setPassword (_, params) {
    return firebaseFunc.setPassword(params).then(res => {
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
  },
  solveSchedule ({ getters }) {
    return firebaseFunc.solveSchedule(getters.getUserLogin, getters.getTADetails).then(res => {
      return res
    })
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
