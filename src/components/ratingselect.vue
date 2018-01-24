<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{active:selectType === 2}" @click="select(2,$event)">{{desc.all}}
                  <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{active:selectType === 0}" @click="select(0,$event)">{{desc.positive}}
                  <span class="count">{{positive.length}}</span>
      </span>
      <span class="block negative" :class="{active:selectType === 1}" @click="select(1,$event)">{{desc.negative}}
                  <span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  import Bus from "../common/js/bus.js";
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    
    props: {
      ratings: {
        default () {
          return [];
        }
      },
      selectType: {
        default: ALL
      },
      onlyContent: {
        default: false
      },
      desc: {
        default () {
          return {
            all: "全部",
            positive: "满意",
            negative: "不满意"
          };
        }
      },
      changeSelectType:{},
      changeOnlyContent:{},
    },
    methods:{
      select(type,e){
        if(!e._constructed){
          return
        }
        // Bus.$emit("selectRatingType",type);
        this.changeSelectType(type);
      },
      toggleContent(e){
        if(!e._constructed){
          return
        }
        this.changeOnlyContent();
      }
    },
    computed:{
      positive(){
        return this.ratings.filter((rating)=>{
          return rating.rateType === POSITIVE;
        });
      },
      negative(){
        return this.ratings.filter((rating)=>{
          return rating.rateType === NEGATIVE;
        });
      }
    }
    
  }
</script>


<style lang="less">
  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        line-height: 16px;
        &.active{color:#fff;}
        .count{font-size: 8px;margin-left: 2px;}
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active{background:rgba(0, 160, 220, 1);}
        }
        &.negative {
          background: rgba(77, 85, 93,0.2);
          &.active{background: rgba(77, 85, 93,1)}
        }
      }
    }
    .switch{padding:12px 18px;line-height: 24px;border-bottom: 1px solid rgba(7,17,27,0.1);color:rgb(147,153,159);font-size: 0;
      &.on{
        .icon-check_circle{color:#00c850;}
      }
      .icon-check_circle{font-size: 24px;margin-right: 4px;display: inline-block;vertical-align: top;}
      .text{font-size: 12px;display: inline-block;vertical-align: top;}
    }
  }
</style>



