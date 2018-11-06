<template>
  <div>
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="TITLE">TITLE</div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-12 load">
        <div class="columns is-centered">
          <div class="column is-12">
            <center>
              <p class="tableHead"> ตารางเวลา </p>
              <table class="table">
                <thead>
                  <th>Time</th>
                  <th>ID</th>
                  <th>Name</th>
                </thead>
                <tbody>
                  <tr v-for="(schedule, key) in getUserLogin.schedules" :key="key">
                    <th>{{schedule.time}}</th>
                    <td v-if="schedule.ID">{{schedule.ID}}</td>
                    <td v-else></td>
                    <td v-if="schedule.name">{{schedule.name}}</td>
                    <td v-else></td>
                  </tr>
                </tbody>
              </table>
            </center>
          </div>
        </div>
      </div>
    </div>
    <fab-menu />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fabMenu from '../fabMenu'
export default {
  name: 'TAschedule',
  data () {
    return {
      srcRef: ''
    }
  },
  components: {
    fabMenu
  },
  computed: {
    ...mapGetters([
      'getUserLogin'
    ])
  },
  methods: {
    ...mapActions([
      'setIsLoading'
    ])
  },
  async mounted () {
    if (Object.keys(this.getUserLogin).length === 0) {
      this.setIsLoading(false)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit');
.table {
  font-family: 'Kanit', sans-serif;
  text-align:center;
}
table td, table th {
  text-align:center;
  font-size: 1rem;
  vertical-align: middle;
}
.tableHead {
  font-family: 'Kanit', sans-serif;
  font-size: 100%;
  color:#fff;
  padding-bottom: 5%;
}
</style>
