Array.prototype.filterArray=function (cb,...thisArg) {
  const arr = this;
  const newArr = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (cb.call(...thisArg, arr[i], i, arr)) newArr.push(arr[i]);
    continue;
  }
  return newArr;
}