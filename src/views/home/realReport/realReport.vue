<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-29 13:46:59
 * @LastEditTime: 2022-07-29 14:55:53
-->
<template>
    <div class="realReport-wrapper">
        <!-- 大标题 -->
        <div class="big-title" id="realReport">实时播报</div>
        <!-- 内容区域 -->
        <div class="realReport-item">
            <p class="time">2022.07.29 09:45:46</p>
            <div class="title">
                <h2>兰州新冠疫情防控发布会</h2>
                <a href="https://live.163.com/room/256892.html">查看详细报道 > </a>
            </div>
        </div>
        <div class="realReport-item">
            <p class="time">2022.07.29 09:45:46</p>
            <div class="title">
                <h2>兰州新冠疫情防控发布会</h2>
                <a href="https://live.163.com/room/256892.html">查看详细报道 > </a>
            </div>
        </div>
        <div class="realReport-item">
            <p class="time">2022.07.29 09:45:46</p>
            <div class="title">
                <h2>兰州新冠疫情防控发布会</h2>
                <a href="https://live.163.com/room/256892.html">查看详细报道 > </a>
            </div>
        </div>
        <div class="realReport-item">
            <p class="time">2022.07.29 09:45:46</p>
            <div class="title">
                <h2>兰州新冠疫情防控发布会</h2>
                <a href="https://live.163.com/room/256892.html">查看详细报道 > </a>
            </div>
        </div>
        <div class="realReport-item">
            <p class="time">2022.07.29 09:45:46</p>
            <div class="title">
                <h2>兰州新冠疫情防控发布会</h2>
                <a href="https://live.163.com/room/256892.html">查看详细报道 > </a>
            </div>
        </div>
        <!-- more -->
        <div class="moreBtn">更多新闻</div>
        <div class="moreEpidemic">了解疫情动态，请前往网易新闻</div>
    </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup (props,context) {
        return {

        }
    }
})
</script>

<style scoped lang='less'>
// 大标题
.big-title {
  line-height: 80px;
  font-size: 36px;
  position: relative;
  padding-left: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #EEEEEE;
  &::before {
    content: "";
    width: 8px;
    height: 32px;
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    background: #e10000;
  }
}

// 内容
.realReport-item{
    margin: 20px 0 ;
    position: relative;
    padding: 0 30px;
    &::before{
        content: '';
        position:absolute;
        top: 12px;
        left: 30px;
        width: 16px;
        height: 16px;
        background: #E10000;
    }
    .time{
        color: #666666;
        font-size: 30px;
        margin-left: 30px;
        position: relative;
        &::after{
            content: '最新';
            position: absolute;
            left: 300px;
            width: 80px;
            color: white;
            background: #E10000;
            font-size: 24px;
            padding: 6px 15px;
            box-sizing: border-box;
            border-radius: 4px;
        }
    }

    .title{
        background: #F4F4F4;
        padding: 20px 35px;
        margin-top: 24px;
        margin-left: 30px;
        &::before{
            content: "";
            background: url(../../../assets/dotted.png);
            position: absolute;
            height: 100%;
            width: 2px;
            left: 36px;
            top: 40px;
        }
        h2{
            font-size: 32px;
            line-height: 60px;
        }
        a{
            color: #AAA29B;
            font-size: 26px;
            line-height: 50px;
            text-decoration: none;
            display: inline-block;
        }
    }
}

.moreBtn,.moreEpidemic{
    color: #333;
    border: 1px solid #E5E5E5;
    line-height: 90px;
    text-align: center;
    margin-top: 40px;
    font-size: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    cursor: pointer;
}
.moreEpidemic{
    color: white;
    margin-top: 30px;
    margin-bottom: 60px;
    background: #E10000;
}

</style>