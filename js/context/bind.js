Function.prototype.myBind = function(context,...arg2){
  return (...arg1)=>{
    this.myCall(context,...arg1,...arg2)
  }
}

Function.prototype.myCall = function(context,...arg){
  context = typeof context ==='object'?context:window
  let fn = Symbol()
  context[fn] = this 
  let result = context[fn](...arg)
  delete context[fn]
  return result
}

let Person = function(name,sex){
  this.name = name;
  this.sex = sex
}
let zhu = new Person('kobe','boy')
let sayName = function(arg){
  console.log(this.name+` is a ${arg} `+this.sex)
}
sayName.myBind(zhu,'handsome')()