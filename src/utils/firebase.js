import db from '@/config/firebase'

export default {
  verifyUserLogin (params) {
    return new Promise((resolve, reject) => {
      let prepareResults = {}
      const userRef = db.ref(`students/${params.id}`)
      userRef.on('value', (data) => {
        if (data.val()) {
          if (data.val().FIRST_LOGIN) {
            prepareResults = {
              success: 1,
              message: 'Student is First Login.',
              data: {
                ...data.val(),
                userRef
              }
            }
          } else if (params.pass === data.val().password) {
            prepareResults = {
              success: 1,
              message: `Welcome <b>${params.id}</b> EIEI :)`,
              data: {
                ...data.val(),
                userRef
              }
            }
          } else {
            prepareResults = {
              success: 0,
              message: 'Invalid password.',
              data: {
                ...data.val(),
                userRef
              }
            }
          }
        } else {
          prepareResults = {
            success: 0,
            message: `haven't Username <b>${params.id}</b>`
          }
        }
        resolve(prepareResults)
      })
    })
  },
  setPassword (params) {
    db.ref(`students/${params.id}`).update({
      FIRST_LOGIN: 0,
      password: params.pass
    })
  },
  setReservTime (params, userLogin) {
    return new Promise((resolve, reject) => {
      const taRef = db.ref(`ta/${params.TA}`)
      const stdRef = db.ref(`students/${userLogin['.key']}`)
      taRef.transaction(taVal => {
        const index = taVal.schedules.findIndex(obj => obj.time === params.time)
        if (params.status) {
          if (taVal.schedules[index].ID) {
            resolve(false)
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
          resolve(true)
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
          resolve(true)
        }
      })
    })
  },
  initData (userLogin) {
    return new Promise((resolve, reject) => {
      const stdRef = db.ref(`students/${userLogin['.key']}`)
      stdRef.once('value').then((stdData) => {
        if (stdData.val().schedule.TA) {
          const taRef = db.ref(`ta/${stdData.val().schedule.TA}`)
          taRef.once('value', (taData) => {
            const index = taData.val().schedules.findIndex(obj => obj.ID === userLogin['.key'])
            if (index === -1) {
              stdRef.update({
                schedule: {
                  TA: '',
                  time: ''
                }
              })
            }
          })
        }
      })
    })
  }
}
