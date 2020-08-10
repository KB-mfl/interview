# js 

## 关于call,apply,bind的实现
> [call](./context/call.js)
> [apply](./context/apply.js)
> [bind](./context/bind.js)

## [关于数组扁平化处理](./flat/flat.js)

## 防抖节流
### [防抖](../html/debounce.html)
>防抖，防暴击，上一次点击和本次点击时间间隔小于delay，只需要执行最后一次(定时器)
### [节流](../html/throttle.html)
>节流 ,多次点击，单位时间delay之间(或大于)内只执行一次，最后一次点击必定执行(定时器+时间戳time,now)
## string的相关方法
### slice
> >`stringObject.prototype.slice(start,end)`
> >`arrayObject.prototype.slice(start,end`
> >切割一个数组(字符串也可以看为数组的一种形式)，返回一个子数组(子字符(串))，左闭右开，当为负数时，子元素的索引从右往左算;
> >start必选参数，end为可选参数，如果没有指定end参数，那么切分的数组包含从 start 到数组结束的所有元素
> >start大于end,返回空数组或者空字符

### substring
> >`stringObject.prototype.substring (start,end)`
> >返回一个新的字符（串），不接受负数,start大于end时，会交换两个参数

### substr
> >`stringObject.prototype.substr(start,length)`
> >该方法不建议使用
> >返回一个新的字符(串) 

### splice
> >`arrayObject.prototype.splice(index,howmany,item1,item2...)`
> >返回切割元素的数组，index,howmany，必选，默认为0
> >...item可选，切割位置的代替元素
> > 会改变原始数组

### split
> >`stringObject.prototype.split(separator,howmany)`
> >返回切割的数组
> >separator字符串或正则表达式,表示字符该从什么地方开始切割
> >howmany返回的数组最大长度
> >Array.prototype.join()执行操作是相反的,arr=>str
### join
> >`arrayObject.protitype.join(separator)` 
> >可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。

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