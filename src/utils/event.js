import db from '@/config/firebase'
import store from '@/store'
export default {
  async listenerVisible () {
    let userStatus = store.getters.getUserRef.child('statusActive')
    if (document.visibilityState === 'visible') {
      let res2 = await userStatus.once('value')
      db.ref(userStatus).update({
        number: res2.val().number + 1
      })
    } else if (document.visibilityState === 'hidden') {
      let res2 = await userStatus.once('value')
      db.ref(userStatus).update({
        number: res2.val().number - 1
      })
    }
  }
}
