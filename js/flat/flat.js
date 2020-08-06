let arr = [1,2,3,[1,2,3,{name:'zhiu'}]]
//1.es6
let esFlat = (arr)=>{
  return arr.flat(Infinity)
}

//stack
let stackFlat = (arr)=>{
  let stack = [];
  for(let i=0;i<arr.length;i++){
    if(typeof arr[i] === 'object' && arr[i]!==null){
      if(Array.isArray(arr[i])){
        stack = stack.concat(stackFlat(arr[i]))
      }else{
        stack.push(arr[i]);
      }
    }else{
      stack.push(arr[i])
    }
  }
  return stack
}

//reduce 
let reduceFlat = (arr,deep = 1) =>{
  return deep>0?arr.reduce((acc,currentValue)=>acc.concat(Array.isArray(currentValue)?reduceFlat(currentValue,deep-1):currentValue),[])
  :arr.slice()
}


console.log(reduceFlat(arr,1))

