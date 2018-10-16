import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Element from 'element-ui'
import router from './router'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

Vue.use(Element, { size: 'small', zIndex: 3000 });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
