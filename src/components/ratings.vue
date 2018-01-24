<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" :changeSelectType="changeSelectType" :changeOnlyContent="changeOnlyContent"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating)">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                                <p class="text">{{rating.text}}</p>
                                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                    <span class="icon-thumb_up"></span>
                                    <span v-for="item in rating.recommend" class="item">{{item}}</span>
                                </div>
                                <div class="time">
                                    {{rating.rateTime | formatDate}}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import star from "./star.vue";
    import split from "./split.vue";
    import ratingselect from "./ratingselect.vue";
    import $ from "jquery";
    import BScroll from "better-scroll";
    import {
        formatDate
    } from "../common/js/formatDate.js";
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        filters: {
            formatDate(time) {
                return formatDate(time, "yyyy-MM-dd");
            }
        },
        props: ["seller"],
        components: {
            star,
            split,
            ratingselect
        },
        data() {
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: true,
            }
        },
        created() {
            let This = this;
            $.ajax({
                url: "/api/ratings",
                success: function(res) {
                    if (res.errno == 0) {
                        This.ratings = res.ratings;
                        This.$nextTick(() => {
                            if (This.$refs.ratings) {
                                This.scroll = new BScroll(This.$refs.ratings, {
                                    click: true
                                });
                            }
                        });
                    }
                }
            });
        },
        methods: {
            changeSelectType(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            changeOnlyContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(rating) {
                if(this.onlyContent && !rating.text) {
                    return false;
                }
                if(rating.rateType == this.selectType || this.selectType == ALL){
                    return true;
                }
            }
        },
    }
</script>
<style lang="less">
    .ratings {
        position: absolute;
        left: 0;
        top: 174px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                padding: 6px 0;
                @media only screen and (max-width: 320px) {
                    flex:0 0 120px;
                    width: 120px;
                }
                .score {
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                    margin-bottom: 6px;
                }
                .title {
                    font-size: 12px;
                    line-height: 12px;
                    color: rgb(7, 17, 27);
                    margin-bottom: 8px;
                }
                .rank {
                    line-height: 16px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left:2px;
                }
                .score-wrapper {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        display: inline-block;
                        vertical-align: top;
                        line-height: 18px;
                    }
                    .star {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .score {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                        line-height: 18px;
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    .title {
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        line-height: 18px;
                    }
                    .delivery {
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                        margin-left: 12px;
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                display: flex;
                padding: 18px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img {
                        border-radius: 50%;
                    }
                }
                .content {
                    flex: 1;
                    position: relative;
                    .name {
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                        margin-bottom: 4px;
                    }
                    .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .text {
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    .recommend {
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up,
                        .item {
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .icon-thumb_up {
                            color: rgb(0, 160, 120);
                        }
                        .item {
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                        }
                    }
                    .time {
                        position: absolute;
                        right: 0;
                        top: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>