# js 

## 关于call,apply,bind的实现
> [call](./context/call.js)
> [apply](./context/apply.js)
> [bind](./context/bind.js)

## [关于数组扁平化处理](./flat/flat.js)

## [关于promise的实现](./promise/promise.js)
> 手写实现promise(Promise/A+规范)
### promise 相关方法
#### [all](./promise/promiseAll.js)
> promise.all 可以解决等待所以异步操作全部的执行结束之后统一拿到结果，实现异步并发，同步处理结果
> >思路
> > >1.返回一个promsie return new promise((resolve,reject)=>{...})
> > >2.接收的是一个数组，遍历每一个数组，如果不是promise直接赋值给arr[],如果是x.then的data赋值
> > >3.写一个判断是否是promise的函数isPromise，以及处理数据函数processData(key,valuy);当数据处理全部完成之后会有resolve(arr),否则reject()
#### [finally](./promise/promiseFinally.js)
> promise.prototype.finally(cb) 无论promise的成功失败与否，都执行cb
> >思路
> > >1.直接return p.then(onfilfulled,onrejected)
> > >2.在onfilfulled需要return data;在onrejected需要throw err

## 请求方式
### [ajax](./request/ajax.js)
> 注意:以上方式封装时，在其他文件引入的时候，输出是`{createAjax}`对象;
> 如果以`export f = () =>{}`封装，则直接输出createAjax函数
### [axios](./request/axios.js)