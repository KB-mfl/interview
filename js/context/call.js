/*
 * @Author: zhuziqiang z2206071258@163.com
 * @Date: 2022-07-18 22:25:31
 * @LastEditors: zhuziqiang z2206071258@163.com
 * @LastEditTime: 2022-07-19 00:46:23
 */
Function.prototype.myCall = function (context, ...arg) {
  console.log(arg);
  console.log(arg);
  context = typeof context === "object" ? context : window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...arg);
  delete context[fn];
  return result;
};
let Person = function (name, sex) {
  this.name = name;
  this.sex = sex;
};
let zhu = new Person("kobe", "boy");
let sayName = function (arg) {
  console.log(arg);
  console.log(this.name + ` is a ${arg} ` + this.sex);
};
sayName.myCall(zhu, ["handsome"]);
