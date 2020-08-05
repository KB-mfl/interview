Function.prototype.myCall = function(context,...arg){
  context = typeof context ==='object'?context:window
  let fn = Symbol()
  context[fn] = this 
  let result = context[fn](...arg)
  delete context[fn]
  return result
}
// Function.prototype.myCall = function(context,...arg){
//   context = typeof context ==='object'?context:window;
//   let fn = Symbol();
//   context[fn] = this;
//   let result = context[fn](...arg)
//   //由于this是指向一个函数，为啥不可以直接this(arg)
//   delete context[fn]
//   return result
// }