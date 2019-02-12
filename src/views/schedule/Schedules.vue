<template>
  <div v-if="getIsVerify">
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="BST">BST</div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-12 load">
        <carousel :perPage="1" paginationActiveColor="#c9788c" paginationColor="#fff">
          <slide>
            <TA1 />
          </slide>
          <slide>
            <TA2 />
          </slide>
          <slide>
            <TA3 />
          </slide>
          <slide>
            <TA4 />
          </slide>
        </carousel>
      </div>
    </div>
    <fab-menu />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import fabMenu from '../fabMenu'
import TA1 from './TA1'
import TA2 from './TA2'
import TA3 from './TA3'
import TA4 from './TA4'
export default {
  name: 'Schedules',
  computed: {
    ...mapGetters([
      'getUserLogin',
      'getUserRef',
      'getIsVerify'
    ])
  },
  components: {
    Carousel,
    Slide,
    TA1,
    TA2,
    TA3,
    TA4,
    fabMenu
  },
  methods: {
    ...mapActions([
      'solveSchedule',
      'setIsLoading',
      'dailyReset'
    ]),
    async dailyReset1 () {
      this.setIsLoading(true)
      await this.dailyReset()
      this.setIsLoading(false)
    }
  },
  async mounted () {
    let vm = this
    if (Object.keys(this.getUserLogin).length === 0) {
      this.$router.push({ name: 'Home' })
    }
    if (this.getUserLogin.ASDASDHAKJSD) {
      this.$dialog.confirm({
        message: 'Continue to Daily reset ??',
        onConfirm: () => {
          vm.dailyReset1()
        }
      })
    }
    // await this.solveSchedule()
  }
}
</script>
