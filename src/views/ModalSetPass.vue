<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Define your password</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Password">
          <b-input
            v-model="pass"
            type="password"
            password-reveal
            placeholder="Your password"
            required>
          </b-input>
        </b-field>

        <b-field label="Re-Password">
          <b-input
            v-model="re_pass"
            type="password"
            password-reveal
            placeholder="Your password"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary" @click="setPass()">Confirm</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalSetPass',
  data () {
    return {
      pass: '',
      re_pass: ''
    }
  },
  methods: {
    ...mapActions([
      'setPassword',
      'setIsLoading'
    ]),
    async setPass () {
      this.setIsLoading(true)
      if (this.pass === this.re_pass) {
        const params = {
          id: this.getUserLogin['.key'],
          pass: this.pass,
          identity: this.getUserLogin.identity
        }
        let res = await this.setPassword(params)
        if (res.success) {
          this.$alert(res.message, 'is-success')
          this.$parent.close()
        } else {
          this.$alert(`set password failed : ${res.error}.`, 'is-danger')
        }
      } else {
        this.$alert('รหัสผ่านไม่เหมือนกัน หรือยังไม่ได้กรอกรหัสผ่าน!!', 'is-danger')
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
