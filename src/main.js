import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from './router'

// vant 按需引用
import vant from './vant/vant'
import api from './api/index'
import 'vant/lib/index.css';
Vue.use(vant)

Vue.config.productionTip = false
Vue.prototype.$api = api;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
