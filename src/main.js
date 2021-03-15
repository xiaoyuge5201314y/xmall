import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/assets/style/base.css'

Vue.prototype.$bus = new Vue();

// eleui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI);

//axios
import axios from 'axios'
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://192.168.1.9/api"

axios.interceptors.response.use(response => {
  if (response.status == 200) {
    return response.data;
  }
  return response;
})

// 全局守卫
router.beforeEach((to, from, next) => {
  // 已登录 放行
  if (localStorage.getItem('userInfo')) {
    next();
  } else {
    // 未登录 需要权限 跳到登录页
    if (to.matched.some(record => record.meta.auth)) {
      next('/login?redirect=' + to.fullPath)
      // 不需要权限放行
    } else {
      next();
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')