const addElementsToArray=(arr,...index)=> {
  if (index<0 || Number.isInteger(index)) {
    throw Error ('the index cannot be a negative number or a fractional number');
  }
  let newArr=[...arr];
  function inner(...elem) {
    if (index==false || index>arr.length) {
      return newArr.concat(elem);
    }
    newArr.splice(index,0,...elem);
    return newArr;
  }
  return inner;
}