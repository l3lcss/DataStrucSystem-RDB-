<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Define your password</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Old-Password" v-if="isChangePass">
          <b-input
            v-model="old_pass"
            type="password"
            password-reveal
            placeholder="Your old password"
            required>
          </b-input>
        </b-field>

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
      old_pass: '',
      pass: '',
      re_pass: ''
    }
  },
  props: ['isChangePass'],
  methods: {
    ...mapActions([
      'setPassword'
    ]),
    async setPass () {
      if ((this.pass === this.re_pass && this.pass && this.re_pass) && (this.old_pass === this.getUserLogin.password || !this.isChangePass)) {
        const params = {
          id: this.getUserLogin['.key'],
          pass: this.pass,
          isChangePass: this.isChangePass
        }
        let res = await this.setPassword(params)
        if (res.success) {
          this.$alert('set password successfully.', 'is-success')
          this.$parent.close()
        } else {
          this.$alert(`set password failed ${res.err}.`, 'is-danger')
        }
      } else if (this.old_pass !== this.getUserLogin.password) {
        this.$alert('รหัสผ่านไม่ตรงกันกับ รหัสผ่านเดิม!!', 'is-danger')
      } else {
        this.$alert('รหัสผ่านไม่เหมือนกัน หรือยังไม่ได้กรอกรหัสผ่าน!!', 'is-danger')
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserLogin'
    ])
  }
}
</script>
