<template>
  <div class="columns is-mobile is-centered">
    <div class="column">
      <b-loading :is-full-page="true" :active.sync="getIsLoading"></b-loading>
      <div class="columns is-mobile is-centered ">
        <div class="column is-8">
          <div class="glitch load1 " data-text="BLACKPINK" style="color:white;margin-bottom:1vh;">BLACKPINK</div>
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
              v-model="password"
              password-reveal>
            </b-input>
          </b-field>
        </div>
      </div>
      <div class="columns is-mobile is-centered ">
        <div class="column is-8 load4">
          <a class="button is-medium" @click="Login()" id="btnLogin" >
            <span class="icon">
              <b-icon
                icon="arrow-right-bold-box"
                size="is-medium">
            </b-icon>
            </span>
            <span>LOGIN</span>
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
import { mapActions, mapGetters } from 'vuex'

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
      'setTADetails',
      'setAuthentication'
    ]),
    async Login () {
      this.setIsLoading(true)
      if (this.studentID) {
        const params = {
          id: this.studentID,
          pass: this.password
        }
        const res = await this.verifyUserLogin(params)
        if (res.success && res.data.FIRST_LOGIN) {
          this.isComponentModalActive = true
        } else if (res.success && res.data.identity === 'ta') {
          this.$alert(res.message, 'is-success')
          await this.setAuthentication()
          this.$router.push({ name: 'TAschedule' })
        } else if (res.success && res.data.identity === 'student') {
          this.$alert(res.message, 'is-success')
          await this.setAuthentication()
          this.$router.push({ name: 'Schedules' })
        } else {
          this.$alert(res.message, 'is-danger')
        }
      }
      this.setIsLoading(false)
    }
  },
  computed: {
    ...mapGetters([
      'getIsLoading',
      'getUserLogin'
    ])
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

</style>
