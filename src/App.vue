<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import db from '@/config/firebase'
export default {
  name: 'App',
  methods: {
    ...mapActions([
      'setIsLoading',
      'setTADetails'
    ])
  },
  async mounted () {
    this.setIsLoading(true)
    await this.setTADetails(db.ref('ta'))
    this.setIsLoading(false)
  }
}
</script>
