import { firebaseAction } from 'vuexfire'
const state = {
  students: []
}
const actions = {
  setStdRef: firebaseAction(({
    bindFirebaseRef
  }, { ref }) => {
    bindFirebaseRef('students', ref)
  })
}
const getters = {
  students: state => state.students
}
export default {
  state,
  actions,
  getters
}
