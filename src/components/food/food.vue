<template>
  <transition name="moveLeft">
  	<div class="food-detail" v-show="showFlag" ref="foodDetail"><!-- 使用better-scroll让food页面可以无滚动条滚动 -->
  	  <div class="food-detail-content">
  	    <div class="image-header">
  	      <img :src="food.image">
  	      <div class="back">
  	      	<i class="icon-arrow_lift" @click="hide"></i>
  	      </div>
  	    </div>
  	    <div class="content">
  	      <h1 class="title">{{ food.name }}</h1>
  	      <div class="extra">
  	        <span>月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
  	      </div>
  	      <div class="price">
  	        <span class="now">￥{{ food.price }}</span><span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
  	      </div>
  	      <div class="cartcontrol-wrapper" v-show="food.count && food.count>0">
  	        <cartcontrol :food="food"></cartcontrol>
  	      </div>
  	      <div @click.stop.prevent="addFirst(food,$event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
  	    </div>
  	    <div class="box"></div><!-- 每一个栏目的分割线 -->
  	    <div class="food-info">
  	      <h1 class="title">商品介绍</h1>
  	      <p class="info">{{ food.info }}</p>
  	    </div>
  	    
  	  </div>
  	</div>
  </transition>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll'
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'
  import Vue from 'vue'
  export default {
  	props: {
      food: {
        type: Object
      }
  	},
  	data() {
      return {
        showFlag: false
      }
  	},
    methods: {
      show() {
        this.showFlag = !this.showFlag
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {click: true})
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = !this.showFlag
      },
      addFirst(food, event) { // event的作用是防止PC多次点击
        if (event._constructed) {
          return
        }
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      Cartcontrol: Cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@font-face 
  font-family: 'sell-icon'
  src:  url('../../common/fonts/sell-icon.eot?nbq4u4')
  src:  url('../../common/fonts/sell-icon.eot?nbq4u4#iefix') format('embedded-opentype'),
      url('../../common/fonts/sell-icon.ttf?nbq4u4') format('truetype'),
      url('../../common/fonts/sell-icon.woff?nbq4u4') format('woff'),
      url('../../common/fonts/sell-icon.svg?nbq4u4#sell-icon') format('svg')
  font-weight: normal
  font-style: normal


[class^="icon-"], [class*=" icon-"] 
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'sell-icon' !important
  speak: none
  font-style: normal
  font-weight: normal
  font-variant: normal
  text-transform: none
  line-height: 1

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale


.icon-add_circle:before 
  content: "\e908"

.icon-arrow_lift:before 
  content: "\e900"

.icon-check_circle:before 
  content: "\e905"

.icon-close:before 
  content: "\e906"

.icon-favorite:before 
  content: "\e904"

.icon-keyboard_arrow_right:before 
  content: "\e909"

.icon-remove_circle_outline:before 
  content: "\e907"

.icon-shopping_cart:before 
  content: "\e903"

.icon-thumb_down:before 
  content: "\e902"

.icon-thumb_up:before 
  content: "\e901"
  
.food-detail
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #fff
  &.moveLeft-enter-active, &.moveLeft-leave-active
    transition: all 0.4s
    transform: translate3d(-100%, 0, 0)
  &.moveLeft-enter-to, &.moveLeft-leave
    transform: translate3d(0, 0, 0)
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100% /*设置padding-top:100%是为了在图片没有加载的时候用padding去占据高度*/
    img /*让图片按照视口宽度进行缩放*/
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 20px
        color: #fff
  .content
  	font-size: 0
  	position: relative
  	h1
  	  font-size: 14px
  	  font-weight: 700
  	  color: rgb(7, 17, 27)
  	  line-height: 14px
  	  margin: 18px 18px 8px
  	.extra
  	  font-size: 10px
  	  color: rgb(147, 153, 159)
  	  margin: 0 18px 18px 18px
  	  span:first-child
  	  	margin-right: 12px
  	.price
  	  // vertical-align: top
  	  // position: relative
  	  margin: 0 18px 18px 18px
  	  .now
  	  	font-size: 14px
  	  	font-weight: 700
  	  	color: rgb(240, 20, 20)
  	  	line-height: 24px
  	  	margin-right: 12px
  	  .old
  	  	font-size: 10px
  	  	font-weight: normal
  	  	color: rgb(147, 153, 159)
  	  	line-height: 24px
  	  	text-decoration: line-through
  	.cartcontrol-wrapper
  	  position: absolute
  	  right: 18px
  	  bottom: 22px
  	  width: 80px
    .buy
  	  position: absolute
  	  right: 18px
  	  bottom: 22px
  	  z-index: 10
  	  height: 24px
  	  line-height: 24px
  	  padding: 0 12px
  	  box-sizing: border-box
  	  font-size: 10px
  	  border-radius: 12px
  	  color: #fff
  	  background:rgb(0, 160, 220)
  .box
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background-color: #f3f5f7
  .food-info
    h1
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
      line-height: 14px
      margin: 18px 18px 6px
    p
      font-size: 12px
      font-weight: 200
      color: rgb(77, 85, 93)
      line-height: 24px
      margin: 0 18px 18px
</style>