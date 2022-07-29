<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-23 11:46:30
 * @LastEditTime: 2022-07-27 15:37:47
-->



<template>
  <div class="mapContain">
    <!-- 大标题 -->
    <div class="big-title" id="chinaEpidemic">中国疫情</div>
    <!-- 中国地图 -->
    <div class="chinaMap">
      <div class="swiper-Map" ref="swiperMap">
        <div class="newConfirm" id="newConfirm-Map"></div>
        <div class="totalConfirm" id="totalConfirm-Map"></div>
      </div>
    </div>
    <!-- 切换地图按钮 -->
    <div class="shiftMap">
      <div
        :class="shiftType.type == 'left' ? 'active' : ''"
        @click="changeMap('left')"
      >
        现有确诊
      </div>
      <div
        :class="shiftType.type == 'right' ? 'active' : ''"
        @click="changeMap('right')"
      >
        累计确诊
      </div>
    </div>
    <!-- 城市比例 -->
    <div class="percentage-city">
      <div class="title">
        <h1>全国疫情</h1>
        <p>累计确诊城市</p>
        <span>358</span>
      </div>
      <div class="percentage-box">
        <div class="percentage">
          <div class="left">
            <div>213</div>
            <div>零病例城市</div>
          </div>
          <div class="bar"></div>
          <div class="right">
            <div>145</div>
            <div>有病例城市</div>
          </div>
        </div>
        <p class="percentage-tip">
          全国累计确诊患者分布于358个城，目前213个城市已实现现有确诊“清零”。注：此数据不包含境外输入病例。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import chinaJson from "../../../assets/chinaMap.json";
import request from "../../../util/request";
export default defineComponent({
  setup(props, context) {
    // 导入echarts中的类型用来限定setoption
    type EChartsOption = echarts.EChartsOption;

    // 在页面挂载后展示
    onMounted(() => {
      initMap();
    });

    // 初始化地图
    const initMap = async () => {
      let res = await request({
        url: "/list-total",
        method: "GET",
      });
      
      let china = res.data.areaTree.find((item: any) => item.id === "0");

      // 现有确诊的数据
      let areaArr = china.children.map((item: any) => {
        return {
          name: item.name,
          value: item.total.confirm - item.total.dead - item.total.heal || 0,
        };
      });

      // 累计确诊的数据
      let areaAllArr = china.children.map((item: any) => {
        return {
          name: item.name,
          value: item.total.confirm,
        };
      });

      // 获取节点,初始化echarts
      let Map1 = echarts.init(
        document.getElementById("newConfirm-Map") as HTMLElement
      );
      let Map2 = echarts.init(
        document.getElementById("totalConfirm-Map") as HTMLElement
      );
      Map1.showLoading();
      Map2.showLoading();

      // 注册地图
      echarts.registerMap("china", chinaJson as any);
      // 书写公共配置项
      let optionMap: EChartsOption = {
        // 标题
        title: {
          text: "中国疫情图",
          textStyle: {
            color: "#353535",
            fontSize: 22,
          },
          subtext: "单击省份可查看病例数",
          subtextStyle: {
            color: "#9B9B9B",
            fontSize: 16,
          },
          top: 25,
          left: 30,
        },
        // 视觉映射组件
        visualMap: {
          type: "piecewise",
          // 开启标签不然看不到文字
          showLabel: true,
          pieces: [
            { gte: 10000, label: "> 10000人" }, // (1500, Infinity]
            { gte: 1000, lte: 9999, label: "1000 - 9999人" }, // (900, 1500]
            { gte: 500, lte: 999, label: "500 - 999人" }, // (310, 1000]
            { gte: 100, lte: 499, label: "100 - 499人" }, // (200, 300]
            { gte: 10, lte: 99, label: "10 - 99人" }, // (200, 300]
            { gte: 1, lte: 9, label: "1 - 9人" }, // (200, 300]
            { lte: 0, label: "0" }, // (200, 300]
          ],
          min: 0,
          max: 10000,
          realtime: false,
          calculable: true,
          inRange: {
            color: [
              "white",
              "#FFF2CF",
              "#FDD2A0",
              "#FF8C71",
              "#E64B45",
              "#7F1100",
            ],
          },
          left: 30,
          bottom: 35,
          text: ["高", "低"], //取值范围的文字
          textStyle: {
            color: "#333",
          },
        },
        // 提示框组件
        tooltip: {
          trigger: "item",
          /*
                折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）

                散点图（气泡）图 : {a}（系列名称），{b}（数据名称），{c}（数值数组）, {d}（无）

                地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）

                饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比） 
            */
          formatter: "现有确诊病例 </br> {b} : {c}",
        },
        // 地理坐标系组件
        geo: {
          // 注册地图的名字
          map: "china",
          roam: false,
          zoom: 1.3,
          top: 150,
          label: {
            show: true,
            position: ["50%", "50%"],
            color: "#333",
            fontSize: 12,
          },
          // 地区的配置
          itemStyle: {
            areaColor: "#fff",
            borderColor: "#DCDCDC",
          },
          // 高亮配置
          emphasis: {
            itemStyle: {
              areaColor: "#45CFFF",
              borderColor: "#45CFFF",
            },
          },
        },
      };

      Map1.setOption({
        ...optionMap,
        series: {
          name: "中国疫情图",
          type: "map",
          geoIndex: 0,
          data: areaArr,
        },
      });

      Map2.setOption({
        ...optionMap,
        series: {
          name: "中国疫情图",
          type: "map",
          geoIndex: 0,
          colorBy: "series",
          data: areaAllArr,
        },
      });

      Map1.hideLoading();
      Map2.hideLoading();
    };

    // 获取容器节点
    const swiperMap: any = ref();

    let shiftType = reactive({
      type: "left"
    });

    // 切换图片回调函数
    const changeMap = (type: string) => {
      if (type === shiftType.type) return;
      if (type === "left") {
        swiperMap.value.classList.remove("move");
      } else {
        swiperMap.value.classList.add("move");
      }
      shiftType.type = type;
    };
    return {
      changeMap,
      swiperMap,
      shiftType,
    };
  },
});
</script>

<style scoped lang='less'>

// 大标题
.big-title {
  line-height: 100px;
  font-size: 36px;
  position: relative;
  padding-left: 60px;
  box-sizing: border-box;
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

// 中国地图
.chinaMap {
  box-sizing: border-box;
  width: 750px;
  overflow: hidden;
  .swiper-Map {
    display: flex;
    width: 1500px;
    transition: all 0.5s;
    .newConfirm,
    .totalConfirm {
      margin: 0 30px;
      width: 684px;
      height: 718px;
      background: #f3f3f3;
      border: 1px solid #dddddd;
    }
    &.move {
      transform: translateX(-750px);
    }
  }
}

// 切换地图
.shiftMap {
  margin-top: 20px;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  div {
    width: 335px;
    line-height: 90px;
    font-size: 24px;
    color: #333;
    border: 1px solid #d2d2d2;
    box-shadow: 0 5px 10px 2px #f3f3f3;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    &.active {
      background: #fef7f7;
      border: 1px solid #ce4733;
      color: #ce2c1e;
    }
  }
}

// 全国疫情比例
.percentage-city {
  padding: 0 30px;
  box-sizing: border-box;
  margin-top: 60px;
  .title {
    display: flex;
    align-items: flex-end;
    margin-bottom: 50px;
    h1 {
      font-size: 34px;
      color: #333;
      font-weight: normal;
    }
    p {
      color: #737473;
      font-size: 30px;
      margin: 0 10px;
    }
    span {
      color: #e10000;
      font-size: 28px;
    }
  }

  .percentage-box {
    height: 270px;
    background: #F4F4F4;
    padding: 35px;
    box-sizing: border-box;
    .percentage {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left,.right {
        text-align: center;
        div:nth-child(1) {
          color: #1d8ee9;
          font-size: 38px;
          line-height: 48px;
        }
        div:nth-child(2) {
          color: #737673;
          font-size: 24px;
        }
      }
      .right {
        div:nth-child(1) {
          color: #e10000;
        }
      }
      .bar {
        width: 330px;
        height: 16px;
        border-radius: 10px;
        background: url(../../../assets/bar.png) -130px 0;
      }
    }
    .percentage-tip{
      color: #A3A3A3;
      font-size: 24px;
      line-height: 32px;
      margin-top: 45px;
    }
  }
}

</style>