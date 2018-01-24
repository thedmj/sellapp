<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>
<script>
    export default{
        props:["size","score"],
        computed:{
            starType(){
                return "star-" + this.size;
            },
            itemClasses(){
                let result = [];
                let score =Math.floor(this.score*2)/2;
                let hasDecimal = score%1!==0;
                let integer = Math.floor(score);
                for(let i =0;i<integer;i++){
                    result.push("on");
                }
                if(hasDecimal){
                    result.push("half");
                }
                while(result.length<5){
                    result.push("off");
                }
                return result;
            }
        }
    }
</script>
<style lang="less">
// @import "../common/resource/img/star36_on@2x.png"
    .star{font-size: 0;
        .star-item{display: inline-block;background-size: contain;}
        &.star-48{
            .star-item{width:20px;height:20px;margin-right:22px;
                &.on{background: url("../common/resource/img/star48_on@2x.png") no-repeat;background-size: contain;}
                &.half{background: url("../common/resource/img/star48_half@2x.png") no-repeat;background-size: contain;}
                &.off{background: url("../common/resource/img/star48_off@2x.png") no-repeat;background-size: contain;}
                &:last-child{margin-right: 0;}
            }
            
        }
        &.star-36{
            .star-item{width:15px;height:15px;margin-right:6px;
                &.on{background: url("../common/resource/img/star36_on@2x.png") no-repeat;background-size: contain;}
                &.half{background: url("../common/resource/img/star36_half@2x.png") no-repeat;background-size: contain;}
                &.off{background: url("../common/resource/img/star36_off@2x.png") no-repeat;background-size: contain;}
            }
            
        }
        &.star-24{
            .star-item{width:10px;height:10px;margin-right:3px;
                &.on{background: url("../common/resource/img/star24_on@2x.png") no-repeat;background-size: contain;}
                &.half{background: url("../common/resource/img/star24_half@2x.png") no-repeat;background-size: contain;}
                &.off{background: url("../common/resource/img/star24_off@2x.png") no-repeat;background-size: contain;}
            }
            
        }
        
    }
</style>