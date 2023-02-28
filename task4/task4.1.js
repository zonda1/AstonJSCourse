Array.prototype.filterArray=function (cb,...thisArg) {
  let newArr=[];
  if (thisArg.length) {
    for (const iterator of this) {
      if (cb.call(...thisArg,iterator)) newArr.push(iterator);
      continue;
    }
  }
  for (const iterator of this) {
    if (cb(iterator)) newArr.push(iterator);
    continue;
  }
  return newArr;
}