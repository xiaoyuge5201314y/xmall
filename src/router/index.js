import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  component: () => import('@/views/Home.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/Login.vue')
}, {
  path: '/goodsDetails',
  name: 'goodsDetails',
  component: () => import('@/views/GoodsDetails.vue'),
  meta: {
    auth: true
  }
}, {
  path: '/order',
  component: () => import('@/views/Order.vue'),
  meta: {
    auth: true
  }
},{
  path: '/goods',
  component: () => import('@/views/Goods.vue'),
}]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router