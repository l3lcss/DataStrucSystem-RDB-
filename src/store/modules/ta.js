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
    let res = await firebaseFunc.setReservTime(params, getters.getUserLogin)
    return res
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
