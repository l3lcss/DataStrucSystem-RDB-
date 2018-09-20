import Vue from 'vue'
import Vuex from 'vuex'
import students from './modules/students'
import ta from './modules/ta'
import other from './modules/other'
import { firebaseMutations } from 'vuexfire'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    students,
    ta,
    other
  },
  mutations: firebaseMutations
})
