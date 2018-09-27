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
        @click="changePassword()"
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
    <b-modal :active.sync="isComponentModalActive">
      <modal-set-pass :isChangePass="true" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalSetPass from './ModalSetPass'
export default {
  name: 'fabMenu',
  data () {
    return {
      fab: false,
      isComponentModalActive: false
    }
  },
  methods: {
    ...mapActions([
      'firebaseLogout'
    ]),
    async logOut () {
      await this.firebaseLogout()
      this.$router.push({ name: 'Home' })
    },
    changePassword () {
      this.isComponentModalActive = true
    }
  },
  components: {
    ModalSetPass
  }
}
</script>
