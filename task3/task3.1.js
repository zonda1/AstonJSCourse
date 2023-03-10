const deleteElementFromArray=(arr,el)=>{
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]==el) {
      return [...arr.slice(0,i),
      ...arr.slice(i+1)]
    }
  }
  return arr;
}