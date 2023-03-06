const FEATURES={
  sport:(name)=>new SportAuto(name),
  military:(name)=>new MilitaryAuto(name),
  civil:(name)=>new CivilAuto(name)
}
const TYPES=['sport','military','civil'];
const DEFAULT_FUEL=5;
const OPPONENTS_NUMBER=9;

let allOpponents=[];
let myAutoObj;
class DefaultAuto {
  fuel=0; 
  lowFuelConsumption=0; 
  durability=0; 
  speed=0;
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

//Create User

let chooseAutoButton=document.querySelectorAll('.car');

function createAuto(e) {
  if (e.target.textContent=='Civil car') {
    myAutoObj=FEATURES.civil('My car');
  }
  if (e.target.textContent=='Military car') {
    myAutoObj=FEATURES.military('My car');
  }
  if (e.target.textContent=='Sport car') {
    myAutoObj=FEATURES.sport('My car');
  }
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
  plusButtons[index].addEventListener('click',()=>{
    return addOneFeature(index);
  }
)}

function addOneFeature(j) {
  let sum=1;
  let num=+featuresValues[j].children[0].textContent;
  for (let index = 0; index < featuresValues.length; index++) {
    sum+=+featuresValues[index].children[0].textContent;
  }
  if (sum<=12) {
    let map=Object.entries(myAutoObj);
    num+=1;
    featuresValues[j].children[0].textContent=String(num);
    map=map.map(([key,value],i)=>(i==j)?[key,value+=1]:[key,value]);
    myAutoObj=Object.fromEntries(map);
  } else {
    const p=document.createElement('p');
    p.textContent='Превышен лимит распределяемых очков.';
    p.classList.add('warning');
    featureItem[j].appendChild(p);
    setTimeout(() => {
      p.remove();
    }, 1000);
  }
}

//Compare block

const compareButton=document.getElementById('2');
compareButton.addEventListener('click',()=>{
  const maxFeatures=getMaxFeatures(getTotalFeatures);
  const cars=compareAutos(getTotalFeatures,maxFeatures);
  printFeatures(cars);
});
  
function printFeatures(cars) {
  const compareTable = document.querySelector('#compareTable tbody');
  let htmlStr = ``;
  for (const { name, powerReserve, durability, speed } of cars) {
    htmlStr += `
      <tr>
        <td>${name}</td>
        <td>${powerReserve}</td>
        <td>${durability}</td>
        <td>${speed}</td>
      </tr>
    `;
  }
  compareTable.insertAdjacentHTML('afterbegin', htmlStr);
}

function compareAutos(func1,obj2) {
  const arr1=func1();
  const rel=arr1.map(({totalPowerReserve,totalDurability,totalSpeed,name})=>{
  return {    
  powerReserve:`${Math.round(totalPowerReserve/obj2.maxtotalPowerReserve*100)}%`,
  durability:`${Math.round(totalDurability/obj2.maxTotalDurability*100)}%`,
  speed:`${Math.round(totalSpeed/obj2.maxTotalSpeed*100)}%`,
  name
  }})
  return rel;
}

function getTotalFeatures() {
  const allAutos=[myAutoObj,...allOpponents];
  const totalFeatures=allAutos.map(({fuel,lowFuelConsumption,durability,speed,name})=>{
    return {
      totalPowerReserve:getTotalPowerReserve(fuel,lowFuelConsumption),
      totalDurability:getTotalDurability(durability),
      totalSpeed:getTotalSpeed(speed),
      name,
    }})
  return totalFeatures;
}

//Utils

function getMaxFeatures(func) {
  const newArr=func();
  const maxtotalPowerReserve=Math.max(...newArr.map((el)=>el.totalPowerReserve));
  const maxTotalDurability=Math.max(...newArr.map((el)=>el.totalDurability));
  const maxTotalSpeed=Math.max(...newArr.map((el)=>el.totalSpeed));

  return {
    maxtotalPowerReserve,
    maxTotalDurability,
    maxTotalSpeed
  };
}

getTotalSpeed=(speed)=>{
  const totalSpeed=10 + speed * 0.05 * 10;
  return totalSpeed;
}
getTotalDurability=(durability)=>{
  const totalDurability=100 + durability * 0.1 * 100;
  return totalDurability;
}
getTotalPowerReserve=(fuel,lowFuelConsumption)=>{
  const totalFuel=DEFAULT_FUEL+fuel;
  const totalPowerReserve=totalFuel * 200 + totalFuel * 0.1 * 200 * lowFuelConsumption;
  return totalPowerReserve;
}

function getRandomNum(max) {
  return Math.floor(Math.random()*max); 
}
function getTwoRandomNum() {
  const arr=[0,1,2,3];
  const firstNum=arr.splice(Math.floor(Math.random()*arr.length),1);
  const SecondNum=arr.splice(Math.floor(Math.random()*arr.length),1);
  return [...firstNum,...SecondNum]; 
}

//Reset game

let resetButton=document.getElementById('1');
resetButton.addEventListener('click',resetGame);

function resetGame() {
  const tableBody=document.querySelector('tbody');
  for (let index = 0; index < featuresValues.length; index++) {
    featuresValues[index].children[0].textContent=0;
  }
  chooseAutoTitle.textContent='';
  opponents.innerHTML='';

  if (tableBody.children) {
    tableBody.replaceChildren();
  }
}

//Opponents

let opponents=document.querySelector('.opponents');
let findOpponentsButton=document.getElementById('3');
findOpponentsButton.addEventListener('click',findOpponents);

function returnOpponent({
  fuel,
  lowFuelConsumption,
  durability,
  speed,
  name}) {
  return `
  <div class="opponent-car opponent-car__features features">
    <ul class="features__list">
      <li>
        <p class="features__name">Fuel:<span>${fuel}</span></p>
      </li>
      <li>
        <p class="features__name">LFC:<span>${lowFuelConsumption}</span></p>
      </li>
      <li>
        <p class="features__name">Durability:<span>${durability}</span></p>
      </li>
      <li>
        <p class="features__name">Speed:<span>${speed}</span></p>
      </li>
      <li>
        <p class="features__name">Name:<span>${name}</span></p>
      </li>
    </ul>
  </div>`
  }

function findOpponents() {
  for (let index = 0; index < OPPONENTS_NUMBER; index++) {
    const randomNum=getRandomNum(3);
    const defaultAuto=FEATURES[TYPES[randomNum]](`Enemy car ${index+1}`);
    let map=Object.entries(defaultAuto);
    const mas= getTwoRandomNum();
    for (let i = 0; i < mas.length; i++) {
      map=map.map(([key,value],j)=>(j==mas[i])?[key,value+=1]:[key,value]);
    }
    const newAuto=Object.fromEntries(map);
    allOpponents.push(newAuto);
    opponents.innerHTML+=returnOpponent(newAuto);
  }
  return allOpponents;
}