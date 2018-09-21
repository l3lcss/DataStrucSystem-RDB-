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
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import TA1 from './TA1'
import TA2 from './TA2'
export default {
  name: 'Schedules',
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
    TA2
  },
  methods: {
    ...mapActions([
      'initData'
    ])
  },
  async mounted () {
    await this.initData()
  }
}
</script>
