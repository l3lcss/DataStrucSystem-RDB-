<template>
  <div v-if="getIsVerify">
    <div class="columns is-mobile is-centered header">
      <div class="column is-10 load is-size-5 has-text-weight-bold">
        <div class="glitch load is-mobile" style="color: #ffffff;" data-text="BST">BST</div>
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
        <b-tabs type="is-boxed" size="is-large" class="is-mobile">
          <b-tab-item label="TA1">
            <b-table
              style="font-size:1.3rem;"
              :data="getTADetails[0].history_test ? mapDataByDate(getTADetails[0].history_test) : []">
              <template slot-scope='props' class="is-large">
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
                  <span class="tag is-warning is-large" v-if="props.row.status === 'PENDING'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-success is-large" v-if="props.row.status === 'PASSED'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-danger is-large" v-if="props.row.status === 'FAILED'">
                    {{ props.row.status }}
                  </span>
                </b-table-column>
              </template>
            </b-table>
          </b-tab-item>

          <b-tab-item label="TA2">
            <b-table
              style="font-size:1.3rem;"
              :data="getTADetails[1].history_test ? mapDataByDate(getTADetails[1].history_test) : []">
              <template slot-scope='props' class="is-large">
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
                <b-table-column field="time" label="Time" sortable centered>
                  {{ props.row.time }}
                </b-table-column>
                <b-table-column field="status" label="Status" sortable centered>
                  <span class="tag is-warning is-large" v-if="props.row.status === 'PENDING'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-success is-large" v-if="props.row.status === 'PASSED'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-danger is-large" v-if="props.row.status === 'FAILED'">
                    {{ props.row.status }}
                  </span>
                </b-table-column>
              </template>
            </b-table>
          </b-tab-item>

          <b-tab-item label="TA3">
            <b-table
              style="font-size:1.3rem;"
              :data="getTADetails[2].history_test ? mapDataByDate(getTADetails[2].history_test) : []">
              <template slot-scope='props' class="is-large">
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
                <b-table-column field="time" label="Time" sortable centered>
                  {{ props.row.time }}
                </b-table-column>
                <b-table-column field="status" label="Status" sortable centered>
                  <span class="tag is-warning is-large" v-if="props.row.status === 'PENDING'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-success is-large" v-if="props.row.status === 'PASSED'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-danger is-large" v-if="props.row.status === 'FAILED'">
                    {{ props.row.status }}
                  </span>
                </b-table-column>
              </template>
            </b-table>
          </b-tab-item>

          <b-tab-item label="TA4">
            <b-table
              style="font-size:1.3rem;"
              :data="getTADetails[3].history_test ? mapDataByDate(getTADetails[3].history_test) : []">
              <template slot-scope='props' class="is-large">
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
                <b-table-column field="time" label="Time" sortable centered>
                  {{ props.row.time }}
                </b-table-column>
                <b-table-column field="status" label="Status" sortable centered>
                  <span class="tag is-warning is-large" v-if="props.row.status === 'PENDING'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-success is-large" v-if="props.row.status === 'PASSED'">
                    {{ props.row.status }}
                  </span>
                  <span class="tag is-danger is-large" v-if="props.row.status === 'FAILED'">
                    {{ props.row.status }}
                  </span>
                </b-table-column>
              </template>
            </b-table>
          </b-tab-item>

        </b-tabs>
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
    }
  }
}
</script>
