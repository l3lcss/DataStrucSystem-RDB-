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
    ])
  },
  computed: {
    ...mapGetters([
      'getIsLoading',
      'getTADetails',
      'getIsVerify',
      'getUserRef',
      'getUserLogin'
    ])
  },
  async mounted () {
    this.setIsLoading(true)
    window.location.reload()
    this.setTADetails(db.ref('ta'))
    let auth = await firebaseFunc.verifyFirebaseLogin()
    if (auth) {
      let param = {
        id: auth.email.split('@')[0],
        isAutoLogin: true
      }
      await this.verifyUserLogin(param)
      this.setIsVerify(true)
      if (this.getUserLogin.identity === 'ta') {
        this.$router.push({ name: 'TAschedule' })
      } else {
        this.$router.push({ name: 'Schedules' })
      }
    } else {
      this.setIsVerify(true)
      this.$router.push({ name: 'Home' })
    }
    this.setIsLoading(false)
  }
}
</script>
