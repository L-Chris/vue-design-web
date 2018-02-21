// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import store from './store'
import router from './router'
// import Rx from 'rxjs/Rx'
// import VueRx from 'vue-rx'
import mixins from './mixins/base'

Vue.config.productionTip = false

// Vue.use(VueRx, Rx)
Vue.use(ElementUI)
Vue.use(Vuetify)

Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
