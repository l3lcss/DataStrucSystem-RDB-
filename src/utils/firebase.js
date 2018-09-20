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
  }
}
