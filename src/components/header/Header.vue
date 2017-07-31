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
      	  <span class="icon"></span>
      	  <span class="text">{{ seller.supports[0].description }}</span>
      	</div>
      </div>
    </div>
    <div class="notice-wrapper">
    	
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    background: #000
    font-size: 0
    .content-wrapper
      padding: 24px 12px 18px 24px
      .content-wrapper-tx
        display: inline-block
        img
          height: 64px
          width: 64px
          border-radius: 4px
      .content-wrapper-main
        display: inline-block
        font-size: 16px
        color: rgb(255, 255, 255)
        vertical-align: top
        margin-left: 16px
        .sellerName
          font-weight: blod
          margin-bottom: 8px
          line-height: 18px
          vertical-align: top
        .sellerDescription
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
          vertical-align: top
        .sellerSupports
          font-size: 10px
          font-weight: 200
          line-height: 12px
          vertical-align: top
</style>