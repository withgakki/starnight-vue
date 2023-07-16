import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/starnight.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import plugins from './plugins' // plugins

import '@/icons' // icon
import '@/permission' // permission control

import * as echarts from 'echarts'  // echarts
import CountTo from 'vue-count-to'  // vue-count-to

import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree, parseLevel, parseSex, parseSubject, parseQuestionType, parseEditUrl } from "@/utils/starnight"

// 分页组件
import Pagination from "@/components/Pagination"
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('count-to', CountTo)

// 全局方法挂载
Vue.prototype.$echarts = echarts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree
Vue.prototype.parseLevel = parseLevel
Vue.prototype.parseSex = parseSex
Vue.prototype.parseSubject = parseSubject
Vue.prototype.parseQuestionType = parseQuestionType
Vue.prototype.parseEditUrl = parseEditUrl

Vue.use(plugins)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
