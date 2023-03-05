class DefaultAuto {
  fuel=0; // объем дополнительного топливного бака;
  lowFuelConsumption=0; // коэффициент оптимизации расхода топлива
  durability=0; // коэффициент прочности автомобиля
  speed=0; // коэффициент увеличения скорости
  // name='Unknown Car'; // название марки автомобиля
  constructor(name='Unknown Car') {
    this.name=name;
  }
};

class SportAuto extends DefaultAuto {
  fuel=2;
  lowFuelConsumption=1;
  durability=1;
  speed=6;
  
}
class MilitaryAuto extends DefaultAuto {
  fuel=2;
  lowFuelConsumption=2;
  durability=4;
  speed=2;
  
}
class CivilAuto extends DefaultAuto {
  fuel=2;
  lowFuelConsumption=2;
  durability=2;
  speed=4;
}

let allOpponents=[];
let myAutoObj;
// myAutoObj

//Create User

let chooseAutoButton=document.querySelectorAll('.car');

function createAuto(e) {
 
  if (e.target.textContent=='Civil car') {
    myAutoObj=new CivilAuto();
  }
  if (e.target.textContent=='Military car') {
    myAutoObj=new MilitaryAuto();
  }
  if (e.target.textContent=='Sport car') {
    myAutoObj=new SportAuto();
  }
  console.log(myAutoObj);

  for (let index = 0; index < featuresValues.length; index++) {
  featuresValues[index].children[0].textContent=Object.values(myAutoObj)[index];
  }
  chooseAutoTitle.textContent=e.target.textContent;

}


for (let index = 0; index < chooseAutoButton.length; index++) {
  chooseAutoButton[index].addEventListener('click',createAuto)}


//Add some 2 features to my car

let chooseAutoTitle=document.querySelector('.chosen-car__title').children[0];

let featuresValues=document.querySelectorAll('.features__name');

const plusButtons=document.querySelectorAll('.plus');
const featureItem=document.querySelectorAll('.features__item');

for (let index = 0; index < plusButtons.length; index++) {
  plusButtons[index].addEventListener('click',function addOneFeature() {
    let sum=1;
    let num=+featuresValues[index].children[0].textContent;
    for (let index = 0; index < featuresValues.length; index++) {
      sum+=+featuresValues[index].children[0].textContent;
    }
    console.log(sum);
    if (sum<=12) {
      let map=Object.entries(myAutoObj);
      num+=1;
      featuresValues[index].children[0].textContent=String(num);
      map=map.map(([key,value],i)=>(i==index)?[key,value+=1]:[key,value]);
      myAutoObj=Object.fromEntries(map);
    } else {
      console.log(myAutoObj);
      const p=document.createElement('p');
      p.textContent='Превышен лимит распределяемых очков.';
      featureItem[index].appendChild(p);
      setTimeout(() => {
        p.remove();
      }, 1000);
    }
  }
  )}

//Compare block

  function printAutoComparison() {

  }


  function compareAutos(params) {
    
  }


  getTotalSpeed=(speed)=>{
    return 10 + speed * 0.05 * 10;
  }
  getTotalDurability=(durability)=>{
    return  100 + durability * 0.1 * 100;
  }
  getPowerReserve=(totalFuel,lowFuelConsumption)=>{
    return  totalFuel * 200 + totalFuel * 0.1 * 200 * lowFuelConsumption;
  }






const FEATURES={
  sport:new SportAuto(),
  military:new MilitaryAuto(),
  civil:new CivilAuto()
}
const TYPES=['sport','military','civil'];

//Utils

function getRandomNum(max) {
  return Math.floor(Math.random()*max); 
}
function getTwoRandomNum() {
  const arr=[0,1,2,3];
  const firstNum=arr.splice(Math.floor(Math.random()*arr.length),1);
  const SecondNum=arr.splice(Math.floor(Math.random()*arr.length),1);
  return [...firstNum,...SecondNum]; 
}





//reset game

let resetButton=document.getElementById('1');
resetButton.addEventListener('click',resetGame);

function resetGame() {
  for (let index = 0; index < featuresValues.length; index++) {
    featuresValues[index].children[0].textContent=0;
  }
  chooseAutoTitle.textContent='';
  opponents.innerHTML='';
}


//Opponents

let opponents=document.querySelector('.opponents');
let findOpponentsButton=document.getElementById('3');
findOpponentsButton.addEventListener('click',findOpponents);


function returnOpponent({fuel,
  lowFuelConsumption,
  durability,
  speed},i) {
  return `<div class="opponent-car opponent-car__features features">
  <ul class="features__list">
    <li>S
      <p class="features__name">Fuel:<span>${fuel}</span></p>
    </li>
    <li>
      <p class="features__name">Low fuel consumption:<span>${lowFuelConsumption}</span></p>
    </li>
    <li>
      <p class="features__name">Durability:<span>${durability}</span></p>
    </li>
    <li>
      <p class="features__name">Speed:<span>${speed}</span></p>
    </li>
    <li>
      <p class="features__name">name:<span>Car ${i}</span></p>
    </li>
  </ul>
</div>`
}

function findOpponents() {

for (let index = 0; index < 9; index++) {
  const randomNum=getRandomNum(3);
  const defaultAuto=FEATURES[TYPES[randomNum]];
  let map=Object.entries(defaultAuto);
  const mas= getTwoRandomNum();
  for (let i = 0; i < mas.length; i++) {
    map=map.map(([key,value],j)=>(j==mas[i])?[key,value+=1]:[key,value]);
  }
  const newAuto=Object.fromEntries(map);
  allOpponents.push(newAuto);
  opponents.innerHTML+=returnOpponent(newAuto,index);
}
  console.log(allOpponents);
  return allOpponents;
}







// const AUTOS={
//   'Civil car':'civil',
//   'Sport car':'sport',
//   'Military car':'military',
// }







// const sport1=new SportAuto();
// console.log(DefaultAuto.fuel);
// console.log();
