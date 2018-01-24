<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,$index) in goods" class="menu-item" :class="{current:currentIndex==$index}" @click="selectMenu($index,$event)">
            <span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                <div class="icon"><img width="57" height="57" :src="food.icon" alt=""></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" :app="app"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods" :listShow="false"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import $ from "jquery";
  import BScroll from "better-scroll";
  import shopcart from "./shopcart.vue";
  import cartcontrol from "./cartcontrol.vue";
  import food from "./food.vue";
  export default {
    props: ["seller", "app"],
    data() {
      return {
        goods: [],
        classMap: ["decrease", "discount", "guarantee", "special", "invoice"],
        listHeight: [],
        scrollY: 0,
        selectedFood:{}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i] * -1;
          let h2 = this.listHeight[i + 1] * -1;
          if (this.scrollY > 0) {
            return 0;
          }
          if (!h2 || (this.scrollY <= h1 && this.scrollY > h2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count && food.count > 0) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on("scroll", (pos) => {
          this.scrollY = Math.floor(pos.y);
        });
      },
      _calculateHeight() {
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodlist.length; i++) {
          height += foodlist[i].clientHeight + 18;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let ele = foodlist[index];
        this.foodsScroll.scrollToElement(ele, 300);
      },
      selectFood(food,event){
        if(!event._constructed){
            return
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },

    },
    created() {
      let This = this;
      $.ajax({
        url: "/api/goods",
        success: function (res) {
          if (res.errno == 0) {
            This.goods = res.goods;
            This.$nextTick(() => {
              This._initScroll();
              This._calculateHeight();
            });

          }
        }
      });
    },
    mounted() {

    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }

</script>
<style lang="less">
  .swiper-container {
    width: 700px;
    height: 100%;
  }


  .goods {
    position: absolute;
    top: 174px;
    bottom: 46px;
    display: flex;
    overflow: hidden;
    width: 100%;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background: #fff;
          font-weight: 700;
          .text {
            border-bottom: 0px;
          }
        }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: contain;
          background-repeat: no-repeat;
          vertical-align: bottom;
          &.decrease {
            background-image: url("../common/resource/img/decrease_3@2x.png");
          }
          &.discount {
            background-image: url("../common/resource/img/discount_3@2x.png");
          }
          &.guarantee {
            background-image: url("../common/resource/img/guarantee_3@2x.png");
          }
          &.special {
            background-image: url("../common/resource/img/special_3@2x.png");
          }
          &.invoice {
            background-image: url("../common/resource/img/invoice_3@2x.png");
          }
        }
        .text {
          font-size: 12px;
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      h1.title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding-bottom: 18px;
        position: relative;
      }
      &:last-child {
        border-bottom: 0px;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        font-weight: 700;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          .count {
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
          bottom: 12px;
          right: 0;
        }
      }
    }
  }

</style>
