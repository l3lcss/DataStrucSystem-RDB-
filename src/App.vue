<template>
  <div id="app">
    <b-loading :is-full-page="true" :active.sync="getIsLoading"></b-loading>
    <router-view v-if="getIsVerify"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebaseFunc from '@/utils/firebase'
import db from '@/config/firebase'
export default {
  name: 'App',
  methods: {
    ...mapActions([
      'setIsLoading',
      'setTADetails',
      'setIsVerify',
      'verifyUserLogin'
    ]),
    async unloadHandler () {
      let userRef = db.ref(this.getUserRef).child('statusActive')
      let res = await userRef.once('value')
      db.ref(userRef).update({
        number: res.val().number - 1
      })
    }
  },
  computed: {
    ...mapGetters([
      'getIsLoading',
      'getTADetails',
      'getIsVerify',
      'getUserRef'
    ])
  },
  async mounted () {
    this.setIsLoading(true)
    this.setTADetails(db.ref('ta'))
    let auth = await firebaseFunc.verifyFirebaseLogin()
    if (auth) {
      let param = {
        id: auth.email.split('@')[0]
      }
      await this.verifyUserLogin(param)
      this.setIsVerify(true)
      this.$router.push({ name: 'Schedules' })
    } else {
      this.setIsVerify(true)
      this.$router.push({ name: 'Home' })
    }
    this.setIsLoading(false)
  },
  created () {
    document.addEventListener('beforeunload', this.unloadHandler)
  }
}
</script>
