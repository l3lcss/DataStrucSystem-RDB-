import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)
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

Vue.prototype.$dialogConfirm = (type, title, message, confirmText, onConfirm) => {
  Vue.prototype.$dialog.confirm({
    type,
    title,
    message,
    confirmText,
    hasIcon: true,
    onConfirm
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
