<template>
  <div class="shopcart">
  	<div class="content" @click="toggleList">
  	  <div class="content-left">
  	    <div class="logo-wrapper">
  	  	  <div class="logo" :class="{'highlight':totalCount>0}">
  	  	    <i class="icon-shopping_cart"></i>
  	  	  </div>
  	  	  <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
  	    </div>
  	    <div class="price" :class="{'highlight':totalCount>0}">￥{{ totalPrice }}</div>
  	  	<div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
  	  </div>
  	  <div class="content-right">
  	  	<div class="pay" :class="{'lightgreen':totalPrice>=minPrice}">
  	  	  {{ payDesc }}
  	  	</div>
  	  </div>
  	  <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          	<div class="ball" v-show="ball.show">
          	  <div class="inner inner-hook"></div>
          	</div>
          </transition>
        </div>
  	  </div>
  	  <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'
  export default {
  	props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 17,
              count: 2
            }
          ]
        }
      }
  	},
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true // fold是折叠的意思
      }
    },
  	computed: {
      totalPrice() {
        let total = 0
        for (let food of this.selectFoods) {
          total += food.price * food.count
        }
        return total
      },
      totalCount() {
        let count = 0
        for (let food of this.selectFoods) {
          count += food.count
        }
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return `支付`
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
  	},
  	methods: {
      drop(el) {
        // console.log(el)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList() {
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      },
      addFood(target) {
        this.drop(target)
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

.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    .content-left
      flex: 1
      .logo-wrapper
      	display: inline-block
      	position: relative
      	top: -10px
      	margin: 0 12px
      	padding: 6px
      	width: 56px
      	height: 56px
      	box-sizing: border-box
      	vertical-align: top
      	border-radius: 50%
      	background: #141d27
      	.logo
      	  width: 100%
      	  height: 100%
      	  border-radius: 50%
      	  background: #2b343c
      	  text-align: center
      	  .icon-shopping_cart
      	  	 font-size: 24px
      	  	 color: rgba(255, 255, 255, 0.4)
      	  	 line-height: 48px
      	.highlight
      	  background: rgb(0, 160, 220)
      	  .icon-shopping_cart
      	  	color: rgb(255, 255, 255)
      	.num
      	  position: absolute
      	  top: 0
      	  right: 0
      	  font-size: 9px
      	  color: rgb(255, 255, 255)
      	  width: 24px
      	  height: 16px
      	  border-radius: 12px
      	  background: rgb(240, 20, 20)
      	  text-align: center
      	  line-height: 16px
      	  box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
      	display: inline-block
      	font-size: 16px
      	font-weight: 700
      	color: rgba(255, 255, 255, 0.4)
      	line-height: 48px
      	width: 45px
      	// text-align: center
      	border-right: 0.5px solid rgba(255, 255, 255, 0.1)
      .highlight
      	color: rgb(255, 255, 255)
      .desc
      	display: inline-block
      	font-size: 12px
      	color: rgba(255, 255, 255, 0.4)
      	line-height: 48px
      	margin-left: 12px
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        font-size: 12px
        font-weight: 700
        line-height: 48px
        color: rgba(255, 255, 255, 0.4)
        text-align: center
        background: #2b343c
      .lightgreen
      	background: #00b43c
      	color: rgb(255, 255, 255)
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
          
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-bottom: 0.5px solid rgba(7, 17, 27, 0.1)
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0px
            bottom: 12px
            width: 80px
            height: 24px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>