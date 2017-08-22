<template>
  <div class="seller" ref="seller">
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
    </div>
  </div>
</template>

<script>
  import Split from '../split/split.vue'
  import Star from '../star/star.vue'
  export default {
  	props: {
      seller: {
        type: Object
      }
  	},
    components: {
      Split: Split,
      Star: Star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
        padding: 18px
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
</style>