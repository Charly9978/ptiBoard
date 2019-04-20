export function sumByLabel(datas,dataProprity){
    let sumObject = datas.reduce((stat,data)=>{
    stat[data[dataProprity]]?stat[data[dataProprity]]+=1:stat[data[dataProprity]]=1;
    return stat
    },{})
    let sum=[]
    let labels=[]
    for(var label in sumObject){
      sum.push(sumObject[label])
      labels.push(label)
    }
    return {
      sum,
      labels
    }

}

export function chartData(data,labels){
  return {
       datasets: [{
           data: data,
           backgroundColor: [
             '#9d44b5',
             '#b5446e',
             '#00D8FF',
             '#DD1B16']
               }],
           labels: labels
 
         }
 }