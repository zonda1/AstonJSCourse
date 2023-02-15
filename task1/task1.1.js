function sum(a,b) {
  a=parseFloat(a);
  b=parseFloat(b);
  if (isNaN(a) || isNaN(b)) {
    return false;
  }
  return Math.round((a+b)*10e2)/10e2;
}
