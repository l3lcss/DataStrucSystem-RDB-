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
  solveSchedule ({ getters }) {
    return firebaseFunc.solveSchedule(getters.getUserLogin, getters.getTADetails).then(res => {
      return res
    })
  },
  async firebaseLogout (_) {
    await firebaseFunc.firebaseLogout()
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
const getters = {
  getUserLogin: state => state.userLogin
}
export default {
  state,
  actions,
  getters
}
