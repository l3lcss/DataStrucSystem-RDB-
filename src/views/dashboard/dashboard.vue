<template>
  <div v-if="getIsVerify">
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="QS">QS</div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-12 load">
        <b-field class="column is-2 load" style="margin-left:1rem;">
          <b-datepicker
            placeholder="Click to select..."
            icon="calendar-today"
            v-model="datePicked">
          </b-datepicker>
        </b-field>
        <table class="table is-fullwidth table is-bordered">
            <thead>
              <th></th>
              <th>TA1</th>
              <th>TA2</th>
              <th>TA3</th>
              <th>TA4</th>
            </thead>
            <tbody>
              <tr v-for="(schedule, key) in getTADetails[0].schedules" :key="key">
                <td>
                  {{ schedule.time }}
                </td>
                <td v-for="(schedule2, key2) in getTADetails" :key="key2">
                  <span :class="displayColor(schedule2.history_test, schedule.time)">
                    {{ filterStdByDatePicker(schedule2.history_test, schedule.time) }}
                  </span>
                </td>
              </tr>
            </tbody>

        </table>
      </div>
    </div>
    <fab-menu />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fabMenu from '../fabMenu'
import moment from 'moment'
export default {
  name: 'Schedules',
  data () {
    return {
      datePicked: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'getUserRef',
      'getIsVerify',
      'getTADetails'
    ])
  },
  components: {
    fabMenu
  },
  methods: {
    ...mapActions([
      'setIsLoading'
    ]),
    mapDataByDate (data) {
      return data.filter(e => {
        let isSame = moment(parseInt(e.date)).isSame(moment(new Date(this.datePicked)), 'day')
        if (isSame) {
          return e
        }
      })
    },
    formatDate (d) {
      return moment(parseInt(d)).format('DD/MM/YYYY HH:mm:ss')
    },
    displayColor (data, time) {
      let res = data.find(e => {
        let isSame = moment(parseInt(e.date)).isSame(moment(new Date(this.datePicked)), 'day')
        if (isSame && e.time === time) {
          return e
        }
      })
      if (res && res.status === 'PASSED') {
        return 'tag is-success is-large'
      } else if (res && res.status === 'FAILED') {
        return 'tag is-danger is-large'
      } else if (res && res.status === 'PENDING') {
        return 'tag is-warning is-large'
      } else {
        return ''
      }
    },
    filterStdByDatePicker (data, time) {
      let res = data.find(e => {
        let isSame = moment(parseInt(e.date)).isSame(moment(new Date(this.datePicked)), 'day')
        if (isSame && e.time === time) {
          return e
        }
      })
      return res ? res.name : ''
    }
  }
}
</script>

<style>
.table.is-bordered td, .table.is-bordered th {
  border-width: 2px;
  border-color: black;
  vertical-align: middle;
  text-align: center;
}
.table thead td, .table thead th {
  border-width: 2px;
  border-color: black;
}
.table thead td, .table thead th {
  font-size: 2rem;
  text-align: center;
  background-color: lavender;
}
</style>
