//promise.all 可以解决等待所以异步操作全部的执行结束之后统一拿到结果，实现异步并发，同步处理结果

let newPromise = require('./promise')

const isPromise = (value) =>{
  if(typeof value ==='object'&& value!==null||typeof value ==='function'){
    if(typeof value.then ==='function'){//认为是promise
      return true
    }else{
      return false
    }
  }else{
    return false
  }
}

newPromise.all = function(values){
  let index = 0
  let arr =[];
  return new newPromise((resolve,reject)=>{
    const processData = (key,value) =>{
      arr[key] = value
      if(++index===values.length){
        resolve(arr)
      } 
    }
    for(let i =0;i<values.length;i++){
      let current = values[i]
      // console.log(current)
      if(isPromise(current)){
        current.then((data)=>{
          processData(i,data)
        },(error)=>{
          reject(error)
        })
      }else{
        processData(i,current)
      }
    }
  })
}

let zhuziqiang = new newPromise((resolve,reject)=>{
  resolve(1)
})


let zhuziling = new newPromise((resolve,reject)=>{
  resolve(2)
})


let dog = newPromise.all([1,2,3,zhuziqiang,zhuziqiang]).then((data)=>{
  console.log(data)
})