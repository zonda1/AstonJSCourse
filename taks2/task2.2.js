const getMessageForIsNotNumberArray = (paramName) => `В функцию getInterval были переданы невалидные параметры. Параметр ${paramName} должен содержать только числовые значения`;

const getMessageForIsNotNumber = (paramName) => `В функцию getInterval были переданы невалидные параметры. Параметр ${paramName} должен быть числом`;

const isNumber=(value)=>( typeof value =='number' && !Number.isNaN(value));
   
const isNumberArray = (numberArr) => Array.isArray(numberArr) && 
!(numberArr.some((item) => !isNumber(item)));

const errorHandling = (arr, from, to) => {
  if (!isNumberArray(arr)) throw new Error(getMessageForIsNotNumberArray('arr'));
  if (!isNumber(from)) throw new Error(getMessageForIsNotNumber('from'));
  if (!isNumber(to)) throw new Error(getMessageForIsNotNumber('to'));
};

const getInterval=(arr,from,to)=> {
  errorHandling(arr,from,to);
  const _from = from <= to ? from : to;
  const _to = to >= from ? to : from;
  return arr.filter((item) => item >= _from && item <= _to);
}