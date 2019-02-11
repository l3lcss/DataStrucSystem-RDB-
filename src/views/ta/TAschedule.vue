<template>
  <div>
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="BST">BST</div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-12 load">
        <div class="columns is-centered">
          <div class="column is-12">
            <center>
              <p class="tableHead"> ตารางเวลา </p>
                <b-table
                  style="font-size:1rem;"
                  :data="std ? std : []">
                  <template slot-scope='props'>
                    <b-table-column field="time" label="Time" sortable centered>
                      {{ props.row.time }}
                    </b-table-column>
                    <b-table-column field="ID" label="ID" centered>
                      {{ props.row.ID }}
                    </b-table-column>
                    <b-table-column field="date" label="Booking Date" centered>
                      <span class="tag is-info is-large">
                        {{ formatDate(props.row.date) }}
                      </span>
                    </b-table-column>
                    <b-table-column field="name" label="Name" centered>
                      {{ props.row.name }}
                    </b-table-column>
                    <b-table-column field="status" label="Status" sortable centered>
                      <b-field position="is-centered">
                        <b-radio-button v-model="props.row.status"
                          native-value="PASSED"
                          type="is-success">
                          <b-icon icon="check"></b-icon>
                          <span>PASSED</span>
                        </b-radio-button>

                        <b-radio-button v-model="props.row.status"
                          native-value="PENDING"
                          type="is-warning">
                          <span>PENDING</span>
                        </b-radio-button>

                        <b-radio-button v-model="props.row.status"
                          native-value="FAILED"
                          type="is-danger">
                          <b-icon icon="close"></b-icon>
                          <span>FAILED</span>
                        </b-radio-button>
                      </b-field>
                    </b-table-column>
                    <b-table-column field="" label="" centered>
                      <div class="button is-focused" @click="updateStatus(props.row)">
                        OK
                      </div>
                    </b-table-column>
                  </template>
                </b-table>
            </center>
          </div>
        </div>
      </div>
    </div>
    <fab-menu />
  </div>
</template>

<script>
import db from '../../config/firebase'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import fabMenu from '../fabMenu'
export default {
  name: 'TAschedule',
  data () {
    return {
      std: []
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
    ]),
    formatDate (d) {
      return moment(parseInt(d)).format('DD/MM/YYYY HH:mm:ss')
    },
    async updateStatus (data) {
      this.setIsLoading(true)
      let index = this.getUserLogin.schedules.findIndex(e => e.ID === data.ID && e.time === data.time)
      await db.ref(`ta/${this.getUserLogin['.key']}/schedules/${index}`).update({ status: data.status })
      index = this.getUserLogin.history_test.findIndex(e => e.ID === data.ID && e.date === data.date)
      await db.ref(`ta/${this.getUserLogin['.key']}/history_test/${index}`).update({ status: data.status })
      if (data.status === 'FAILED') {
        await db.ref(`students/${data.ID}/schedule`).update({ TA: '', time: '' })
      }
      this.setIsLoading(false)
    }
  },
  async mounted () {
    if (Object.keys(this.getUserLogin).length === 0) {
      this.setIsLoading(false)
      this.$router.push({ name: 'Home' })
    }
    this.std = this.getUserLogin.history_test.filter(e => {
      let isSame = moment(parseInt(e.date)).isSame(moment(new Date()), 'day')
      if (isSame) {
        return e
      }
    })
  },
  watch: {
    async getUserLogin () {
      this.std = this.getUserLogin.history_test.filter(e => {
        let isSame = moment(parseInt(e.date)).isSame(moment(new Date()), 'day')
        if (isSame) {
          return e
        }
      })
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
