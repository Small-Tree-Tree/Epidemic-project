<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-28 16:29:02
 * @LastEditTime: 2022-07-29 13:45:27
-->
<template>
  <div class="world-wrapper">
    <!-- 大标题 -->
    <div class="big-title" id="worldEpidemic">世界疫情</div>

    <!-- 世界疫情 -->
    <div class="world-box">
      <!-- tab -->
      <div class="tab-wrapper">
        <div class="tab-box">
          <div class="tab" :class="{ active: type === 1 }" @click="shiftTab(1)">
            世界疫情 (含中国)
          </div>
          <div class="tab" :class="{ active: type === 2 }" @click="shiftTab(2)">
            海外疫情
          </div>
        </div>

        <ul class="world-epidemic">
          <li>
            <h3>累计确诊</h3>
            <p>{{ type === 1? confirm : overseaData.confirm }}</p>
            <span
              >较昨日 <span class="num">+{{ compare.confirm }}</span></span
            >
          </li>
          <li>
            <h3>现有确诊</h3>
            <p>{{ type === 1? newConfirm : overseaData.newConfirm }}</p>
            <span
              >较昨日 <span class="num">+{{ compare.newConfirm }}</span></span
            >
          </li>
          <li>
            <h3>累计死亡</h3>
            <p>{{ type === 1? dead : overseaData.dead }}</p>
            <span
              >较昨日 <span class="num">+{{ compare.dead }}</span></span
            >
          </li>
          <li>
            <h3>累计治愈</h3>
            <p>{{ type === 1? heal : overseaData.heal }}</p>
            <span
              >较昨日 <span class="num">+{{ compare.heal }}</span></span
            >
          </li>
        </ul>

        <div class="time">
          <span>{{ lastTime }}</span>
          <span>数据说明</span>
        </div>
      </div>

      <!-- 世界病例 -->
      <div class="world-case">
        <div class="title">世界病例</div>

        <div class="worldCaseList">
          <ul class="worldCaseTitle">
            <li>地区</li>
            <li>新增确诊</li>
            <li>累计确诊</li>
            <li>死亡</li>
            <li>治愈</li>
          </ul>

          <ul class="worldlist-item"
            v-for="country in areaTree"
            :key="country.id"
          >
            <li>{{ country.name }}</li>
            <li>{{ country.today.confirm }}</li>
            <li>{{ country.total.confirm }}</li>
            <li>{{ country.total.dead }}</li>
            <li>{{ country.total.heal }}</li>
          </ul>

          <div class="end">以上数据来自各国（地区）官方通报和权威媒体报道</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "vue";
import request from "../../../util/request";
import { IareaTree } from "../../../type/index";
export default defineComponent({
  setup(props, context) {
    const Type = reactive({
      type: 1,
    });
    const shiftTab = (type: number) => {
      Type.type = type;
    };

    // 整理tab模块的数据
    // 累计确诊 现有确诊 累计死亡 累计治愈
    let tabData = reactive({
      confirm: 0,
      newConfirm: 0,
      dead: 0,
      heal: 0,
      overseaData: {
        confirm: 0,
        newConfirm: 0,
        dead: 0,
        heal: 0,
      },
      compare: {
        confirm: 0,
        newConfirm: 0,
        dead: 0,
        heal: 0,
      },
      lastTime:''
    });

    // 保存世界病例的数据
    let areaTree: Array<IareaTree> = reactive([]);

    let getData = async () => {
      let res = await request({
        url: "/list-total",
        method: "GET",
      });
      let result = res.data.areaTree;
      result.forEach((item:any)=>{
          areaTree.push(item)
      })
      areaTree.forEach((item: IareaTree) => {
        // 世界
        tabData.confirm += item.total.confirm;
        tabData.dead += item.total.dead;
        tabData.heal += item.total.heal;

        // 较昨日
        tabData.compare.confirm += item.today.confirm;
        tabData.compare.dead += item.today.dead;
        tabData.compare.heal += item.today.heal;
        tabData.compare.newConfirm +=
          item.today.confirm - item.today.dead - item.today.heal;
      });
      tabData.lastTime = res.data.lastUpdateTime;
      tabData.newConfirm = tabData.confirm - tabData.dead - tabData.heal;

      let chinaData: any = areaTree.find((item: any) => {
        return item.id == "0";
      });

      // 海外
      tabData.overseaData.confirm = tabData.confirm - chinaData.total.confirm;
      tabData.overseaData.dead = tabData.dead - chinaData.total.dead;
      tabData.overseaData.heal = tabData.heal - chinaData.total.heal;
      let chinaDataNew =
        chinaData.total.confirm - chinaData.total.dead - chinaData.total.heal;
      tabData.overseaData.newConfirm = tabData.newConfirm - chinaDataNew;
    };

    onMounted(() => {
      getData()      
    });

    /*
        在写项目的时候踩的坑，我使用reactive定义一个响应式数组的时候,
        当网络请求返回数据直接赋值给数组之后,页面的数据并没有发生改变。
        
        后面查出原因：直接把一个新的数组赋值给areaTree,导致reactive声明
        的响应式对象由areaTree代理,被新的数组所替代,因为在操作代理对象的
        时候需要有代理对象作为前提,所以失去了响应式,**在vue3中不管是对象
        还是数组都不能直接将整个数据进行赋值，这样会造成reactive定义的响应式失效

        解决办法:
        1.使用ref函数
        2.创建一个reactive对象,对象的属性是数组,在return的时候使用toRefs对响应式对象进行处理
        3.使用数组的方法,如push
     */
    return {
      shiftTab,
      ...toRefs(Type),
      ...toRefs(tabData),
      areaTree,
    };
  },
});
</script>

<style scoped lang='less'>
.world-wrapper {
  padding: 0 30px;
  // 大标题
  .big-title {
    line-height: 90px;
    font-size: 36px;
    position: relative;
    padding-left: 60px;
    box-sizing: border-box;
    border-bottom: 2px solid #eeeeee;
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

  // 世界疫情
  .world-box {
    .tab-wrapper {
      border-radius: 15px;
      margin: 30px 0;
      box-shadow: 0 5px 10px 5px #f5f5f5;

      .tab-box {
        display: flex;
        .tab {
          width: 50%;
          line-height: 80px;
          text-align: center;
          background: #f1f1f1;
          cursor: pointer;
          font-size: 26px;
          &.active {
            background: white;
          }
        }
      }

      .world-epidemic {
        background: white;
        display: flex;
        justify-content: space-around;
        margin-top: 32px;
        li {
          list-style: none;
          text-align: center;
          h3 {
            font-weight: bold;
            font-size: 22px;
          }
          p {
            font-size: 34px;
            line-height: 80px;
            letter-spacing: -2px;
          }
          span {
            font-size: 18px;
            color: #999999;
          }

          &:nth-child(1) {
            p,
            .num {
              color: #a31d13;
            }
          }
          &:nth-child(2) {
            p,
            .num {
              color: #e44a3d;
            }
          }
          &:nth-child(3) {
            p,
            .num {
              color: #333333;
            }
          }
          &:nth-child(4) {
            p,
            .num {
              color: #31ac7c;
            }
          }
        }
      }

      .time {
        display: flex;
        padding: 0 30px;
        justify-content: space-between;
        margin: 10px 0;
        span {
          font-size: 20px;
          color: #a9a9a9;
          line-height: 60px;
        }
      }
    }

    .world-case {
      margin-bottom: 30px;
      .title {
        line-height: 80px;
        font-size: 34px;
      }

      .worldCaseList {
        .worldCaseTitle {
          position: sticky;
          top: 85px;
          display: flex;
          justify-content: space-around;
          list-style: none;
          line-height: 80px;
          font-size: 26px;
          z-index: 100;
          li {
            background: #ebebeb;
            width: 20%;
            text-align: center;
            &:nth-child(2) {
              color: #d82b1e;
            }
          }
        }

        .worldlist-item {
          display: flex;
          background: #ffffff;
          border-bottom: 1px solid #ebebeb;
          li {
            list-style: none;
            text-align: center;
            font-size: 26px;
            line-height: 80px;
            &:nth-child(1) {
              width: 20%;
            }
            &:nth-child(2) {
              font-size: 20px;
              color: #d82b1e;
              width: 20%;
            }
            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5) {
              font-size: 20px;
              width: 20%;
            }
          }
        }

        .end{
          font-size: 22px;
          color: #AAAAAA;
          text-align: right;
          margin: 30px 0;
        }

        .line{
          background: #F4F4F4;
          height: 20px;
        }
      }
    }
  }

}
</style>