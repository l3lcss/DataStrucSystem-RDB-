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
    firebaseFunc.setPassword(params)
  },
  initData ({ getters }) {
    return firebaseFunc.initData(getters.getUserLogin).then(res => {
      return res
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
