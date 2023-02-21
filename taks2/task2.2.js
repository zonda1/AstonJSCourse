const checkValidRange=(value)=> {
  if ( typeof value !='number') {
    throw new Error(`В функцию getInterval были переданы невалидные параметры. Параметр ${value} должен содержать только числовые значения`);
  }
}

const checkValidArr=(arr)=> {
  for (const iterator of arr) {
    if ( typeof iterator !='number') {
      throw new Error(`В функцию getInterval были переданы невалидные параметры. Параметр ${arr} должен содержать только числовые значения`);
    }
  }
}

const getInterval=(arr,from,to)=> {
let newArr=[];
checkValidArr(arr);
checkValidRange(from);
checkValidRange(to);
if (from<to) {
  newArr=arr.filter(el=>el>=from && el<=to);
} else if (from>to) {
  newArr=arr.filter(el=>el>=to && el<=from);
} else {
  return null;
}
return newArr;
}