<template>
  <transition name="fadein-right">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" ref="cartcontrol"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addFirst">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" :changeSelectType="changeSelectType" :changeOnlyContent="changeOnlyContent"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item" :key="rating.username" v-show="needShow(rating)">
                <div class="user">
                  <span class="username">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span> {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from "better-scroll";
  import cartcontrol from "./cartcontrol.vue";
  import Vue from "vue";
  import split from "./split.vue";
  import ratingselect from "./ratingselect.vue";
  import Bus from "../common/js/bus.js";
  import {formatDate} from "../common/js/formatDate.js";
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
 
  export default {
    filters:{
      formatDate(time){
        return formatDate(time,"yyyy-MM-dd");
      }
    },
    props: ["food"],
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: "全部",
          positive: "推荐",
          negative: "吐槽"
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(e) {
        if (!e._constructed) {
          return;
        }
        Vue.set(this.food, "count", 1);
        this.$refs.cartcontrol.drop(e);
      },
      changeSelectType(type) {
        this.selectType = type;
        this.$nextTick(()=>{
          this.scroll.refresh();
        });
      },
      changeOnlyContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(()=>{
          this.scroll.refresh();
        });
      },
      needShow(rating){
        if(this.onlyContent && !rating.text){
          return false;
        }
        if(rating.rateType === this.selectType || this.selectType === ALL){
          return true;
        }
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    created() {
      Bus.$on("selectRatingType", (type) => {
        this.selectType = type;
      });
    }
  }
</script>

<style lang="less">
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        left: 0;
        top: 10px;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      padding: 18px;
      position: relative;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        height: 10px;
        .sell-count,
        .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 12px;
        color: #fff;
        background: rgb(0, 160, 220);
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 16px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .user{position: absolute;right: 0;top: 16px;font-size: 0;line-height: 12px;
            .username{display: inline-block;vertical-align: top;font-size: 10px;color:rgb(147,153,159);margin-right: 6px; }
            .avatar{border-radius:50%; }
          }
          .time{line-height: 12px;font-size: 10px;color:rgb(147,153,159);margin-bottom: 6px;}
          .text{line-height: 16px;font-size: 12px;color:rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down{line-height: 16px;margin-right:4px;font-size: 12px;}
            .icon-thumb_up{color:rgb(0,160,220);}
            .icon-thumb_down{color:rgb(147,153,159);}
          }
        }
        .no-ratings{padding:16px 0;font-size: 12px;color:rgb(147,153,159);}
      }
    }
  }
</style>
