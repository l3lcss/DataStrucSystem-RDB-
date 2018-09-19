<template>
  <div class="hello">
    {{ students }}
  </div>
</template>

<script>
import db from '@/config/firebase'
import { mapGetters } from 'vuex'
var stdRef = db.ref('students')

export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters([
      'students'
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
