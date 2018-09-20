<template>
  <div class="hello">
    {{ getStudents }} students <br>
    {{ getUserLogin }} userLogin
  </div>
</template>

<script>
import db from '@/config/firebase'
import { mapGetters } from 'vuex'
var stdRef = db.ref('students')

export default {
  name: 'Schedules',
  computed: {
    ...mapGetters([
      'getStudents',
      'getUserLogin'
    ])
  },
  created () {
    this.$store.dispatch('setStdRef', stdRef)
  },
  watch: {
    students (val) {
      console.log(val, 'watched')
    }
  }
}
</script>
