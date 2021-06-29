import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../views/Store.vue'
import category from '../views/Category.vue'
import menu from '../views/Menu.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: store
  },
  {
    path: '/store',
    name: 'Store',
    component: store
  },
  {
    path: '/category',
    name: 'Category',
    component: category
  },
  {
    path: '/menu',
    name: 'Menu',
    component: menu
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
