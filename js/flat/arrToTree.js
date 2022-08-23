/*
 * @Author: zhuziqiang z2206071258@163.com
 * @Date: 2022-08-22 16:59:36
 * @LastEditors: zhuziqiang z2206071258@163.com
 * @LastEditTime: 2022-08-23 20:44:10
 */
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 4, name: "部门4", pid: 3 },
];

const toTree = (list = []) => {
  // object Arr 是引用类型,每个item都是指向具体值的指针
  const map = list.reduce((pre, next) => ({ ...pre, [next.id]: next }), {});
  const routes = list.filter((item) => {
    console.log("item", item);
    const parent = map[item.pid];
    if (parent) {
      if (parent.children) {
        // 更改指针指向
        parent.children.push(item);
      } else {
        parent.children = [item];
      }
    } else {
      console.log(item);
      return item;
    }
    return false;
  });
  return routes;
};

function arrayToTree(items) {
  const result = []; // 存放结果集
  const itemMap = {}; //
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    itemMap[id] = {
      ...item,
      children: itemMap[id] ? itemMap[id]["children"] : [],
    };
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
console.log(arrayToTree(arr));
