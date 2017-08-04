<template>
    <div class="app">
        <transition name="move">
            <div class="redSquare" v-show="isShow">
                <span class="inner"></span>
            </div>
        </transition>
        <div class="greenSquare" @click="change"></div>
    </div>
</template>

<script>
export default {
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      change: function() {
        this.isShow = !this.isShow
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width: 80px
    height: 25px
    border: 1px solid blue
    position: relative
    .greenSquare
      display: inline-block
      width: 25px
      height: 25px
      background: green
    .redSquare
      display: inline-block
      position: absolute
      right: 0
      transform: translate3d(0, 0, 0)
      opacity: 1
      .inner
        display: inline-block
        width: 25px
        height: 25px
        background: red
        transition: all 0.7s
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.7s
      &.move-enter, &.move-leave-to
        transform: translate3d(-20px, 0, 0)
        opacity: 0
        .inner
          transform: rotate(180deg)
</style>