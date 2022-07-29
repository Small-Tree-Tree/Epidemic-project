<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-22 13:37:09
 * @LastEditTime: 2022-07-29 14:58:39
-->

<template>
    <div class="wrapper">
        <topData></topData>
         <!-- 锚点 -->
        <ul class="anchor">
        <li>
            <a
            href="#chinaEpidemic"
            :class="{ active: shiftType.titleType == 0 }"
            @click="shiftType.titleType = 0"
            >中国疫情</a
            >
        </li>
        <li>
            <a
            href="#worldEpidemic"
            :class="{ active: shiftType.titleType == 1 }"
            @click="shiftType.titleType = 1"
            >世界疫情</a
            >
        </li>
        <li>
            <a
            href="#realReport"
            :class="{ active: shiftType.titleType == 2 }"
            @click="shiftType.titleType = 2"
            >实时播报</a
            >
        </li>
        </ul>
        <ChinaMap></ChinaMap>
        <ChinaLine></ChinaLine>
        <ChinaCase></ChinaCase>
        <WorldCase></WorldCase>
        <realReport></realReport>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import topData from "./topData/topData.vue"
import ChinaMap from './ChinaMap/ChinaMap.vue'
import ChinaLine from "./ChinaLine/ChinaLine.vue"
import ChinaCase from './ChinaCase/ChinaCase.vue'
import WorldCase from "./WorldCase/WorldCase.vue"
import realReport from "./realReport/realReport.vue"
export default defineComponent({
    components:{topData, ChinaMap,ChinaLine,ChinaCase,WorldCase,realReport},
    setup (props,context) {
        let shiftType = reactive({titleType:0})
        return {
            shiftType
        }
    }
})
</script>

<style scoped lang='less'>
.wrapper{
    width: 750px;
    margin: 0 auto;
}

.anchor {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-bottom: 2px solid #eeeeee;
  background: #fff;
  li {
    list-style: none;
    a {
      display: block;
      font-size: 28px;
      line-height: 80px;
      text-decoration: none;
      color: #333;
      &.active {
        color: #e10000;
        border-bottom: 4px solid #e10000;
        font-weight: bold;
      }
    }
  }
}

</style>