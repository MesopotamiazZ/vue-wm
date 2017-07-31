<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  // const ERR_OK = 0
  import Header from './components/header/Header.vue'
  import axios from 'axios'
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      // this.$http.get('/api/seller').then((response) => {
      //   response = response.body
      //   if (response.errno === ERR_OK) {
      //     this.seller = response.data
      //   }
      // })这个是过时的vue-resource的插件，下面是axios的插件
      axios.get('/api/seller').then((response) => {
        response = response.data
        if (response.errno === 0) {
          this.seller = response.data
          console.log(this.seller)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    components: {
      vHeader: Header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      font-size: 14px
      .tab-item
        flex: 1//均分tab
        text-align: center
        border-bottom: 0.07em solid rgba(7, 17, 27 0.1)
        & > a//&指代.table-item
          display: block//使之撑开，点击任何一个地方都会进行切换
          color: rgb(77, 85, 93)
          &.router-link-active
            color: rgb(240, 20, 20)
</style>
