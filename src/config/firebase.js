import Firebase from '@firebase/app'
import '@firebase/database'

const config = {
  apiKey: 'AIzaSyChYKFH9qVhIwOVUFX_2SRljJU_G681VB4',
  authDomain: 'vuex-firebase-58fb5.firebaseapp.com',
  databaseURL: 'https://vuex-firebase-58fb5.firebaseio.com',
  projectId: 'vuex-firebase-58fb5',
  storageBucket: 'vuex-firebase-58fb5.appspot.com',
  messagingSenderId: '618202520141'
}
const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()

export default db
