import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false

Vue.prototype.$alert = (message, type) => {
  Vue.prototype.$toast.open({
    queue: false,
    duration: 3000,
    message,
    position: 'is-top-right',
    type
  })
}

Vue.prototype.$dialogAlert = (type, title, message) => {
  Vue.prototype.$dialog.confirm({
    type,
    title,
    message
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
