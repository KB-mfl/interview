//promiseyz有三个状态，resolve,reject,pendding
//状态一旦确定状态就不能改变
//每个promise都有一个then方法
//executor执行函数里只要出错就是reject状态

// let promise = new Promise((res,rej)=>{//executor立即执行器

// })

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
const resolvePromise = (promise2,x,res,rej)=>{
  if(promise2===x){
    return rej(new TypeError('循环调用'))
  }
  if((typeof x==='object' && x!== null)|| typeof x ==='function'){
    let called;//做个屏蔽，防止成功和失败多次调用
    try {
      let then = x.then;//尝试取x.then,因为then可能是defineProperty来定义的，此时访问then时会出发get()，而get里会抛错
      if(typeof then ==='function'){//有then方法，姑且就认为是promise
        then.call(x,y=>{//保证第一次取值不报错，而第二次取值会报错
          if(called){
            return
          }
          called = true
          resolvePromise(promise2,y,res,rej)//由于上一次的promise中的resolve传递的参数依旧是promise所以这里需要解析，直到y是个普通值
        },r=>{
          if(called){
            return
          }
          called = true
          rej(r)
        })
      }else{
        //普通对象
        res(x)
      }
    } catch (error) {
      if(called){
        return
      }
      called = true
      rej(error)
    }
  }else{
    //x就是普通值
    res(x)
  }
}
class newPromise {
  constructor(exector){
    this.status = PENDING;
    this.value = undefined
    this.reason = undefined
    this.onRejectCallbacks = [];
    this.onResolveCallbacks =[];
    let res =  (valeu) =>{
      if(this.status ===PENDING){
        this.value = valeu;
        this.status = RESOLVED
        this.onResolveCallbacks.forEach(fn=>fn())//发布模式
      }
    }
    let rej = (reason) =>{
      if(this.status === PENDING){
        this.reason = reason;
        this.status = REJECTED
        this.onRejectCallbacks.forEach(fn=>fn());
      }
    }
    try {
      exector(res,rej)
    } catch (error) {
      rej(error)
    }
  }
  then(onfulfilled,onrejected){
    onfulfilled = typeof onfulfilled ==='function'?onfulfilled:data=>data
    onrejected = typeof onrejected ==='function'?onrejected:err=>{throw err}
    let promise2 = new newPromise((res,rej)=>{
      if(this.status===RESOLVED){
        setTimeout(()=>{//setTimeout主要是考虑到resolvePromise()要传递promise2参数，需要提前声明
          try {
            let x = onfulfilled(this.value)
            resolvePromise(promise2,x,res,rej)//x决定了promise2的状态是成功还是失败,来调用res,还是rej
          } catch (error) {
            rej(error)
          }
        },0)
      }
      if(this.status === REJECTED){
        setTimeout(()=>{
          try {
            let x = onrejected(this.reason)
            resolvePromise(promise2,x,res,rej)
          } catch (error) {
            rej(error)
          }
        },0)
      }

      if(this.status ===PENDING){
        this.onResolveCallbacks.push(()=>{
          //todo push()里可以onfulfilled(this.value)，但是考虑到扩展性，采用()=>{todo something;fn}
          setTimeout(()=>{
            try {
              let x = onfulfilled(this.value);//订阅模式
              resolvePromise(promise2,x,res,rej)
            } catch (error) {
              rej(error)
            }
          },0)
        })
        this.onRejectCallbacks.push(()=>{
          setTimeout(()=>{
            //todo
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2,x,res,rej)
            } catch (error) {
              rej(error)
            }
          },0)
        })
      }
    })
    return promise2
  }
}

newPromise.defer = newPromise.deferred = function(){
  let dfd = {};
  dfd.promise = new newPromise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd
}
module.exports = newPromise



// promises-aplus-tests promise.js完全符合a+规范
