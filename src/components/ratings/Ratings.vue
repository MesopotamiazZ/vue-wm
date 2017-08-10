<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
      	<div class="overview-left">
      	  <h1 class="score">{{ seller.score }}</h1>
      	  <div class="title">综合评分</div>
      	  <div class="rank">高于周边商家{{ seller.rankRate }}</div>
      	</div>
      	<div class="overview-right">
      	  <div class="serviceScore">
      	  	<span class="s1">服务态度</span>
      	  	<div class="star-wrapper">
      	  	  <star :score="seller.serviceScore" :size="36"></star>
      	  	</div>
      	  	<span class="s2">{{ seller.serviceScore }}</span>
      	  </div>
      	  <div class="foodScore">
      	  	<span class="s1">美食评分</span>
      	  	<div class="star-wrapper">
      	  	  <star :score="seller.foodScore" :size="36"></star>
      	  	</div>
      	  	<span class="s2">{{ seller.foodScore }}</span>
      	  </div>
      	  <div class="deliveryTime">
      	  	<span class="s3">送达时间</span>
      	  	<span class="s4">{{ seller.deliveryTime }}分钟</span>
      	  </div>
      	</div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings"></ratingselect>
    </div>
  </div>
</template>

<script>
  import Star from '../star/star.vue'
  import Split from '../split/split.vue'
  import Ratingselect from '../ratingselect/ratingselect.vue'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      Star: Star,
      Split: Split,
      Ratingselect: Ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
      	flex: 0 0 137px
      	width: 137px
      	border-right: 1px solid rgba(7, 17, 27, 0.1)
      	text-align: center
      	padding-bottom: 6px
      	@media only screen and (max-width: 320px)
          flex: 0 0 115px
          width: 115px
      	.score
      	  line-height: 28px
      	  color: rgb(255, 153, 0)
      	  font-size: 24px
      	  margin-bottom: 6px
      	.title
      	  font-size: 12px
      	  color: rgb(7, 17, 27)
      	  line-height: 12px
      	  margin-bottom: 8px
      	.rank
      	  font-size: 10px
      	  color: rgb(147, 153, 159)
      	  line-height: 10px
      .overview-right
      	flex: 1
      	padding: 0 0 6px 24px
      	font-size: 0
      	@media only screen and (max-width: 320px)
          padding-left: 6px
      	.serviceScore, .foodScore
      	  margin-bottom: 8px
      	  .s1
      	  	margin-right: 12px
      	  	font-size: 12px
      	  	color: rgb(7, 17, 27)
      	  	line-height: 18px
      	  .star-wrapper
      	  	display: inline-block
      	  	margin-right: 12px
      	  	vertical-align: top
      	  .s2
      	  	font-size: 12px
      	  	color: rgb(255, 153, 0)
      	  	line-height: 18px
      	.deliveryTime
      	  .s3
      	    margin-right: 12px
      	    font-size: 12px
      	    color: rgb(7, 17, 27)
      	    line-height: 18px
      	  .s4
      	  	font-size: 12px
      	  	color: rgb(147, 153, 159)
      	  	line-height: 18px
</style>