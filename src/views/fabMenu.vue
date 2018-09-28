<template>
  <div>
    <v-speed-dial
      v-model="fab"
      :top="true"
      :right="true"
      :fixed="true"
      direction="bottom"
      slot="activator"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
        :icon="true"
      >
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        large
        color="teal darken-1"
        @click="changePass()"
      >
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        large
        color="red"
        @click="logOut()"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'fabMenu',
  data () {
    return {
      fab: false
    }
  },
  methods: {
    ...mapActions([
      'firebaseLogout',
      'changePassword'
    ]),
    async logOut () {
      await this.firebaseLogout()
      this.$router.push({ name: 'Home' })
    },
    async changePass () {
      console.log('changePass()')
      let res = await this.changePassword(this.getUserLogin)
      console.log(res, 'res')
      if (res.success) {
        this.$alert(`send reset password success, ${res.res}`, 'is-success')
      } else {
        this.$alert(`send reset password failed, ${res.err}.`, 'is-danger')
      }
      console.log('change Pass')
    }
  },
  computed: {
    ...mapGetters([
      'getUserLogin'
    ])
  }
}
</script>
