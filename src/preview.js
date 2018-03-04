// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
import store from './store/preview'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuetify/dist/vuetify.min.css'
import Preview from './Preview.vue'
import mixins from './mixins/base'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuetify)

Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Preview },
  template: '<Preview/>'
})
