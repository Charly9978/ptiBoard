export default function sumByLable(dataProprity,sum,labels){
    let sumObject = this.datas.reduce((stat,data)=>{
    stat[data[dataProprity]]?stat[data[dataProprity]]+=1:stat[data[dataProprity]]=1;
    return stat
    },{})
    this[sum]=[]
    this[labels]=[]
    for(var label in sumObject){
      this[sum].push(sumObject[label])
      this[labels].push(label)
    }

}