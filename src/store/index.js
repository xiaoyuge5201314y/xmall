import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态
    login: false,
    // 用户信息
    userInfo: {},
    // 购物车
    cartList: [],
  },
  mutations: {
    LOGIN(state) {
      const user = localStorage.getItem('userInfo')
      state.login = !!user;
    },
    USERINFO(state, data) {
      state.userInfo = data;
    },
    CARTLIST(state, data) {
      // 已登录
      if (state.login) {
        const res = localStorage.getItem('cartList');
        // 本地存在就直接赋值
        if (res) {
          state.cartList = JSON.parse(res);
        }
        // 未登录 清空
      } else {
        state.cartList = [];
      }
    }
  },
  actions: {},
  modules: {}
})