import db from '@/config/firebase'
import firebase from '@firebase/app'
import '@firebase/auth'

async function verifyLogin (data, params, userRef) {
  let prepareResults = {}
  if (!params.pass) {
    prepareResults = {
      success: 1,
      message: `Welcome <b>${params.id}</b> EIEI :)`,
      data: {
        ...data,
        userRef
      }
    }
    return prepareResults
  }
  if (data && data.FIRST_LOGIN) {
    prepareResults = {
      success: 1,
      message: 'Student is First Login.',
      data: {
        ...data,
        userRef
      }
    }
  } else if (data) {
    await firebase.auth().signInWithEmailAndPassword(`${params.id}@gmail.com`, params.pass).then(() => {
      prepareResults = {
        success: 1,
        message: `Welcome <b>${params.id}</b> EIEI :)`,
        data: {
          ...data,
          userRef
        }
      }
    }).catch(err => {
      prepareResults = {
        success: 0,
        message: `logging in failed, ${err}`
      }
    })
  } else {
    prepareResults = {
      success: 0,
      message: `haven't Username <b>${params.id}</b>`
    }
  }
  return prepareResults
}
export default {
  async verifyUserLogin (params) {
    let prepareResults = {}
    const stdRef = db.ref(`students/${params.id}`)
    const taRef = db.ref(`ta/${params.id}`)
    const stdData = await stdRef.once('value')
    if (stdData.exists()) {
      prepareResults = verifyLogin(stdData.val(), params, stdRef)
    } else {
      const taData = await taRef.once('value')
      prepareResults = verifyLogin(taData.val(), params, taRef)
    }
    return prepareResults
  },
  async setPassword (params) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(`${params.id}@gmail.com`, params.pass)
      await db.ref(`${params.identity}/${params.id}`).update({
        FIRST_LOGIN: 0
      })
      return {
        success: 1,
        message: 'set password successful.'
      }
    } catch (error) {
      return {
        success: 0,
        error
      }
    }
  },
  async setReservTime (params, userLogin) {
    const taRef = db.ref(`ta/${params.TA}`)
    const stdRef = db.ref(`students/${userLogin['.key']}`)
    let taGet = await taRef.once('value')
    let taVal = taGet.val()
    const index = taVal.schedules.findIndex(obj => obj.time === params.time)
    if (params.status) {
      if (taVal.schedules[index].ID) {
        return false
      } else {
        taVal.schedules[index] = {
          ID: userLogin['.key'],
          name: userLogin.name,
          time: params.time
        }
        taRef.update({ schedules: taVal.schedules })
      }
      stdRef.update({
        schedule: {
          TA: params.TA,
          time: params.time
        }
      })
      return true
    } else {
      taVal.schedules[index] = {
        time: params.time
      }
      taRef.update({ schedules: taVal.schedules })
      stdRef.update({
        schedule: {
          TA: '',
          time: ''
        }
      })
      return true
    }
  },
  async solveSchedule (userLogin, TADetails) {
    const stdRef = db.ref(`students/${userLogin['.key']}`)
    const stdData = await stdRef.once('value')
    const TAID = stdData.val().schedule.TA
    if (TAID) {
      const taData = await db.ref(`ta/${TAID}`).once('value')
      const index = taData.val().schedules.findIndex(obj => obj.ID === userLogin['.key'])
      if (index === -1) {
        stdRef.update({
          schedule: {
            TA: '',
            time: ''
          }
        })
      }
    } else {
      TADetails.forEach(obj => {
        obj.schedules.forEach((schedObj, index) => {
          if (schedObj.ID === userLogin['.key']) {
            const IDRef = db.ref(`ta/${obj['.key']}/schedules/${index}/ID`)
            const nameRef = db.ref(`ta/${obj['.key']}/schedules/${index}/name`)
            IDRef.remove()
            nameRef.remove()
          }
        })
      })
    }
  },
  async firebaseLogout (userRef) {
    if (userRef) {
      let userStatus = userRef.child('statusActive')
      let res = await userStatus.once('value')
      db.ref(userStatus).update({
        number: res.val().number - 1
      })
      document.removeEventListener('visibilitychange', event.listenerVisible)
    }
    try {
      await firebase.auth().signOut()
      console.log('Sign-out successful.')
    } catch (error) {
      console.log('An error happened.', error.message)
    }
  },
  changePassword (userLogin) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(`${userLogin['.key']}@gmail.com`).then(() => {
        console.log('Email sent.')
        resolve(`Email sent`)
      }).catch((error) => {
        console.log(error, 'error')
        reject(error, 'error')
      })
    })
  },
  verifyFirebaseLogin () {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user)
      })
    })
  }
}
