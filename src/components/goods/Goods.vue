<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menuItems">
      	<li v-for="menuItem in goods" class="menuItem">
      	  <span class="mitext">
      	  	<span v-show="menuItem.type>0" class="icon" :class="classMap[menuItem.type]"></span>{{ menuItem.name }}
      	  </span>
      	</li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul class="food-lists">
      	<li v-for="foodsItem in goods" class="food-list">
      	  <h1 class="title">{{ foodsItem.name }}</h1>
      	  <ul class="foods">
      	  	<li v-for="food in foodsItem.foods" class="food">
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
      	  	  	</div>
      	  	  </div>
      	  	</li>
      	  </ul>
      	</li>
      </ul>
    </div>
  </div>
</template>

<script>
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
        goods: []
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
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  	},
  	methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {})
      }
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
    overflow: hidden
    .menuItems
      list-style: none
      width: 85px
      font-size: 12px
      overflow-x: hidden
      overflow-y: scroll
      // display: table
      .menuItem
      	width: 70%
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
  .foods-wrapper
    flex: 1
    font-size: 12px
    .food-lists
      width: 100%
      height: 100%
      .food-list
        width: 100%
        height: 100%
      	.title
      	  width: 100%
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
          	  height: auto
          	  width: auto
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
          	  	.now
          	  	  margin-right: 18px
          	  	  font-size: 14px
          	  	  color: rgb(240, 20, 20)
          	  	.old
          	  	  text-decoration: line-through
          	  	  font-size: 10px
          	  	  color: rgb(147, 153, 159)
</style>