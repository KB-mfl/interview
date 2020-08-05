let newPromise = require('./promise')

//无论成功还是失败,都会执行cb
//finally会返回一个promise对象，向下传递的data or err基于上一个promise,与cb无关
//finally是原型链上的方法
//Promise.resolve是等待promise执行完成
newPromise.prototype.finally = function(cb){
  let p = this;
  return p.then(data=>{
    //p成功，如果cb是个promise，需要等待cb执行完成
    return Promise.resolve(cb()).then(()=>data)
  },err=>{
    //p失败
    return Promise.resolve(cb()).then(()=>{throw err})
  })
}

let p = new newPromise((resolve,reject)=>{
  resolve('这是p的')
})
p.finally(()=>{
  console.log('cute')
  return new newPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('不关我事')
    })
  })
}).then((data)=>{
  console.log(data)
})