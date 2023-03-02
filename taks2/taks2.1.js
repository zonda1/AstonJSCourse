const deepCopyObject=(obj)=>{
  if (
    obj === null
    || typeof obj !== 'object'
    || typeof obj === 'function'
  ) return obj;

  let clone={};
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      if (Array.isArray(obj[key])) {
        let mas=[];
        let arr=obj[key];
        arr.forEach((item, index) => {
          mas[index] = deepCopyObject(item);
        });
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