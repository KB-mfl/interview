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