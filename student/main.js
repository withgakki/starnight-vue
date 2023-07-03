import App from './App'
import Vue from 'vue'
import uView from 'uni_modules/uview-ui'

// 挂载全局方法
import { parseLevel, parseSex, parseQuestionType } from 'utils/starnight.js'
Vue.prototype.parseLevel = parseLevel
Vue.prototype.parseSex = parseSex
Vue.prototype.parseQuestionType = parseQuestionType

Vue.use(uView)

Vue.config.productionTip = true

App.mpType = 'app'

import store from '@/store';

const app = new Vue({
  store,
  ...App
})

// 引入请求封装，将app参数传递到配置中
require('@/config/http.interceptor.js')(app)

app.$mount()