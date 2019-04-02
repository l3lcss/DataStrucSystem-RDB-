<template>
  <div id="app">
    <b-loading :is-full-page="true" :active.sync="getIsLoading"></b-loading>
    <router-view v-if="getIsVerify"/>
  </div>
</template>

<script>
import axios from 'axios'
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
      'verifyUserLogin',
      'firebaseLogout'
    ]),
    checkVersion () {
      let vm = this
      axios.get('/static/version.txt?t=' + Date.now())
        .then(function (response) {
          console.log(response, 'response')
          let clientScriptVersion = window.webVersion.trim()
          let serverScriptVersion = response.data.trim()
          if (clientScriptVersion === serverScriptVersion) {
            vm.isUpToDate = true
          } else {
            vm.isUpToDate = false
            vm.$dialog.confirm({
              title: 'CHECK VERSION UPDATE',
              message: 'Your version is behide, Please reload to latest version.',
              onConfirm: async () => {
                await vm.firebaseLogout()
                window.location.href = 'https://datastrucsystem.netlify.com/'
              }
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
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
  },
  created () {
    this.checkVersion()
    setInterval(this.checkVersion, 10000)
  }
}
</script>
