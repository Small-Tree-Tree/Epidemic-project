<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-25 12:20:11
 * @LastEditTime: 2022-07-27 15:37:40
-->


<template>
  <div class="chinaTrend-wrapper">
    <!-- 曲线图 -->
    <div class="chinaTrend-box">
      <div class="chinaTrend-item">
        <h1>全国疫情新增趋势</h1>
        <div id="line1" class="china-line"></div>
      </div>
        <div class="chinaTrend-item">
        <h1>全国累计治愈/死亡趋势</h1>
        <div id="line2" class="china-line"></div>
      </div>
      <div class="chinaTrend-item">
        <h1>全国累计/现有确诊趋势</h1>
        <div id="line3" class="china-line"></div>
      </div>
    </div>
    <!-- 切换 -->
    <ul class="chinaTab">
      <li @click="shiftCharts(1)" :class="{'active':type === 1}">全国疫情<br />新增趋势</li>
      <li @click="shiftCharts(2)" :class="{'active':type === 2}">累计治愈<br />累计死亡</li>
      <li @click="shiftCharts(3)" :class="{'active':type === 3}">累计确诊<br />现有确诊</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted,reactive,toRefs } from "vue";
import * as echarts from "echarts";
import request from "../../../util/request";
import { chinaDayData } from "../../../type/index";
export default defineComponent({
  setup(props, context) {
    onMounted(() => {
      // 发请求获取数据
      request({ url: "/list-total", method: "GET" }).then((value) => {
        let chinaDayList: [] = value.data.chinaDayList;

        // 整理时间数据
        let timeList = chinaDayList.map((item: chinaDayData) => {
          return item.date;
        });

        // 引入类型
        type EChartsOption = echarts.EChartsOption;

        // 公用的配置项
        let options: EChartsOption = {
          // 踩坑，这里如果想要设置legend不同的颜色,和点的颜色可以直接在这里设置
          color: ["#B01E13", "#FFEA70"],
          title: {
            subtext: "单击图例可切换展示",
            subtextStyle: {
              color: "#999999",
              fontSize: 18,
            },
            right: 30,
            top: 20,
          },
          legend: {
            type: "plain",
            show: true,
            left: 30,
            top: 28,
            textStyle: {
              color: "#666",
              fontSize: 24,
            },
            itemWidth: 20,
            itemHeight: 20,
          },
          xAxis: {
            show: true,
            type: "category",
            boundaryGap: false,
            nameTextStyle: {
              color: "#373737",
            },
            offset: 10,
            // 开启刻度线和标签对齐
            axisTick: {
              alignWithLabel: true,
              show: false,
            },
            // 设置坐标的文本
            axisLabel: {
              rotate: 50,
            },
            data: timeList as any,
          },
          yAxis: {
            show: true,
            type: "value",
            // scale:true,
            // 设置坐标的文本
            axisLabel: {
              color: "#333",
              fontSize: 16,
            },
            splitLine:{
                lineStyle:{
                    width:2
                }
            }
          },
          tooltip: {
            show: true,
            // 'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            // 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            // 在这里踩的坑，在设置的时候只需要把你想要展示的值用formatter去定义就行了
            // 不需要再去开指示器
            trigger: "axis",
            triggerOn: "mousemove",
            formatter: "{b} <br/> {a0} : {c0} <br/> {a1} : {c1} ",
            backgroundColor: "rgba(30,30,30,0.7)",
            textStyle: {
              color: "#fff",
            },
            // 开启指示器
            // axisPointer:{
            //     show:true,
            //     type:"line",
            //     //自动吸附
            //     snap:true,
            //     label:{
            //         show:true,
            //         formatter: function(params) {
            //            return params.value
            //         }
            //     }
            // }
          },
          // 踩坑的地方，再设置的时候一直再使用padding来设置图表的位置发现
          // 很难弄，浪费了很长的时间，后面发现可以使用grid去设置组件和容器之间的位置  
          grid:{
            top:'18%',
            bottom:'18%',
            left:'18%',
            right:'15%'
          } 
        };

        initLine1(options, chinaDayList);
        initLine2(options, chinaDayList);
        initLine3(options, chinaDayList);
      });
    });

    let initLine1 = (options: any, chinaDayList: []) => {
      //  确诊
      let confirm = chinaDayList.map((item: chinaDayData) => {
        return item.today.confirm;
      });
      // 疑似
      let suspect = chinaDayList.map((item: chinaDayData) => {
        return item.today.suspect;
      });

      // 初始化图表
      let line1 = echarts.init(document.getElementById("line1") as HTMLElement);
      line1.showLoading()
      line1.setOption({
        ...options,
        series: [
          {
            name: "确诊",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#A31D13",
              width: 4,
            },
            data: confirm,
          },
          {
            name: "疑似",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#FFD667",
              width: 4,
            },
            data: suspect,
          },
        ],
      });
      line1.hideLoading()
    };

    let initLine2 = (options: any, chinaDayList: []) => {
      // 累计确诊
      let totalConfirm = chinaDayList.map((item: chinaDayData) => {
        return item.total.confirm;
      });

      // 现有确诊
      let storeConfirm = chinaDayList.map((item: chinaDayData) => {
        return item.total.storeConfirm;
      });

      // 初始化图表
      let line2 = echarts.init(document.getElementById("line3") as HTMLElement);
      line2.showLoading()
      line2.setOption({
        ...options,
        series: [
          {
            name: "累计确诊",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#A31D13",
              width: 4,
            },
            data: totalConfirm,
          },
          {
            name: "现有确诊",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#E44A3D",
              width: 4,
            },
            data: storeConfirm,
          },
        ],
      });
      line2.hideLoading()
    };

    let initLine3 = (options: any, chinaDayList: []) => {
      // 累计治愈
      let totalHeal = chinaDayList.map((item: chinaDayData) => {
        return item.total.heal;
      });

      // 累计死亡
      let totalDead = chinaDayList.map((item: chinaDayData) => {
        return item.total.dead;
      });

      // 初始化图表
      let line3 = echarts.init(document.getElementById("line2") as HTMLElement);
      line3.showLoading()
      line3.setOption({
        ...options,
        series: [
          {
            name: "累计治愈",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#58A97A",
              width: 4,
            },
            data: totalHeal,
          },
          {
            name: "累计死亡",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              color: "#828282",
              width: 4,
            },
            data: totalDead,
          },
        ],
      });
      line3.hideLoading()
    };

    let chartsType = reactive({type:1})
    // 切换图表
    const shiftCharts = (index:number)=>{
        let originIndex = 1
        let box = document.querySelector('.chinaTrend-box') as HTMLElement
        let move = (originIndex - index ) * 750
        box.style.cssText = `transform: translateX(${move}px);`
        chartsType.type = index
        originIndex = index  
    }

    return {shiftCharts,...toRefs(chartsType)};
  },
});
</script>

<style scoped lang='less'>
.chinaTrend-wrapper {
  margin-top: 40px;
  width: 100%;
  overflow: hidden;
  .chinaTrend-box {
    width: 2250px;
    display: flex;
    transition: all 0.5s;
    .chinaTrend-item {
      width: 750px;
      padding: 0 30px;
      box-sizing: border-box;
      h1 {
        font-weight: normal;
        font-size: 34px;
        line-height: 90px;
        margin-bottom: 10px;
      }
      .china-line {
        height: 600px;
        border: 1px solid #dddddd;
      }
    }
  }

  .chinaTab{
    margin-top: 20px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    li{
        font-size: 24px;
        line-height: 30px;
        border: 1px solid #D2D2D2;
        list-style: none;
        padding: 20px 50px;
        color: #444;
        box-shadow: 0 3px 8px 5px #F3F3F3;
        border-radius: 5px;
        cursor: pointer;
        &.active{
            border: 1px solid #CE4733;
            background: #FEF7F7;
        }
    }
  }
}
</style>