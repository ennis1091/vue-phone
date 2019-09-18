import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './common/css/base.css'
import './common/fonts/iconfont.css'
import './common/js/rem'
import './common/scss/common.scss'
import scroll from './base/scroll/scroll'
import {
  List,
  Toast,
  Dialog,
  Lazyload,
  Swipe,
  SwipeItem,
  IndexBar,
  IndexAnchor,
  Cell
} from 'vant'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'KF1pByQrTdaZ0nrq794WwmrmTPrdzTRR'
})
// 全局注册
Vue.use(Dialog)
  .use(List)
  .use(Toast)
  .use(Lazyload, { error: require('@/common/img/tou.jpg') })
  .use(Swipe)
  .use(SwipeItem)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Cell)

Vue.component('scroll', scroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
