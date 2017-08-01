<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="content-wrapper-tx">
      	<img :src="seller.avatar">
      </div>
      <div class="content-wrapper-main">
      	<div class="sellerName">
      	  <span class="brand"></span>
      	  <span class="name">{{ seller.name }}</span>
      	</div>
      	<div class="sellerDescription">
      	  {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
      	</div>
      	<div class="sellerSupports" v-if="seller.supports">
      	  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
      	  <span class="text">{{ seller.supports[0].description }}</span>
      	</div>
      </div>
      <div class="supportsCount" v-if="seller.supports" @click="detailShow">
      	<span class="count">{{ seller.supports.length }}个</span>
      	<i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="detailShow">
      <span class="bulletin-image"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <div class="detail" v-show="isShow">
      <div class="detail-wrapper clearfix">
      	<div class="detail-main">
      	  <h1 class="name">{{ seller.name }}</h1>
      	  <div class="star-wrapper">
      	  	<star :score="seller.score" :size="48"></star>
      	  </div>
      	  <div class="title">
      	  	<div class="line"></div>
      	  	<div class="text">优惠信息</div>
      	  	<div class="line"></div>
      	  </div>
      	  <div class="supportsAll">
      	  	<ul>
      	  	  <li v-for="support in seller.supports">
      	  	  	<span class="simg" v-bind:class="classMap[support.type]"></span>
      	  	  	<span class="stext">{{ support.description }}</span>
      	  	  </li>
      	  	</ul>
      	  </div>
      	  <div class="title">
      	  	<div class="line"></div>
      	  	<div class="text">商家公告</div>
      	  	<div class="line"></div>
      	  </div>
      	  <div class="detail-bulletin">
      	  	<span class="dbtext">{{ seller.bulletin }}</span>
      	  </div>
      	</div>
      </div>
      <div class="detail-close">
      	<i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      detailShow: function() {
        this.isShow = !this.isShow
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'guarantee', 'invoice']
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    background: rgba(7, 17, 27, 0.5)
    font-size: 0
    position: relative
    overflow: hidden
    .content-wrapper
      padding: 24px 12px 18px 24px
      position: relative
      .content-wrapper-tx
        display: inline-block
        img
          height: 64px
          width: 64px
          border-radius: 4px
      .content-wrapper-main
        display: inline-block
        font-size: 0
        color: rgb(255, 255, 255)
        vertical-align: top
        margin-left: 16px
        .sellerName
          margin-bottom: 8px
          vertical-align: top
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
          	font-size: 16px
          	margin-left: 6px
          	line-height: 18px
          	font-weight: blod
        .sellerDescription
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
          vertical-align: top
        .sellerSupports
          font-size: 0
          font-weight: 200
          .icon
          	display: inline-block
          	width: 12px
          	height: 12px
          	background-size: 12px 12px
          	background-repeat: no-repeat
          	vertical-align: top
          	&.decrease
          	  bg-image('decrease_1')
          	&.discount
          	  bg-image('discount_1')
          	&.guarantee
          	  bg-image('guarantee_1')
          	&.invoice
          	  bg-image('invoice_1')
          	&.special
          	  bg-image('special_1')
          .text
          	font-size: 10px
          	line-height: 12px
          	margin-left: 4px
          	vertical-align: top
      .supportsCount
      	// width: 48px
      	padding: 0 8px
      	height: 24px
      	position: absolute
      	bottom: 18px
      	right: 12px
      	background: rgba(0, 0, 0, 0.2)
      	font-size: 10px
      	font-weight: blod
      	line-height: 24px
      	color: rgb(255, 255, 255)
      	border-radius: 14px
      	text-align: center
      	.count
      	  font-size: 10px
      	  vertical-align: center
      	.icon-keyboard_arrow_right
      	  display: inline-block
      	  font-size: 10px
    .bulletin-wrapper
      padding: 0 22px 0 12px
      height: 28px
      line-height: 28px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      font-size: 10px
      color: rgb(255, 255, 255)
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-image
      	display: inline-block
      	width: 22px
      	height: 12px
      	bg-image('bulletin')
      	background-size: 22px 12px
      	background-repeat: no-repeat
      	vertical-align: middle
      .bulletin-text
      	font-size: 10px
      	color: rgb(255, 255, 255)
      	font-weight: 200
      	vertical-align: middle
      	margin:0 4px
      // .icon-keyboard_arrow_right
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
      img
      	width: 100%
      	height: 100%
    .detail
      position: fixed
      z-index: 100
      width: 100%
      height: 100%
      top: 0
      left: 0
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      // filter: blur(10px)
      .detail-wrapper
      	min-height: 100%
      	width: 100%
      	.detail-main
      	  margin-top: 64px
      	  padding-bottom: 64px
      	  font-size: 12px
      	  color: rgb(255, 255, 255)
      	  .name
      	  	line-height: 16px
      	  	text-align: center
      	  	font-size: 16px
      	  	font-weight: 700 
      	  .star-wrapper
      	  	margin-top: 18px
      	  	padding: 2px 0
      	  	text-align: center
      	  .title
      	  	display: flex
      	    // width: 80%
      	    margin: 28px auto 24px auto
      	    padding: 0 31px
      	    .line
      	      flex: 1
      	      position: relative
      	      top: -6px
      	      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
      	    .text
      	      padding: 0 12px
      	      font-size: 14px
      	  .supportsAll
      	  	padding: 0 31px
      	  	margin: 24px auto 28px auto
      	  	ul
      	      padding: 0 12px
      	      li
      	      	margin-bottom: 12px
      	      	font-size: 0
      	      	.simg
      	      	  display: inline-block
      	      	  margin-right: 6px
      	      	  width: 16px
      	      	  height: 16px
      	      	  background-size: 16px 16px
      	      	  vertical-align: top
      	      	  &.decrease
          	        bg-image('decrease_1')
          	      &.discount
          	        bg-image('discount_1')
          	      &.guarantee
          	        bg-image('guarantee_1')
          	      &.invoice
          	        bg-image('invoice_1')
          	      &.special
          	        bg-image('special_1')
      	      	.stext
      	      	  vertical-align: top
      	      	  font-size: 12px
      	      	  font-weight: 200
      	      	  color: rgb(255, 255, 255)
      	      	  line-height: 12px
      	      li.last-child
      	      	margin-bottom: 0
      	  .detail-bulletin
      	  	padding: 0 31px
      	  	.dbtext
      	  	  padding: 0 12px
      	  	  font-size: 12px
      	  	  font-weight: 200
      	  	  color: rgb(255, 255, 255)
      	  	  line-height: 24px
      .detail-close
      	position: relative
      	width: 32px
      	height: 32px
      	margin: -64px auto 0 auto
      	clear: both
      	font-size: 32px
</style>