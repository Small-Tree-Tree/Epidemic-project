// 定义初始化数据接口
interface IinitData {
    areaTree:Array<IareaTree>,
    chinaTotal:object,
    lastUpdateTime:string,
    chinaDayList:any[],
    fujianData:object,
    type:number,
    fjData:object,
    area:any[],
    china:IareaTree
  }

  // 定义china下的数据类型
  interface IareaTree{
    today:todayAndtotal,
    total:todayAndtotal,
    exxData:object,
    name:string,
    id:string,
    children:Array<IareaTree>,
    lastUpdateTime:string
  }

  // today和total
  interface todayAndtotal{
    confirm:number ,
    dead:number ,
    heal:number ,
    input:number ,
    sever:number ,
    storeConfirm:number ,
    suspect:number 
  }

// 定义chinaTotal中的数据类型
interface chinaTotalType {
  extData:{
    incrNoSymptom:number,
    noSymptom:number
  },
  today:{
    confirm:number ,
    dead:number ,
    heal:number ,
    input:number ,
    sever:number ,
    storeConfirm:number ,
    suspect:number 
  },
  total:{
    confirm:number,
    dead:number ,
    heal:number ,
    input:number,
    sever:number ,
    storeConfirm:number ,
    suspect:number
  }
}


// 定义每天数据下的类型
interface chinaDayData {
  date:string |null,
  extData:string |null,
  lastUpdateTime:string |null,
  today:{
    confirm:number | null,
    dead:number | null,
    heal:number | null,
    input:number | null,
    sever:number | null,
    storeConfirm:number | null,
    suspect:number | null
  },
  total:{
    confirm:number | null,
    dead:number | null,
    heal:number | null,
    input:number | null,
    sever:number | null,
    storeConfirm:number | null,
    suspect:number | null
  }
}

//  这种形式是告诉暴露的是一个类型
export type{
    IinitData,
    IareaTree,
    chinaDayData,
    chinaTotalType
}