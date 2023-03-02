const getUniqArray=(arr)=>{
  for (const el of arr) {
    if ( typeof el !='number'|| Number.isNaN(el)) {
      throw new Error(`В getUniqArray был передан невалидный параметр. Аргумент arr должен быть массивом чисел`);
    }
  }
  let set=new Set(arr);
  return Array.from(set);
}