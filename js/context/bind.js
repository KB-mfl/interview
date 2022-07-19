/*
 * @Author: zhuziqiang z2206071258@163.com
 * @Date: 2022-07-19 00:35:48
 * @LastEditors: zhuziqiang z2206071258@163.com
 * @LastEditTime: 2022-07-19 02:00:37
 */

Function.prototype.myBind = function (context, ...arg1) {
  // return (...arg2) => {
  //   this.myCall(context, ...arg1, ...arg2);
  // };
  console.log(context);
  const f = function () {
    console.log(context);
  };
  return f;
};

Function.prototype.myCall = function (context, ...arg) {
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
let sayName = function (...arg) {
  console.log(this.name + ` is a ${arg} ` + this.sex);
};
// sayName.myBind(zhu, "handsome")("kkkk");
console.log(sayName.myBind(zhu, "handsome")("xxx"));
