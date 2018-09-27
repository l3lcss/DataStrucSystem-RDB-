<template>
  <div id="app">
    <b-loading :is-full-page="true" :active.sync="getIsLoading"></b-loading>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import db from '@/config/firebase'
export default {
  name: 'App',
  methods: {
    ...mapActions([
      'setIsLoading',
      'setTADetails',
      'firebaseLogout'
    ])
  },
  computed: {
    ...mapGetters([
      'getIsLoading'
    ])
  },
  async mounted () {
    this.setIsLoading(true)
    await this.setTADetails(db.ref('ta'))
    await this.firebaseLogout()
    this.setIsLoading(false)
  }
}
</script>
