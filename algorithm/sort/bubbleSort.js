let bubbleSort = (arr)=>{
  for(let i = 0;i<arr.length;i++){//第一次遍历会选出最大值放在最右边，以此类推，也就是每一次循环都会确定最大值的位置
    for(let j = 0;j<arr.length-1-i;j++){//i表示目前已经排好的元素个数
      if(arr[j]>arr[j+1]){
        let middle = arr[j+1];
        arr[j+1] = arr[j]
        arr[j] = middle;
      }
    }
  }
  return arr
}

let arr = [5,1,12,6,5,44,0,2109,131,1312314];
console.log(bubbleSort(arr))