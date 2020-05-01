import Vue from 'vue'
import VueRouter from 'vue-router'
import City from '../views/City.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'cityHome',
    component: City
  },
]

const router = new VueRouter({
  routes
})

export default router
