// //工厂模式
// function createPersonFactory(name,age,job){
//   let obj = new Object();
//   obj.name = name;
//   obj.age = age;
//   obj.job = job;
//   obj.sayName = ()=>{
//     //do something
//   }
// }
// //构造函数模式
// function createPersonCon(name ,age, job){
//   this.age = age
//   this.age = name;
//   this.job = job;
//   this.sayName = ()=>{
//     //do something
//   }
// }
// //原型模式
// function createPersonProto(name ,age, job){
//   createPersonProto.prototype.name = name;
//   createPersonProto.prototype.age = age;
//   createPersonProto.prototype.job = job;
//   createPersonProto.prototype.sayName = ()=>{
//     //do something
//   }
// }
// //组合模式

// function Person(name,age,job){
//   this.name = name;
//   this.age = age;
//   this.job = job;
// }
// Person.prototype = {
//   constructor:Person,
//   sayName:()=>{
//     //do something
//   }
// }

// class Person{
//   constructor(name,age){
//     this.name = name
//     this.age = age
//   }
// }
let Person = function(age,name){
    this.name = name
    this.age = age
    Person.prototype.sayName = function(age){
      console.log(age)
    }
}

let zhu  = new Person('ZHUZIQINH',22)
console.log(Person.prototype)


let fn = (arg)=>{
  console.log(arg)
}

let arg1 = undefined;
let arg2 = "zhuz"
fn(arg1||arg2)