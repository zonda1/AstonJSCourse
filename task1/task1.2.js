function getNumberRadix(number,radix) {
  number=+number;
  if (number>0 && Number.isInteger(number) && !Number.isNaN(number) && (typeof radix==='number') && radix>=2 && radix<=16) {
    return number.toString(radix);
  }
  throw new Error("Функция getNumberRadix была вызвана с некорректными параметрами");
}