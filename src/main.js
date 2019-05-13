// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';
import '../src/axios/'
import store from './store/store'
import VueI18n from 'vue-i18n'
import echarts from 'echarts'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.prototype.$echarts = echarts
import './assets/icon/iconfont.css'
Vue.use(VueI18n) // 通过插件的形式挂载

import elCascaderMulti from "el-cascader-multi";
Vue.use(elCascaderMulti);
// import EleMultiCascader from "ele-multi-cascader"
// import "ele-multi-cascader/dist/cascader.css"

// Vue.use(Element)
// Vue.use(EleMultiCascader)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$http = Axios
Vue.config.productionTip = false

Vue.use(Viewer, {
  defaultOptions: {
      zIndex: 9999
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
