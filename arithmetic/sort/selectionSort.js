let selectionSort = (arr)=>{
  for(let i =0;i<arr.length;i++){
    let minIndex = i;
    for(let j =i+1;j<arr.length-1;j++){
      if(arr[j]<arr[minIndex]){
        minIndex = j
      }
    }
    let tmp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = tmp
  }
  return arr
}
let arr = [5,1,12,6,5,44,0,2109,131,1312314];
console.log(selectionSort(arr))