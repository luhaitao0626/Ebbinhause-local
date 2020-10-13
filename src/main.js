import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Moment from 'moment'
import store from './vuex/store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

//Echarts import
import Echarts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart',Echarts)

Vue.use(ElementUI,{ size: 'small' })

Vue.config.productionTip = false


//自定义moment 自定义全局过滤器
Vue.filter('convertTime',function(data,formatStr){
  return Moment(data).format(formatStr);
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

