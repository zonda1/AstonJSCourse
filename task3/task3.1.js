const deleteElementFromArray=(arr,el)=>{
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]==el) {
      let newArr=[...arr];
      newArr.splice(i,1);
      return newArr;
    }
    continue;
  }
  return arr;
}