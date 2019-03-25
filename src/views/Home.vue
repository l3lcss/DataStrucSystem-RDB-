<template>
  <div class="columns is-mobile is-centered">
    <div class="column">
      <div class="columns is-mobile is-centered ">
        <div class="column is-8">
          <div class="glitch load1 " data-text="DATASTRUCTURE" style="color:white;margin-bottom:1vh;">DATASTRUCTURE</div>
        </div>
      </div>
      <div class="columns is-mobile is-centered ">
        <div class="column is-8 load2">
          <b-field>
            <b-input placeholder="USERNAME"
              icon="account"
              autocomplete="off"
              v-model="studentID">
            </b-input>
          </b-field>
        </div>
      </div>
      <div class="columns is-mobile is-centered ">
        <div class="column is-8 load3">
          <b-field>
            <b-input placeholder="PASSWORD"
              type="password"
              pack="fas"
              icon="lock-open"
              autocomplete="off"
              v-model="password">
            </b-input>
          </b-field>
        </div>
      </div>
      <div class="columns is-mobile is-centered ">
        <div class="column is-8 load4">
          <a class="button is-medium" @click="Login()" id="btnLogin" >
            <span class="icon" style="margin: 0 1.1vw 0 0vw">
              <b-icon
                icon="arrow-right-bold-box"
                size="is-medium">
            </b-icon>
            </span>
            <span>LOGIN</span>
          </a>
        </div>
      </div>
      <div class="columns is-mobile is-centered ">
        <div class="column is-8 load4">
          <a class="button is-medium" @click="forgetPass()" id="forgetPass" >
            <span class="icon" style="margin: 0 1.1vw 0 0vw">
              <b-icon
                icon="lock-reset"
                size="is-medium">
            </b-icon>
            </span>
            <span>FORGET PASSWORD</span>
          </a>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isComponentModalActive">
      <modal-set-pass />
    </b-modal>
  </div>
</template>

<script>
import ScrollReveal from 'scrollreveal'
import ModalSetPass from './ModalSetPass'
import { mapActions } from 'vuex'
import firebase from '@firebase/app'
import '@firebase/auth'

export default {
  name: 'Home',
  data () {
    return {
      studentID: '',
      password: '',
      isComponentModalActive: false
    }
  },
  async mounted () {
    ScrollReveal().reveal('.load1')
    ScrollReveal().reveal('.load2', { delay: 100 })
    ScrollReveal().reveal('.load3', { delay: 200 })
    ScrollReveal().reveal('.load4', { delay: 300 })
  },
  components: {
    ModalSetPass
  },
  methods: {
    ...mapActions([
      'setIsLoading',
      'verifyUserLogin',
      'setIsVerify'
    ]),
    async Login () {
      this.setIsLoading(true)
      if (this.studentID) {
        const params = {
          id: this.studentID.replace(/\s/g, ''),
          pass: this.password
        }
        const res = await this.verifyUserLogin(params)
        if (res.success && res.data.FIRST_LOGIN) {
          this.isComponentModalActive = true
        } else if (res.success && res.data.identity === 'ta') {
          this.$alert(res.message, 'is-success')
          this.$router.push({ name: 'TAschedule' })
          this.setIsVerify(true)
        } else if (res.success && res.data.identity === 'students') {
          this.$alert(res.message, 'is-success')
          this.$router.push({ name: 'Schedules' })
          this.setIsVerify(true)
        } else {
          this.$alert(res.message, 'is-danger')
        }
      }
      this.setIsLoading(false)
    },
    forgetPass () {
      const vm = this
      this.$dialog.prompt({
        message: `<center><b>RESET PASSWORD</b></center>Please fill in Student ID.`,
        inputAttrs: {
          placeholder: 'e.g. 61060216xxxx',
          maxlength: 13
        },
        onConfirm: (value) => {
          vm.$dialogConfirm(
            'is-info',
            'RESET PASSWORD',
            `We will send a password reset email to <strong>${value}@fitm.kmutnb.ac.th</strong>`,
            'Send Email',
            () => vm.confirmResetPass(value)
          )
        }
      })
    },
    async confirmResetPass (value) {
      this.setIsLoading(true)
      try {
        await firebase.auth().sendPasswordResetEmail(`${value}@fitm.kmutnb.ac.th`)
        this.$alert('send reset password success.', 'is-success')
      } catch (error) {
        this.$alert(`send reset password failed, ${error}.`, 'is-danger')
      }
      this.setIsLoading(false)
    }
  }
}
</script>

<style>
#username, #password {
  color:aliceblue;
}
.btn {
  background-color: #c9788c;
  color: black;
  font-weight: bold;
}
.btn:hover, .btn:focus {
  background-color: rgb(52, 42, 42);
  color: #c9788c;
}
#btnLogin {
  background-color: #c9788c;
  border: none;
}
#btnLogin:hover {
  transition: 0.3s all;
  background-color: rgb(255, 167, 167);
}
#forgetPass {
  background-color: #3c64c2;
  border: none;
}
#forgetPass:hover {
  transition: 0.3s all;
  background-color: rgb(107, 105, 223)
}

</style>
