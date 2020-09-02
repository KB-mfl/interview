let quickSort = (arr)=>{
  //每次递归都确定arr[0]的位置
  if(arr.length===1||arr.length===0) return arr
  let base = arr[0];
  let left = 0;
  //空出arr[left]的位置
  let right = arr.length-1
  while(left!==right){//左指针和右指针不同
    while(left<right&&arr[right]>=base){
      right--
    }
    arr[left] = arr[right]//比base小的往左放，此时arr[right]放入arr[left],arr[right]空出来
    while(left<right&&arr[left]<base){
      left++
    }
    arr[right] = arr[left]//比base大的往左放，此时arr[left]放入arr[right],arr[left]空出来
  }
  arr[left] = base;//目标值坐下
  let leftArr = arr.splice(0,left+1)
  return quickSort(leftArr).concat(quickSort(arr))
}

let arr = [5,1,12,6,5,44,0,2109,131,1312314];
console.log(quickSort(arr))