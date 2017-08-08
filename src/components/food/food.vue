<template>
  <div class="food" v-show="showFlag">
  	
  </div>
</template>

<script type="text/javascript">
  export default {
  	props: {
      food: {
        type: Object
      }
  	},
  	data() {
      return {
        showFlag: false
      }
  	}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
</style>