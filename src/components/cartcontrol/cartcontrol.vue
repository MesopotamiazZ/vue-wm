<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  export default {
    props: {
      food: { // 接收父组件传过来的添加的food对象
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1) // 对this.food添加count属性也会影响到父组件的food
          // this.selectFoods.push({name: this.food.name, price: this.food.price, count: this.food.count})
        } else {
          this.food.count++
          // let length = this.selectFoods.length
          // for (let i = 0; i < length; i++) {
          //   if (this.food.name === this.selectFoods[i].name) {
          //     this.selectFoods[i].count++
          //   }
          // }
        }
      },
      decreaseCart() {
        if (!event._constructed) {
          return
        }
        if (this.food.count > 0) {
          this.food.count--
        }
        // else {
        //   let length = this.selectFoods.length
        //   // for (let i = 0; i < length; i++) {
        //   //   if (this.food.name === this.selectFoods[i].name) {
        //   //     this.selectFoods.splice(i, 1)
        //   //   }
        //   // }
        // }
      }
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

.cartcontrol
    font-size: 0
    position: relative
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      position: absolute
      right: 0
</style>