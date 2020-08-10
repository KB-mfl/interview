let debounce = (fn,delay = 500) =>{
  let timer;
  return function(...arg){
    if(!timer) clearInterval(timer)
    timer = setTimeout(()=>{
      fn.call(this,...arg)
    },delay)
  }
}

let zhu = ()=>{
  console.log('zhu')
}
while(1){
  console.log(2)
  setTimeout(()=>{
    console.log('我要执行')
    debounce(zhu,delay=1000)()
  },100)
}