
let shellSort = (arr) =>{
  for(let gap = Math.floor(arr.length/2);gap>0;gap = Math.floor(gap/2)){//定义增量规则，通过增量切割成多个数组，当gap=1时，说明数组不需要被切割
    //插入排序
    for(let i = gap;i<arr.length;i++){
      let insertValue = arr[i];
      let pre =i-gap;
      while(pre>=00&&arr[pre]>insertValue){
        arr[pre+gap] = arr[pre];
        pre = pre-gap;
      }
      arr[pre+gap] = insertValue
    }
  }
  return arr
}
let arr = [5,1,12,6,5,44,0,2109,131,1312314];
console.log(shellSort(arr))