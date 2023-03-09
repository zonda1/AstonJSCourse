const addElementsToArray = (arr, index) => (...args) => {
  let _index = index ?? arr.length;
  if (
      !Number.isInteger(_index)
      || _index < 0
  ) throw new Error('the index cannot be a negative number or a fractional number');
  return [
      ...arr.slice(0, _index),
      ...args,
      ...arr.slice(_index),
  ];
};