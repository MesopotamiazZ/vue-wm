import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'
// import Seller from '../components/seller/Seller.vue'
import Ratings from '../components/ratings/Ratings.vue'
import Btn from '../components/btn/btn.vue'

Vue.use(Router)
const routes = [
  {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Btn
    }
]

export default new Router({
  linkActiveClass: 'router-link-active',
  routes
})
