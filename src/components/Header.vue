<template>
  <div class="header">
    <div class="content-wrapper" @touchstart="showDetail">
      <div class="avata">
        <img :src="seller.avatar" width='64' height='64' alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports" @touchstart="showDetail">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @touchstart="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,$index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @touchstart="hideDetail"></i>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
  import star from "../components/star.vue";

  export default {
    props: ["seller"],
    data() {
      return {
        classMap: ["decrease", "discount", "guarantee", "special", "invoice"],
        detailShow: false,
      }
    },
    created() {
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    components: {
      star
    }
  }

</script>
<style lang="less">
  // @import "../common/resource/img"
  @import "../common/css/base.less";
  
    .header {
      position: relative;
      color: #fff;
      overflow: hidden;
      background: rgba(7, 17, 27, 0.5);
      .content-wrapper {

        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;
        .avata {
          display: inline-block;
          vertical-align: top;
          img {
            border-radius: 2px;
          }
        }
        .content {
          display: inline-block;
          font-size: 14px;
          vertical-align: top;
          margin-left: 16px;
          .title {
            margin: 2px 0 8px 0;
            .brand {
              width: 30px;
              height: 18px;
              display: inline-block;
              background: url('../common/resource/img/brand@2x.png') no-repeat;
              background-size: contain;
              vertical-align: top;
            }
            .name {
              margin-left: 6px;
              font-size: 16px;
              line-height: 18px;
              font-weight: bold;
              vertical-align: top;
            }
          }
          .desc {
            margin-bottom: 10px;
            line-height: 12px;
            font-size: 12px;
          }
          .support {
            .icon {
              display: inline-block;
              width: 12px;
              height: 12px;
              background-size: 12px 12px;
              background-repeat: no-repeat;
              vertical-align: bottom;
              &.decrease {
                background-image: url("../common/resource/img/decrease_1@2x.png");
              }
              &.discount {
                background-image: url("../common/resource/img/discount_1@2x.png");
              }
              &.guarantee {
                background-image: url("../common/resource/img/guarantee_1@2x.png");
              }
              &.special {
                background-image: url("../common/resource/img/special_1@2x.png");
              }
              &.invoice {
                background-image: url("../common/resource/img/invoice_1@2x.png");
              }
            }
            .text {
              line-height: 12px;
              font-size: 12px;
            }
          }
        }
        .support-count {
          position: absolute;
          right: 12px;
          bottom: 18px;
          padding: 0 8px;
          height: 24px;
          line-height: 24px;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.2);
          text-align: center;
          .count {
            font-size: 10px;
            vertical-align: top;
          }
          .icon-keyboard_arrow_right {
            font-size: 10px;
            line-height: 24px;
          }
        }
      }
      .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        background: rgba(7, 17, 27, 0.2);
        .bulletin-title {
          display: inline-block;
          width: 22px;
          height: 12px;
          background: url("../common/resource/img/bulletin@2x.png") no-repeat;
          background-size: contain;
          vertical-align: top;
          margin-top: 8px;
        }
        .bulletin-text {
          font-size: 10px;
          margin: 0 4px;
          vertical-align: top;
        }
        i {
          position: absolute;
          font-size: 10px;
          right: 12px;
          top: 8px;
        }
      }
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .detail {
        position: fixed;
        z-index: 99;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.8);
        overflow: auto;
        .detail-wrapper {
          min-height: 100%;
          width: 100%;
          .detail-main {
            margin-top: 64px;
            padding-bottom: 64px;
            .name {
              line-height: 16px;
              text-align: center;
              font-size: 16px;
              font-weight: 700;
            }
            .star-wrapper {
              margin-top: 16px;
              padding: 2px 0;
              text-align: center;
            }
            .title {
              width: 80%;
              margin: 28px auto 24px auto;
              display: flex;
              .line {
                flex: 1;
                position: relative;
                top: -6px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              }
              .text {
                padding: 0 12px;
                font-size: 14px;
                font-weight: 700;
              }
            }
            .supports {
              width: 80%;
              margin: 0 auto;
              .support-item {
                padding: 0 12px;
                margin-bottom: 12px;
                font-size: 0;
                &:last-child {
                  margin-bottom: 0;
                }
                .icon {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  vertical-align: top;
                  margin-right: 6px;
                  background-size: contain;
                  background-repeat: no-repeat;
                  &.decrease {
                    background-image: url("../common/resource/img/decrease_1@2x.png");
                  }
                  &.discount {
                    background-image: url("../common/resource/img/discount_1@2x.png");
                  }
                  &.guarantee {
                    background-image: url("../common/resource/img/guarantee_1@2x.png");
                  }
                  &.special {
                    background-image: url("../common/resource/img/special_1@2x.png");
                  }
                  &.invoice {
                    background-image: url("../common/resource/img/invoice_1@2x.png");
                  }
                }
                .text {
                  line-height: 16px;
                  font-size: 12px;
                }
              }
            }
            .bulletin {
              width: 80%;
              margin: 0 auto;
              .content {
                padding: 0 12px;
                line-height: 24px;
                font-size: 12px;
              }
            }
          }
        }
        .detail-close {
          position: relative;
          width: 32px;
          height: 32px;
          margin: -64px auto 0 auto;
          clear: both;
          font-size: 32px;
        }
      }
    }
 

</style>
