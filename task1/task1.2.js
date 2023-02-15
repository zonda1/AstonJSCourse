function getNumberRadix(number,radix) {
  number=parseInt(number);
  if (number>0 && !isNaN(number) && (typeof radix==='number') && radix>=2 && radix<=16) {
    return number.toString(radix);
  }
  throw Error("Функция getNumberRadix была вызвана с некорректными параметрами");
}