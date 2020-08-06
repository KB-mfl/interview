let createAjax = function(method,path,data=''){
  //promise
  return new Promise((resolve,reject)=>{
    //jq的请求方式
    $.ajxa({
      type:method,
      url:path,
      data:data,
      backType:'JSON',
      beforeSend:()=>{
        //do something
      },
      complete:()=>{
        //do something
      },
      success:messageg=>{
        //do something
        resolve(messageg)
      },
      error:e=>{
        reject(e)
      }
    })
  })
}
export default {createAjax}
//注意:以上方式封装时，在其他文件引入的时候，输出是{createAjax}对象
//如果以export f = () =>{}封装，则直接输出createAjax函数