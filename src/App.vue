<template>
  <div id="app" ref="app">
    <!--<img src="./assets/logo.png">-->
    <v-header :seller="seller"></v-header>
    <div class="table">
        <div class="table-item"><router-link to="/goods">商品</router-link></div>
        <div class="table-item"><router-link to="/ratings">评论</router-link></div>
        <div class="table-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
        <router-view :seller="seller" :app="this"></router-view>
    </keep-alive>
    <div class="ball" i="0"></div>
    <div class="ball" i="1"></div>
    <div class="ball" i="2"></div>
    <div class="ball" i="3"></div>
    <div class="ball" i="4"></div>
    <div class="ball" i="5"></div>
  </div>
</template>

<script>
import $ from "jquery";
import './common/css/icon.css';
import Header from './components/Header';
import getquerystring from "./common/js/getquerystring.js";

export default {
  name: 'app',
  components: {
    "v-header":Header
  },
  data(){
    return {
      seller:{
          id:(()=>{
              let queryParm = getquerystring("id");
              return queryParm;
          })()
      },
    }
  },
  created(){
      var This = this;
      $.ajax({
          url:"api/seller?id="+this.seller.id,
          type:"get",
          success:(res)=>{
              this.seller =Object.assign({},this.seller,res.seller);
          }
      });
      
  }
}
</script>

<style lang="less">
html,body{width:100%;height:100%;}
#app{width:100%;height:100%;
    .ball{position:fixed;left: 0;top:0;width:16px;height:16px;border-radius: 50%;background: rgb(0,160,220);z-index: 99;visibility: hidden;transform: translate3d(-30px,-30px,0);}
}
a{text-decoration: none;}
.table{display: flex;flex-wrap: wrap;height:40px;align-items: center;border-bottom: 1px solid rgba(7,17,27,0.1);
    .table-item{flex-grow: 1;text-align: center;
        &>a{display: block;font-size: 14px;color:rgba(77,85,93,1);}
        &>a.router-link-active{color:rgb(240,20,20);}
    }
}

</style>
