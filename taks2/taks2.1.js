const deepCopyObject=(obj)=>{
  let clone={};
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      if (Array.isArray(obj[key])) {
        let mas=[];
        let arr=obj[key];
        for (let index = 0; index < arr.length; index++) {
          if (+arr[index]) {
            mas[index]=arr[index];
            continue;
          }
          mas.push(deepCopyObject(arr[index]));
        }
        clone[key]=mas;
        continue;
      }
      clone[key]=deepCopyObject(obj[key]);
      continue;
    } 
    clone[key]=obj[key];
  }
  return clone;
}