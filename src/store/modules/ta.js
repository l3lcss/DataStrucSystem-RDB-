import { firebaseAction } from 'vuexfire'
import firebaseFunc from '@/utils/firebase'
const state = {
  TADetails: []
}
const actions = {
  setTADetails: firebaseAction(async ({
    bindFirebaseRef
  }, { ref }) => {
    await bindFirebaseRef('TADetails', ref)
  }),
  async setReservTime ({ getters, dispatch }, params) {
    return firebaseFunc.setReservTime(params, getters.getUserLogin).then(res => {
      return res
    })
  }
}
const getters = {
  getTADetails: state => state.TADetails
}
export default {
  state,
  actions,
  getters
}
