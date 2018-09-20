import { firebaseAction } from 'vuexfire'
import firebaseFunc from '@/utils/firebase'
const state = {
  students: [],
  userLogin: {}
}
const actions = {
  setStdRef: firebaseAction(({
    bindFirebaseRef
  }, { ref }) => {
    bindFirebaseRef('students', ref)
  }),
  verifyUserLogin ({ dispatch }, payload) {
    return firebaseFunc.verifyUserLogin(payload).then(res => {
      console.log(res, 'res in action')
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
  })
}
const getters = {
  getStudents: state => state.students,
  getUserLogin: state => state.userLogin
}
export default {
  state,
  actions,
  getters
}
