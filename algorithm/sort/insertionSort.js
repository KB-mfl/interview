let insertionSort = (arr)=>{
  for(let i =1;i<arr.length;i++){
    let pre = i-1;
    let cur = i;
    let insertValue = arr[cur]
    while(pre>=0 && arr[pre]>insertValue){//和待插入值比较
      arr[pre+1] = arr[pre]//元素都朝右移动一个单位
      pre--;
    }
    arr[pre+1] = insertValue
  }
  return arr;
}

let arr = [5,1,12,6,5,44,0,2109,131,1312314];
console.log(insertionSort(arr))
