/*
 * @Author: zhuziqiang z2206071258@163.com
 * @Date: 2022-07-18 22:25:31
 * @LastEditors: zhuziqiang z2206071258@163.com
 * @LastEditTime: 2022-07-19 00:11:27
 */
Function.prototype.myApply = function (context, arg) {
  // context 可能是object 、arrar、 null
  context = typeof context === "object" ? context : window;
  let fn = Symbol();
  // typeof this === 'function'
  context[fn] = this;
  let result = context[fn](...arg);
  delete context[fn];
  return result;
};
