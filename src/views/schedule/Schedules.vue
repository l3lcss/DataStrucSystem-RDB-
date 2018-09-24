<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="getIsLoading"></b-loading>
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="TITLE">TITLE</div>
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
          <slide>
            <TA5 />
          </slide>
        </carousel>
      </div>
    </div>
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
        color="red"
        @click="logOut()"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import TA1 from './TA1'
import TA2 from './TA2'
import TA3 from './TA3'
import TA4 from './TA4'
import TA5 from './TA5'
export default {
  name: 'Schedules',
  data () {
    return {
      fab: false
    }
  },
  computed: {
    ...mapGetters([
      'getUserLogin',
      'getIsLoading'
    ])
  },
  components: {
    Carousel,
    Slide,
    TA1,
    TA2,
    TA3,
    TA4,
    TA5
  },
  methods: {
    ...mapActions([
      'initData'
    ]),
    logOut () {
      this.$router.push({ name: 'Home' })
    }
  },
  async mounted () {
    if (Object.keys(this.getUserLogin).length === 0) {
      this.$router.push({ name: 'Home' })
    } else {
      await this.initData()
    }
  }
}
</script>
