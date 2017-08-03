<template>
  <div class="shopcart">
  	<div class="content">
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
    </div>
  </div>
</template>

<script type="text/javascript">
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
  	computed: {
      totalPrice() {
        let total = 0
        // this.selectFoods.forEach((food) => {
        //   total += food.price * food.count
        // })
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
      	width: 40px
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
      	background: #358c35
      	color: rgb(255, 255, 255)
</style>