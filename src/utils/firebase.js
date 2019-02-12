import db from '../config/firebase'
import firebase from '@firebase/app'
import '@firebase/auth'
import moment from 'moment'

async function verifyLogin (data, params, userRef) {
  let prepareResults = {}
  if (!params.pass && params.isAutoLogin) {
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
    try {
      await firebase.auth().signInWithEmailAndPassword(`${params.id}@fitm.kmutnb.ac.th`, params.pass)
      prepareResults = {
        success: 1,
        message: `Welcome <b>${params.id}</b> EIEI :)`,
        data: {
          ...data,
          userRef
        }
      }
    } catch (error) {
      prepareResults = {
        success: 0,
        message: `logging in failed, ${error}`
      }
    }
  } else {
    prepareResults = {
      success: 0,
      message: `haven't Username <b>${params.id}</b>`
    }
  }
  return prepareResults
}
function validateHistoryTestYes (historyTest, user) {
  if (!historyTest) {
    let now = moment(new Date())
    user.date = now.format('x')
    return [user]
  }
  const dupId = historyTest.filter(obj => obj.ID === user.ID)
  let isSame = dupId.length ? checkIsSame(dupId) : false
  let lastSchedule = dupId[dupId.length - 1]
  if (dupId === 0 || !isSame || lastSchedule.status === 'FAILED') {
    let now = moment(new Date())
    user.date = now.format('x')
    historyTest.push(user)
  }
  return historyTest
}
function checkIsSame (dupId) {
  for (let i = 0; i < dupId.length; i++) {
    var isSame = moment(parseInt(dupId[i].date)).isSame(moment(), 'day')
  }
  return isSame
}
function validateHistoryTestNo (historyTest, ID) {
  const dupId = historyTest.filter(obj => obj.ID === ID)
  for (let i = 0; i < dupId.length; i++) {
    var isSame = moment(parseInt(dupId[i].date)).isSame(moment(), 'day')
    if (isSame && dupId[i].status !== 'FAILED') {
      var index = historyTest.findIndex(obj => obj.date === dupId[i].date)
      historyTest.splice(index, 1)
    }
  }
  return historyTest
}
export default {
  async verifyUserLogin (params) {
    let prepareResults = {}
    const stdRef = db.ref(`students/${params.id}`)
    let stdData = await stdRef.once('value')
    const taRef = db.ref(`ta/${params.id}`)
    const taData = await taRef.once('value')
    if (!stdData.exists() && !taData.exists()) {
      stdRef.set({
        FIRST_LOGIN: 1,
        identity: 'students',
        name: params.id,
        schedule: {
          TA: '',
          time: ''
        }
      })
      stdData = await stdRef.once('value')
      prepareResults = verifyLogin(stdData.val(), params, stdRef)
    } else if (stdData.exists()) {
      prepareResults = verifyLogin(stdData.val(), params, stdRef)
    } else {
      prepareResults = verifyLogin(taData.val(), params, taRef)
    }
    return prepareResults
  },
  async setPassword (params) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(`${params.id}@fitm.kmutnb.ac.th`, params.pass)
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
    let ID = userLogin['.key']
    let name = userLogin.name
    const taRef = db.ref(`ta/${params.TA}`)
    const stdRef = db.ref(`students/${ID}`)
    let taGet = await taRef.once('value')
    let taVal = taGet.val()
    const index = taVal.schedules.findIndex(obj => obj.time === params.time)
    if (params.status) {
      if (taVal.schedules[index].ID) {
        return false
      } else {
        taVal.schedules[index] = {
          ID,
          name,
          time: params.time
        }
        taRef.update({ schedules: taVal.schedules })
        let historyTest = validateHistoryTestYes(taVal.history_test, taVal.schedules[index])
        taRef.update({ history_test: historyTest })
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
      let historyTest = validateHistoryTestNo(taVal.history_test, ID)
      taRef.update({ history_test: historyTest })
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
  async firebaseLogout () {
    try {
      await firebase.auth().signOut()
      console.log('Sign-out successful.')
    } catch (error) {
      console.log('An error happened.', error.message)
    }
  },
  async changePassword (userLogin) {
    try {
      await firebase.auth().sendPasswordResetEmail(`${userLogin['.key']}@fitm.kmutnb.ac.th`)
      return {
        message: 'send reset password success.',
        success: 1
      }
    } catch (error) {
      return {
        error,
        success: 0
      }
    }
  },
  verifyFirebaseLogin () {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user)
      })
    })
  }
}
