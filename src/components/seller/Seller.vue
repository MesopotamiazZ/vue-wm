<template>
  <div class="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="overview">
      	<h1 class="title">{{ seller.name }}</h1>
      	<div class="desc">
      	  <star class="star" :size="36" :score="seller.score"></star>
      	  <span class="text">({{ seller.ratingCount }})</span>
      	  <span class="text">月售{{ seller.sellCount }}单</span>
      	</div>
      	<ul class="remark">
			<li class="block">
				<h2>起送价</h2>
				<div class="content">
					<span class="stress">{{seller.minPrice}}</span>元
				</div>
			</li>
			<li class="block">
				<h2>商家配送</h2>
				<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
				</div>
			</li>
			<li class="block">
				<h2>平均配送时间</h2>
				<div class="content">
					<span class="stress">{{seller.deliveryTime}}</span>分钟
				</div>
			</li>	
		</ul>
      </div><!-- 商家总体描述 -->
      <split></split>
      <div class="bulletin">
      	<h1 class="title">公告与活动</h1>
      	<p class="desc">{{ seller.bulletin }}</p>
      </div><!-- 商家公告 -->
      <div class="supports">
      	<ul>
      	  <li class="support" v-for="support in seller.supports">
	      	<span class="simg" v-bind:class="classMap[support.type]"></span>
	      	<span class="stext">{{ support.description }}</span>
      	  </li>
      	</ul>
      </div><!-- 商家活动 -->
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
          	<li class="pic-item" v-for="pic in seller.pics">
          	  <img :src="pic">
          	</li>
          </ul>
        </div>
      </div><!-- 商家实景 -->
      <split></split>
      <div class="sellerInfo">
      	<h1 class="title">商家信息</h1>
      	<ul class="infos">
      	  <li class="info" v-for="info in seller.infos">{{ info }}</li>
      	</ul>
      </div><!-- 商家信息 -->
      <div class="favorite">
      	<i class="icon-favorite" @click="toggleFavorite()" ref="iFavorite"></i>
      	<span class="text">{{ favorite === false? '收藏':'已收藏' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Split from '../split/split.vue'
  import Star from '../star/star.vue'
  import BScroll from 'better-scroll'
  export default {
  	props: {
      seller: {
        type: Object
      }
  	},
  	data() {
      return {
        favorite: false
      }
  	},
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'guarantee', 'invoice']
    },
    watch: { // seller数据发生变化时执行初始化better-scroll
      'seller': function() {
        console.log('a')
        this._initScroll()
        this._initPics()
      }
    },
    mounted() { // 在vue模板和data数据生成html后执行初始化better-scroll
      console.log('b')
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    },
    methods: {
      _initScroll() {
        this.$nextTick(() => {
          // if (!this.scroll) {
          //  this.scroll = new BScroll(this.$refs.sellerWrapper, {
          //    click: true
          //  })
          // } else {
          //   this.scroll.refresh()
          // }
          this.scroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          })
        })
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          // 计算出pics中ul的宽度,并赋值
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          })
        }
      },
      toggleFavorite() {
        console.log(this.favorite)
        this.favorite = !this.favorite
        if (this.favorite === true) {
          console.log(this.$refs)
          this.$refs.iFavorite.style.color = '#f01414'
        } else {
          this.$refs.iFavorite.style.color = '#9e9e9e'
        }
      }
  	},
    components: {
      Split: Split,
      Star: Star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
    
  .seller
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
      	padding: 18px
      	.title
      	  font-size: 14px
      	  color: rgb(7, 17, 27)
      	  line-height: 14px
      	  margin-bottom: 8px
      	.desc
      	  padding-bottom: 18px
      	  border-bottom: 0.1px solid rgba(7, 17, 27, 0.1)
      	  .star
      	    display: inline-block
      	    vertical-align: middle
      	    margin-right: 8px
      	  .text
            display: inline-block
            font-size: 10px
            color: rgb(77, 85, 93)
            margin-right: 12px
        .remark
          display: flex
          padding: 18px
          .block
            flex: 1
            text-align: center
            border-right: 0.1px solid rgba(7, 17, 27, 0.1)
            h2
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 20px
              margin-bottom: 4px
            .content
              font-size: 10px
              font-weight: 200
              color: rgb(7, 17, 27)
              line-height: 48px
              .stress
                font-size: 24px
          .block:nth-child(3)
            border-right: none
      .bulletin
        padding: 18px 18px 0
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          margin-bottom: 8px
        .desc
          font-size: 12px
          font-weight: 200
          color: rgb(240, 20, 20)
          line-height: 24px
          border-bottom: 0.1px solid rgba(7, 17, 27, 0.1)
          padding-bottom: 16px
          padding-left: 12px
      .supports
      	padding: 0 18px
      	ul
      	  .support
      	    padding: 16px 12px
      	    border-bottom: 0.1px solid rgba(7, 17, 27, 0.1)
      	    .simg
      	      display: inline-block
      	      margin-right: 6px
      	      width: 16px
      	      height: 16px
      	      background-size: 16px 16px
      	      vertical-align: top
      	      &.decrease
          	    bg-image('decrease_4')
          	  &.discount
          	    bg-image('discount_4')
          	  &.guarantee
          	    bg-image('guarantee_4')
          	  &.invoice
          	    bg-image('invoice_4')
          	  &.special
          	    bg-image('special_4')
            .stext
              vertical-align: top
              font-size: 12px
              font-weight: 200
              color: rgb(7, 17, 27)
              line-height: 16px
          .support:last-child
            border-bottom: none
      .pics
        padding: 18px
        .title
          margin-bottom: 12px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .pic-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .pic-list
          	font-size: 0
          	.pic-item
          	  display: inline-block
          	  margin-right: 6px
          	  img
          	    width: 120px
          	    height: 90px
          	  &.last-child
          	  	margin-right: 0
      .sellerInfo
        padding: 18px
        .title
          margin-bottom: 12px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .infos
          border-top: 0.1px solid rgba(7, 17, 27, 0.1)
          .info
          	padding: 16px 12px
          	font-size: 12px
          	font-weight: 200
          	color: rgb(7, 17, 27)
          	line-height: 16px
          	border-bottom: 0.1px solid rgba(7, 17, 27, 0.1)
          .info:last-child
          	border-bottom: 0
      .favorite
        position: fixed
        top: 18px
        right: 18px
        text-align: center
        .icon-favorite
          display: block
          color: #9e9e9e
          font-size: 24px
          line-height: 24px
          margin-bottom: 4px
        .text
          display: block
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 10px
</style>