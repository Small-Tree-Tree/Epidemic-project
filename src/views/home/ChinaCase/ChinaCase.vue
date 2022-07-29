<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-26 22:15:17
 * @LastEditTime: 2022-07-28 19:32:41
-->


<template>
  <div class="ChinaCase-wrapper">
    <div class="title">中国病例</div>
    <!-- 固定标题 -->
    <div class="fixedBox">
      <ul class="fixedTitle">
        <li>地区</li>
        <li>现有确诊</li>
        <li>确诊</li>
        <li>死亡</li>
        <li>治愈</li>
        <li>疫情</li>
      </ul>
    </div>
    <!-- 地区详情 -->
    <div class="province-wrapper">
      <!-- 每一个省份的内容 -->
      <div class="province-item" v-for="item in china.children" :key="item.id" :id="`box${item.id}`">
        <ul class="province-Info" @click="shiftProvince(item.id)">
          <li class="Pname"><span><img :id="`img${item.id}`" src="../../../assets/arrow.png" /></span> {{item.name}}</li>
          <li class="pnewConfrim">{{ item.total.confirm }}</li>
          <li class="Pconfirm">{{ item.total.confirm + item.total.dead }}</li>
          <li class="Pdead">{{ item.total.dead }}</li>
          <li class="Pheal">{{ item.total.heal }}</li>
          <li class="Pcondition">暂无</li>
        </ul>

      <!-- 每一个地区的内容 -->
        <ul class="province-area" v-for="area in item.children" :key="area.id">
          <li class="Aname">{{ area.name }}</li>
          <li class="AnewConfrim">{{ area.total.confirm }}</li>
          <li class="Aconfirm">{{ area.total.confirm - area.total.dead }}</li>
          <li class="Adead">{{ area.total.dead }}</li>
          <li class="Aheal">{{ area.total.heal }}</li>
          <li class="Acondition">暂无</li>
        </ul>
      </div>
    </div>
    <!-- end -->
    <p class="end">以上数据均来自官方通报</p>
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { IData, InitDataFun } from "../../../viewsTS/index";
export default defineComponent({
  setup(props, context) {
    // 修改样式的回调函数
    let shiftProvince = (id: string) => {
      // 对列表样式的控制
      // 在这里遇到了问题,想要让当前province-item下province-area所有的dom节点添加active类名
      // 发现document.querySelectorAll的类型是NodeListOf<Element>,是一个数组,可以进行遍历
      let areaDom = document.querySelectorAll(`#box${id} .province-area`) as NodeListOf<Element>;
      let arrow = document.getElementById(`img${id}`) as HTMLElement;
      areaDom.forEach((item) => {
        item.classList.toggle("active");
      });
      arrow.classList.toggle("active");
    };

    // 获取数据整理数据
    let data = reactive(new IData());
    InitDataFun(data);
    return { shiftProvince, ...toRefs(data) };
  },
});
</script>

<style scoped lang='less'>
.ChinaCase-wrapper {
  box-sizing: border-box;
  padding: 0 30px;
  .title {
    font-size: 36px;
    line-height: 80px;
  }

  // 固定标题
  .fixedBox {
    position: sticky;
    top: 85px;
    .fixedTitle {
      display: flex;
      justify-content: space-around;
      background: #eeeeee;
      li {
        list-style: none;
        font-size: 26px;
        line-height: 82px;
        text-align: center;
        &:nth-child(1) {
          width: 20%;
        }
        &:nth-child(2) {
          width: 20%;
          color: #e44a3d;
        }
        &:nth-child(3) {
          width: 20%;
        }
        &:nth-child(4),
        &:nth-child(5) {
          width: 14%;
        }
        &:nth-child(6) {
          width: 12%;
        }
      }
    }
  }

  // 地区信息展示
  .province-wrapper {
    .province-item {
      border: 1px solid #e9e9e9;
      border-top: none;
      border-bottom: none;
      &:nth-child(2n){
          background: #EEEEEE;
      }
      .province-Info,
      .province-area {
        border-bottom: 1px solid #e9e9e9;
        li {
          list-style: none;
          text-align: center;
          line-height: 90px;
          font-size: 24px;
          &:nth-child(1) {
            width: 20%;
          }
          &:nth-child(2) {
            width: 20%;
          }
          &:nth-child(3) {
            width: 20%;
          }
          &:nth-child(4),
          &:nth-child(5) {
            width: 14%;
          }
          &:nth-child(6) {
            width: 12%;
          }
        }
      }

      .province-Info {
        display: flex;
        // 地区
        .Pname {
          font-weight: bold;
          img {
            transition: all 0.3s;
            &.active {
              transform: rotate(-180deg);
            }
          }
        }
        // 确诊
        .pnewConfrim {
          color: #e44a3d;
        }
      }

      .province-area {
        display: none;
        li {
          font-size: 22px;
        }
        &.active {
          display: flex;
        }
        // 地区
        .Aname {
          color: #707070;
        }
        // 确诊
        .AnewConfrim {
          color: #e44a3d;
        }
      }

    }
  }

  // end
  .end{
    line-height: 90px;
    font-size: 24px;
    color: #AAAAAA;
    text-align: right;
  }

  .line{
    background: #F4F4F4;
    height: 16px;
    margin: 10px 0;
  }
}
</style>