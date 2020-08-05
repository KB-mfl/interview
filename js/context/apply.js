Function.prototype.myApply = function(context,arg){
  context = typeof context ==='object'?context:window
  let fn = Symbol()
  context[fn] = this
  let result = context[fn](...arg)
  delete context[fn]
  return result
}