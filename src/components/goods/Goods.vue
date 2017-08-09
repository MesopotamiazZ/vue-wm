<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menuItems">
      	<li v-for="(menuItem, index) in goods" class="menuItem" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
      	  <span class="mitext">
      	  	<span v-show="menuItem.type>0" class="icon" :class="classMap[menuItem.type]"></span>{{ menuItem.name }}
      	  </span>
      	</li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul class="food-lists">
      	<li v-for="foodsItem in goods" class="food-list food-list-hook"><!-- 为了能通过dom操作得到这个元素，而设置class为food-list-hook,无实际效果 -->
      	  <h1 class="title">{{ foodsItem.name }}</h1>
      	  <ul class="foods">
      	  	<li @click="selectFood(food,$event)" v-for="food in foodsItem.foods" class="food">
      	  	  <div class="food-icon">
      	  	  	<img :src="food.icon">
      	  	  </div>
      	  	  <div class="food-content">
      	  	  	<h2 class="name">{{ food.name }}</h2>
      	  	  	<p class="desc">{{ food.description }}</p>
      	  	  	<div class="extra">
      	  	  	  <span>月售{{ food.sellCount }}</span><span>好评率{{ food.rating }}%</span>
      	  	  	</div>
      	  	  	<div class="price">
      	  	  	  <span class="now">￥{{ food.price }}</span><span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
      	  	  	  <div class="cartcontrol-wrapper">
      	  	  	    <!-- 通过监听add事件，可以让子组件定义的emit方法生效,并触发addFood方法 -->
      	  	  	  	<cartcontrol v-on:add="addFood" :food="food"></cartcontrol>
      	  	  	  </div>
      	  	  	</div>
      	  	  </div>
      	  	</li>
      	  </ul>
      	</li>
      </ul>
    </div>
    <!-- ref="Shopcart"这个属性可以让父组件访问到子组件的方法 -->
    <shopcart ref="Shopcart" v-bind:selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart><!-- 应用shopcart组件 -->
    <food :food="selectedFood" ref="Food"></food><!-- 在这卡了一天血泪教训，food组件中class属性名字与之前class名字重复导致之前效果被覆盖，一定要引以为戒 -->
  </div>
</template>

<script>
  import Shopcart from '../shopcart/shopcart.vue'
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'
  import Food from '../food/food.vue'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [], // 定义一个数组存放foodsWrapper每一个区间的height位置
        scrollY: 0, // 定义foodsWrapper展示框最上面对应的foodsWrapper的height(高度)
        selectedFood: {} // 被选中的商品食物
      }
    },
    computed: { // 定义变化属性
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
  	created() { // 这个钩子是created不是create,找了半个小时
      this.classMap = ['decrease', 'discount', 'special', 'guarantee', 'invoice']
      axios.get('/api/goods').then((response) => {
        // 这里的response.data属性是axios所提供的
        response = response.data
        // console.log(response)
        if (response.errno === 0) {
          // 这里的response.data属性是goods对象的
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  	},
  	methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0 // 从上至下第一个区块开始height为0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index] // 得到点击menu所对应的foodItems的这个元素
        this.foodsScroll.scrollToElement(el, 300)
      },
      addFood(target) {
        this._drop(target)
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.Shopcart.drop(target)
        })
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.Food.show()
      }
  	},
  	components: {
      Shopcart: Shopcart,
      Cartcontrol: Cartcontrol,
      Food: Food
  	}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex-grow: 0
    flex-shrink: 0
    flex-basis: 80px
    width: 80px
    background: #f3f5f7
    // overflow: hidden
    .menuItems
      list-style: none
      width: 80px
      font-size: 12px
      // overflow-x: hidden
      // overflow-y: scroll
      display: table
      .menuItem
      	// width: 100%
      	padding: 0 12px
      	margin: 0 auto
      	height: 62px
      	border-bottom: 0.083em solid rgba(7, 17, 27, 0.1)
      
      	// position: absolute
      	.mitext
      	  position: relative
      	  top: 22px
      	  line-height: 12px
      	  .icon
      	    display: inline-block
          	width: 12px
          	height: 12px
          	background-size: 12px 12px
          	background-repeat: no-repeat
          	vertical-align: top
          	margin-right: 2px
          .decrease
          	bg-image('decrease_3')
          .discount
          	bg-image('discount_3')
          .guarantee
          	bg-image('guarantee_3')
          .invoice
          	bg-image('invoice_3')
          .special
          	bg-image('special_3')
      .current
      	position: relative
      	z-index: 10
      	margin-top: -1px
      	background: #fff
      	font-weight: 700
      	border-bottom: 0
  .foods-wrapper
    flex: 1
    font-size: 12px
    // overflow: hidden
    .food-lists
      // width: 100%不能固定与窗口大小一样，造成无法滚动
      // height: 100%不能固定与窗口大小一样，造成无法滚动
      .food-list
        // width: 100%不能固定与窗口大小一样，造成无法滚动
        // height: 100%不能固定与窗口大小一样，造成无法滚动
      	.title
      	  // width: 100%
      	  height: 26px
      	  border-left: 0.166rem solid #d9dde1
      	  background-color: #f3f5f7
      	  padding: 0 12px
      	  line-height: 26px
      	  color: rgb(147, 153, 159)
      	  font-weight: blod
        .foods
          margin: 0 18px 18px 18px
          .food
            padding: 18px 0
            border-bottom: 0.02rem solid rgba(7, 17, 27, 0.1)
            // position: relative
            // font-size: 0
            display: flex
            &:last-child
          	  border-bottom: 0
          	.food-icon
          	  flex: 0 0 64px
          	  margin: 0 10px 0 0
          	  width: 64px
          	  height: 64px
          	  img
          	  	width: 100%
          	  	height: 100%
          	.food-content
          	  flex: 1
          	  font-size: 12px
          	  vertical-align: top
          	  margin: 2px 0
          	  .name
          	  	font-size: 14px
          	  	color: rgb(7, 17, 27)
          	  	line-height: 14px
          	  	margin: 0 0 4px 0
          	  .desc
          	  	margin: 8px 0
          	  	font-size: 10px
          	  	color: rgb(147, 153, 159)
          	  	line-height: 12px
          	  .extra
          	  	margin: 8px 0
          	  	font-size: 10px
          	  	color: rgb(147, 153, 159)
          	  	span
          	  	  margin-right: 12px
          	  .price
          	  	font-weight: 700
          	  	line-height: 24px
          	  	position: relative
          	  	.now
          	  	  margin-right: 18px
          	  	  font-size: 14px
          	  	  color: rgb(240, 20, 20)
          	  	.old
          	  	  text-decoration: line-through
          	  	  font-size: 10px
          	  	  color: rgb(147, 153, 159)
          	  	.cartcontrol-wrapper
          	  	  position: absolute
          	  	  top: 0
          	  	  right: 0
          	  	  width: 80px
</style>