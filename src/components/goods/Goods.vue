<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  .foods-wrapper
    flex: 1
</style>