const Company=function(name,salary) {
  this.income=function(value) {
    Company.store.staffList.map(el=>{el.name==name?el.income=value-salary:el})
    Company.store.money+=value-salary;
  }
  this.spend=function(value) {
    Company.store.staffList.map(el=>{el.name==name?el.income-=value:el})
    Company.store.money-=value;
  }
  Company.addStaff({name,salary});
}

Company.store={
  staffList: [],
  countStaff: 0,
  money: 0, 
}

Company.addStaff=function({name,income=0}) {
  this.store.staffList.push({name,income});
  this.store.countStaff+=1;
}

Company.getLeaders=function() {
  const maxIncome=Math.max(...this.store.staffList.map(el=>el.income));
  return this.store.staffList.filter(el=>el.income==maxIncome);
}