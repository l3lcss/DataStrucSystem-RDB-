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
          <div class="column is-4" style="margin: auto;text-align:center">
            <img :src="srcRef" width="30%">
          </div>

          <!-- <div class="column is-8">
            <center>
              <p class="tableHead"> ตารางเวลา </p>
              <table class="table">
                <thead>
                  <th>Time</th>
                  <th>Name</th>
                  <th>จอง</th>
                </thead>
                <tbody>
                  <tr v-for="(schedule, key) in userDetails" :key="key">
                    <th>{{schedule.time}}</th>
                    <td v-if="schedule.name">{{schedule.name}}</td>
                    <td v-else></td>
                    <td v-if="schedule.ID && schedule.ID !== getUserLogin['.key']">
                      <b-field>
                        <b-radio-button
                          native-value="Disabled"
                          disabled>
                          Disabled
                        </b-radio-button>
                      </b-field>
                    </td>
                    <td v-else-if="(getUserLogin.schedule.time !== schedule.time && (getUserLogin.schedule.TA !== '' && getUserLogin.schedule.TA)) || (getUserLogin.schedule.TA !== '11' && getUserLogin.schedule.TA !== '')">
                      <b-field>
                        <b-radio-button
                          disabled
                          v-model="schedule.nativeValue"
                          :native-value="true"
                          type="is-success">
                          <b-icon icon="check"></b-icon>
                          <span>Yes</span>
                        </b-radio-button>

                        <b-radio-button
                          disabled
                          v-model="schedule.nativeValue"
                          :native-value="false"
                          type="is-danger">
                          <b-icon icon="close"></b-icon>
                          <span>No</span>
                        </b-radio-button>
                      </b-field>
                    </td>
                    <td v-else-if="!getUserLogin.schedule.TA || getUserLogin.schedule.TA === '11'">
                      <b-field>
                        <b-radio-button
                          v-model="schedule.nativeValue"
                          :native-value="true"
                          type="is-success"
                          @input="reservEventYes(schedule.time)">
                          <b-icon icon="check"></b-icon>
                          <span>Yes</span>
                        </b-radio-button>

                        <b-radio-button
                          v-model="schedule.nativeValue"
                          :native-value="false"
                          type="is-danger"
                          @input="reservEventNo(schedule.time)">
                          <b-icon icon="close"></b-icon>
                          <span>No</span>
                        </b-radio-button>
                      </b-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </div> -->
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
    this.srcRef = `../../assets/${this.getUserLogin.anotherName}.png`
    if (Object.keys(this.getUserLogin).length === 0) {
      this.setIsLoading(false)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
