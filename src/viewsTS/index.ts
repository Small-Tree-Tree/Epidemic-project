/*
 * @Descripttion: 
 * @version: 
 * @Author: Tree
 * @Date: 2022-07-22 23:09:03
 * @LastEditTime: 2022-07-28 23:47:09
 */
// 导入初始化数据接口
// 导入的这种形式是告诉导入的是一个类型
import { IinitData, IareaTree, chinaTotalType } from "../type/index";
import request from "../util/request"
// 定义一个类,用来初始化数据
class IData implements IinitData{
    areaTree: IareaTree[] = [];
    china:IareaTree = {
      exxData: {},
      name: "",
      id: "",
      children: [],
      lastUpdateTime: "",
      today: {
        confirm: 0,
        dead: 0,
        heal: 0,
        input: 0,
        sever: 0,
        storeConfirm: 0,
        suspect: 0
      },
      total: {
        confirm: 0,
        dead: 0,
        heal: 0,
        input: 0,
        sever: 0,
        storeConfirm: 0,
        suspect: 0
      }
    };
    chinaTotal: chinaTotalType = {
      extData: {
        incrNoSymptom: 0,
        noSymptom: 0
      },
      today: {
        confirm: 0,
        dead: 0,
        heal: 0,
        input: 0,
        sever: 0,
        storeConfirm: 0,
        suspect: 0
      },
      total: {
        confirm: 0,
        dead: 0,
        heal: 0,
        input: 0,
        sever: 0,
        storeConfirm: 0,
        suspect: 0
      }
    };
    lastUpdateTime: string = '';
    chinaDayList: any[] = [];
    fujianData: object = {};
    type: number = 1;
    fjData:any;
    area:any[]=[]
}


// 定义初始化函数
const InitDataFun = async(data:IData)=>{
    let res = await request({
        url:'/list-total',
        method:'GET'
      })  
      data.areaTree = res.data.areaTree
      data.chinaTotal = res.data.chinaTotal
      data.lastUpdateTime = res.data.lastUpdateTime
      data.chinaDayList = res.data.chinaDayList 
      let china:any = data.areaTree.find(item=>item.id === '0')
      data.china = china
      data.fjData = china.children.find((item:any)=>item.id === "350000")
      china.children.map((item:any)=>{
        data.area.push({
          name:item.name,
          value:item.total.confirm - item.total.dead-item.total.heal || 0
        })
      })
}



export {IData,InitDataFun}