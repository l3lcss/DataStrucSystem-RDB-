<template>
  <div v-if="getIsVerify">
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="TITLE">TITLE</div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-12 load">
        chghj
      </div>
    </div>
    <fab-menu />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fabMenu from '../fabMenu'
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
    fabMenu
  },
  methods: {
    ...mapActions([
      'setIsLoading'
    ])
  }
}
</script>
