<template>
  <div class="columns is-mobile is-centered">
    <div class="column">
      <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
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
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      studentID: '',
      password: '',
      isComponentModalActive: false
    }
  },
  mounted () {
    ScrollReveal({ reset: true })
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
      'verifyUserLogin'
    ]),
    async Login () {
      this.isLoading = true
      if (this.studentID) {
        this.verifyUserLogin('asdfghjk')
        this.$router.push({ name: 'HelloWorld' })
        // const params = {
        //   id: this.studentID,
        //   pass: this.password
        // }
        // const res = await this.verifyUserLogin(params)
        // console.log(res, 'res')
        // if (res.data.FIRST_LOGIN) {
        //   this.isComponentModalActive = true
        // } else if (res.success && res.data.identity === 'Admin') {
        //   this.$alert(res.message, 'is-success')
        //   this.$router.push({ name: 'Admin' })
        // } else if (res.success) {
        //   this.$alert(res.message, 'is-success')
        //   this.$router.push({ name: 'Dashboard' })
        // } else {
        //   this.$alert(res.message, 'is-danger')
        // }
      }
      this.isLoading = false
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
body {
  background: black;
  font-family: 'Varela', sans-serif;
}

.glitch {
  font-size: 11vw;
  color: #c9788c;
  position: relative;
}

@keyframes noise-anim {
  0% {
    clip: rect(399px, 19999px, 394px, 0);
  }
  5% {
    clip: rect(255px, 19999px, 266px, 0);
  }
  10% {
    clip: rect(27px, 19999px, 29px, 0);
  }
  15% {
    clip: rect(168px, 19999px, 254px, 0);
  }
  20% {
    clip: rect(127px, 19999px, 280px, 0);
  }
  25% {
    clip: rect(173px, 19999px, 257px, 0);
  }
  30% {
    clip: rect(155px, 19999px, 278px, 0);
  }
  35% {
    clip: rect(198px, 19999px, 288px, 0);
  }
  40% {
    clip: rect(196px, 19999px, 255px, 0);
  }
  45% {
    clip: rect(154px, 19999px, 27px, 0);
  }
  50% {
    clip: rect(128px, 19999px, 216px, 0);
  }
  55% {
    clip: rect(170px, 19999px, 267px, 0);
  }
  60% {
    clip: rect(193px, 19999px, 24px, 0);
  }
  65% {
    clip: rect(181px, 19999px, 219px, 0);
  }
  70% {
    clip: rect(113px, 10999px,2 51px, 0);
  }
  75% {
    clip: rect(114px, 9999px, 287px, 0);
  }
  80% {
    clip: rect(153px, 9999px, 252px, 0);
  }
  85% {
    clip: rect(125px, 9999px, 272px, 0);
  }
  90% {
    clip: rect(148px, 9999px, 236px, 0);
  }
  95% {
    clip: rect(84px, 9999px, 265px, 0);
  }
  100% {
    clip: rect(175px, 9999px, 18px, 0);
  }
}
.glitch:after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -1px 0 red;
  top: 0;
  color: #c9788c;
  background: black;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
}

@keyframes noise-anim-2 {
  0% {
    clip: rect(13px, 9999px, 50px, 0);
  }
  5% {
    clip: rect(72px, 9999px, 75px, 0);
  }
  10% {
    clip: rect(54px, 9999px, 79px, 0);
  }
  15% {
    clip: rect(73px, 9999px, 11px, 0);
  }
  20% {
    clip: rect(24px, 9999px, 8px, 0);
  }
  25% {
    clip: rect(75px, 9999px, 7px, 0);
  }
  30% {
    clip: rect(46px, 9999px, 90px, 0);
  }
  35% {
    clip: rect(39px, 9999px, 69px, 0);
  }
  40% {
    clip: rect(9px, 9999px, 22px, 0);
  }
  45% {
    clip: rect(62px, 9999px, 85px, 0);
  }
  50% {
    clip: rect(100px, 9999px, 94px, 0);
  }
  55% {
    clip: rect(34px, 9999px, 31px, 0);
  }
  60% {
    clip: rect(85px, 9999px, 61px, 0);
  }
  65% {
    clip: rect(27px, 9999px, 1px, 0);
  }
  70% {
    clip: rect(43px, 9999px, 67px, 0);
  }
  75% {
    clip: rect(14px, 9999px, 49px, 0);
  }
  80% {
    clip: rect(91px, 9999px, 83px, 0);
  }
  85% {
    clip: rect(20px, 9999px, 35px, 0);
  }
  90% {
    clip: rect(43px, 9999px, 6px, 0);
  }
  95% {
    clip: rect(97px, 9999px, 28px, 0);
  }
  100% {
    clip: rect(26px, 9999px, 25px, 0);
  }
}
.glitch:before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  text-shadow: 1px 0 blue;
  top: 0;
  color: #c9788c;
  background: black;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim-2 3s infinite linear alternate-reverse;
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
