<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-22 13:37:27
 * @LastEditTime: 2022-07-27 15:38:00
-->

<template>
  <div class="box-contain">
    <!-- 标题 -->
    <div class="top-box">
      <img src="https://static.ws.126.net/163/f2e/news/virus_report/static/images/banner.53e59fc.png" alt="" />

      <div class="logo">
        <h2>Tree 新闻</h2>
        <div class="more"><a href="#">更多疫情信息 ></a></div>
      </div>

      <div class="title">
        <h1>科学防护 共渡难关</h1>
        <h2>肺炎疫情实时动态播报</h2>
      </div>

      <!-- 疫情数据展示 -->
      <div class="dataTabCard">
        <!-- 按钮 -->
        <div class="tab">
          <div class="tab1" :class="{active:type==1}" @click="type=1">全国疫情数据(含港澳台)</div>
          <div class="tab2" :class="{active:type==2}" @click="type=2">福建疫情数据</div>
        </div>
        <!-- 全国 -->
        <div class="tabItem1" :class="type == 1 ? 'active' : '' ">
          <ul v-if="chinaTotal.total">
            <!-- 
                如果不写v-if就会报错原因是因为请求是在页面加载完后才发请求,那么在这之前chinaTotal只是一个空对象 
                所以读取到的值就为undefined,undefined在读属性就会报错
                加上v-if,那么当响应式数据发生改变得时候就能够再次渲染
            -->
            <li>
              <p class="tabTitle">境外输入</p>
              <p class="num">{{chinaTotal.total.input}}</p>
              <p class="newadd">较昨日 <span>+{{chinaTotal.today.input}}</span></p>
            </li>
            <li>
              <p class="tabTitle">无症状感染者</p>
              <p class="num">{{chinaTotal.extData.noSymptom}}</p>
              <p class="newadd">较昨日 <span>+{{chinaTotal.extData.incrNoSymptom}}</span></p>
            </li>
            <li>
              <p class="tabTitle">现有确诊</p>
              <p class="num">{{chinaTotal.total.confirm - chinaTotal.total.dead - chinaTotal.total.heal}}</p>
              <p class="newadd">较昨日 <span>+{{chinaTotal.today.confirm - chinaTotal.today.dead - chinaTotal.today.heal}}</span></p>
            </li>
            <li>
              <p class="tabTitle">累计确诊</p>
              <p class="num">{{chinaTotal.total.confirm}}</p>
              <p class="newadd">较昨日 <span>+{{chinaTotal.today.confirm}}</span></p>
            </li>
            <li>
              <p class="tabTitle">累计死亡</p>
              <p class="num">{{chinaTotal.total.dead}}</p>
              <p class="newadd">较昨日 <span>+{{chinaTotal.today.dead}}</span></p>
            </li>
            <li>
              <p class="tabTitle">累计治愈</p>
              <p class="num">{{chinaTotal.total.heal}}</p>
              <p class="newadd">较昨日 <span>+{{chinaTotal.today.heal}}</span></p>
            </li>
          </ul>
          <div class="time">
            <span>{{lastUpdateTime}}</span>
            <span>数据说明</span>
          </div>
        </div>
        <!-- 地区 -->
        <div class="tabItem2" :class="{active:type == 2}">
         <ul v-if="fjData">
            <li>
              <p class="tabTitle">累计确诊</p>
              <p class="num">{{fjData.total.confirm}}</p>
              <p class="newadd">较昨日 <span>+{{fjData.today.confirm}}</span></p>
            </li>
             <li>
              <p class="tabTitle">累计死亡</p>
              <p class="num">{{fjData.total.dead}}</p>
              <p class="newadd">较昨日 <span>+{{fjData.today.dead}}</span></p>
            </li>
             <li>
              <p class="tabTitle">累计治愈</p>
              <p class="num">{{fjData.total.heal}}</p>
              <p class="newadd">较昨日 <span>+{{fjData.today.heal}}</span></p>
            </li>
         </ul>
          <div class="time">
            <span>{{lastUpdateTime}}</span>
            <span>数据说明</span>
          </div>
          <div class="detail">
            <form class="areaInfo">
              <select name="area">
                <option :value="item.name" v-for="item in area">{{item.name}}</option>
              </select>
            </form>
            <div><a href="#">了解更多 ></a></div>
          </div>
        </div>
      </div>

      <!-- 查询 -->
      <div class="toolbox">
        <div class="tool-item">
            <img src="https://static.ws.126.net/163/f2e/news/virus_report/static/images/toolbox_isolate.3de0992.png" alt="">
            <p>隔离政策</p>
        </div>
        <div class="tool-item">
            <img src="https://static.ws.126.net/163/f2e/news/virus_report/static/images/toolbox_input.886e308.png" alt="">
            <p>境外输入</p>
        </div>
        <div class="tool-item">
            <img src="https://static.ws.126.net/163/f2e/news/virus_report/static/images/toolbox_truth.094511f.png" alt="">
            <p>辟谣一线</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import {IData,InitDataFun} from "../../../viewsTS/index"
export default defineComponent({
  setup(props, context) {
    // 初始化数据
    const data = reactive(new IData())

    // 发请求获取数据
    onMounted(()=>{
      InitDataFun(data)
    })

    return {
      ...toRefs(data)
    };
  },
});
</script>

<style scoped lang='less'>
.box-contain {
  width: 100%;
  height: 960px;
  .top-box {
    width: 100%;
    position: relative;
  }

  img {
    width: 100%;
    position: relative;
  }

  .logo {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px 0 45px;
    color: white;
    position: absolute;
    top: 40px;
    h2 {
      line-height: 50px;
      font-size: 30px;
    }

    .more {
      background: #e10000;
      border-radius: 40px;
      width: 180px;
      text-align: center;
      line-height: 50px;
      font-size: 22px;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }

  .title {
    width: 100%;
    position: absolute;
    top: 130px;
    color: white;
    padding-left: 40px;
    box-sizing: border-box;

    h1 {
      font-size: 50px;
      line-height: 50px;
      margin-bottom: 18px;
    }
    h2 {
      font-weight: normal;
      font-size: 36px;
      line-height: 36px;
    }
  }

  .dataTabCard {
    width: 688px;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    position: absolute;
    top: 290px;
    left: 31px;
    box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    
    .tab {
        display: flex;
        .tab1,.tab2{
            width: 344px;
            line-height: 80px;
            color: #333;
            font-size: 24px;
            background: #F1F1F1;
            text-align: center;
            cursor: pointer;
        }
        .tab1.active,.tab2.active{
            background: white;
        }
    }

    .tabItem1,.tabItem2{
        background: white;
        width: 100%;
        margin-top: 34px;
        display: none;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 229px;
                text-align: center;
                list-style: none;
                margin-bottom: 35px;
                .tabTitle{
                    font-size: 20px;
                    font-weight: bold;
                }
                .num{
                    font: 42px/74px '微软雅黑';
                }
                .newadd{
                    color: #BDBDBD;
                }

                &:nth-child(1) .num,&:nth-child(1) span{
                    color: #FFA352;
                }
                &:nth-child(2) .num,&:nth-child(2) span{
                    color: #791618;
                }
                &:nth-child(3) .num,&:nth-child(3) span{
                    color: #E44A3D;
                }
                &:nth-child(4) .num,&:nth-child(4) span{
                    color: #A31D13;
                }
                &:nth-child(5) .num,&:nth-child(5) span{
                    color: #333333;
                }
                &:nth-child(6) .num,&:nth-child(6) span{
                    color: #34AA70;
                }
            }
        }

        .time{
            display: flex;
            width: 100%;
            padding: 0 40px;
            box-sizing: border-box;
            color: #C6C6C6;
            justify-content: space-between;
            font: 18px/1.5 '微软雅黑';
            margin-top: -10px;
            margin-bottom: 20px;
        }

    }
    .tabItem2{
      ul{
        li{
         &:nth-child(1) .num,&:nth-child(1) span{
              color: #A31D13;
          }
          &:nth-child(2) .num,&:nth-child(2) span{
              color: #333333;
          }
          &:nth-child(3) .num,&:nth-child(3) span{
              color: #34AA70;
          }
      }
      }
      .detail{
        display: flex;
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        justify-content: space-between;
        margin: 40px 0 40px 0;
        .areaInfo{
          width: 290px;
          height: 70px;
          line-height: 75px;
          border: 1px solid #CFCFCF;
          text-align: center;
          border-radius: 50px;
          select{
            font-size: 26px;
            border: none;
            color: #333;
            cursor: pointer;
            outline: none;
            width: 90px;
          }
        }
        div{
          a{
            text-decoration: none;
            color: #C70904;
            background: #FFF7F7;
            display: inline-block;
            width: 290px;
            line-height: 70px;
            text-align: center;
            border-radius: 50px;
            border: 1px solid #CF2A2A;
            font-size: 26px;
          }
        }
      }
    }
    .tabItem1.active,.tabItem2.active{
      display: block;
    }

  }

  .toolbox{
    display: flex;
    position: absolute;
    top: 790px;
    width: 100%;
    justify-content: space-around;
    &::after{
        content: '';
        width: 100%;
        height: 20px;
        background: #F4F4F4;
        bottom: -30px;
        left: 0;
        position: absolute;
    }
    .tool-item{
        text-align: center;
        img{
            width: 70px;
            height: 70px;
        }
        p{
            font-size: 24px;
            line-height: 56px;
        }
    }
  }

  

}
</style>