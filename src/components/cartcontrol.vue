<template>
    <div class="cartcontrol">
        <transition name="fadebutton">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart($event)"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
        
    </div>
</template>

<script>
    import Vue from "vue";
    import $ from "jquery";
    import GSAP from "gsap";
    let TimelineMax = GSAP.TimelineMax;
    export default{
        props:["food","app"],
        methods:{
            addCart(event){
                if(!event._constructed){
                    return;
                }
                if(!this.food.count){
                    Vue.set(this.food,"count",1);
                }else{
                    this.food.count++;
                }
                this.drop(event);
            },
            decreaseCart(event){
                if(!event._constructed){
                    return;
                }
                this.food.count--;
            },
            drop(event){
                let rect = event.target.getBoundingClientRect();
                var $balls = $("#app .ball");
                let ball = null;
                for(let i =0;i<$balls.length;i++){
                    if($balls.eq(i).css("visibility")==="hidden"){
                        ball=$balls.eq(i);
                        break;
                    }
                }
                if(!ball) return
                var t = new TimelineMax();
                t.set(ball,{x:rect.left+10,y:rect.top+10,visibility:"inherit"});
                
                setTimeout(function(){
                    
                },10);
                this.$nextTick(()=>{
                    t.to(ball,1,{bezier:{curviness:1.25, values:[{x:rect.left+10,y:rect.top+10},{x:rect.left+10-60,y:rect.top+10-30},{x:32,y:window.innerHeight-36}], autoRotate:false},onComplete:function(){
                        t.set(ball,{visibility:"hidden",autoAlpha:1});
                    }});
                    t.to(ball,0.1,{autoAlpha:0},+1);
                });
                
                
            }
        }
    }
</script>

<style lang="less">
    .cartcontrol{font-size: 0;width:90px;height:36px;
        .cart-decrease{display: inline-block;padding:6px;font-size: 24px;line-height: 24px;color:rgb(0,160,220);position:absolute;left: 0;}
        .cart-count{display: inline-block;vertical-align: top;width:12px;padding-top: 6px;line-height: 24px;text-align: center;font-size: 10px;color:rgb(147,153,159);position:absolute;left: 40px;}
        .cart-add{display: inline-block;padding:6px;font-size: 24px;line-height: 24px;color:rgb(0,160,220);position:absolute;left: 55px;}
        
    }
</style>