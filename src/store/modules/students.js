import { firebaseAction } from 'vuexfire'
import firebaseFunc from '@/utils/firebase'
const state = {
  userLogin: {}
}
const actions = {
  verifyUserLogin ({ dispatch }, payload) {
    return firebaseFunc.verifyUserLogin(payload).then(res => {
      if (res.success) {
        dispatch('setUserLogin', res.data.userRef)
      }
      return res
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
  initData ({ getters }) {
    return firebaseFunc.initData(getters.getUserLogin).then(res => {
      return res
    })
  },
  async setAuthentication ({ getters }) {
    await firebaseFunc.setAuthentication(getters.getUserLogin)
  },
  async firebaseLogout (_) {
    await firebaseFunc.firebaseLogout()
  }
}
const getters = {
  getUserLogin: state => state.userLogin
}
export default {
  state,
  actions,
  getters
}
