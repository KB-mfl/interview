/*
 * @Author: zhuziqiang z2206071258@163.com
 * @Date: 2022-07-18 22:58:03
 * @LastEditors: zhuziqiang z2206071258@163.com
 * @LastEditTime: 2022-07-18 23:27:48
 */
/**
 * @description:深拷贝
 * @param {Object} object //当前拷贝对象属性
 * @param {Object} map // 判断当前属性是否存在映射，避免属性指向本身xx.xx = xx
 * @return {Object} //完成深拷贝的属性（对象）
 */
const deepClone = (object = {}, map = new Map()) => {
  if (typeof object !== "object") {
    return object;
  }
  if (map.get(object)) {
    return map.get(object);
  }
  let res = {};
  map.set(object, {});
  if (
    Array.isArray(object) ||
    Object.prototype.toString.call(object) === "[object Array]"
  ) {
    res = [];
  }
  for (let k in object) {
    if (object.hasOwnProperty(k)) {
      res[k] = deepClone(object[k], map);
    }
  }
  return res;
};

/**
 * @description: 测试
 * @return {*}
 */
let a = { name: 1, age: 22 };
let b = deepClone(a);
let c = a;
setTimeout(() => {
  a.age = 222;
  console.log(b, c);
});
