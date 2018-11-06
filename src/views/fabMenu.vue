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
      'changePassword',
      'setIsLoading'
    ]),
    async logOut () {
      await this.firebaseLogout()
      this.$router.push({ name: 'Home' })
    },
    changePass () {
      this.$dialogConfirm(
        'is-info',
        'RESET PASSWORD',
        `We will send a password reset email to <strong>${this.getUserLogin['.key']}@gmail.com</strong>`,
        'Send Email',
        () => this.sendEamil()
      )
    },
    async sendEamil () {
      this.setIsLoading(true)
      let res = await this.changePassword(this.getUserLogin)
      if (res.success) {
        this.$alert(res.message, 'is-success')
        this.$router.push({ name: 'Home' })
      } else {
        this.$alert(`send reset password failed, ${res.error}.`, 'is-danger')
      }
      this.setIsLoading(false)
    }
  },
  computed: {
    ...mapGetters([
      'getUserLogin'
    ])
  }
}
</script>
