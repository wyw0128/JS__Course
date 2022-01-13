// DATE: 09/01/2022
'use strict';
/*
// TOPIC: FUNCTIONS

// NOTE: console.log actually does not produce any value, it is a statement. We want function to produce value, so we cannot use console.log in the function body.

function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} people and its capital city is ${capitalCity}`;
}

const describeCountry1 = describeCountry('China', 1400000000, 'Beijing');
const describeCountry2 = describeCountry('Australia', 25000000, 'Canberra');
const describeCountry3 = describeCountry('The UK', 68000000, 'London');

console.log(describeCountry1, describeCountry2, describeCountry3);


// TOPIC: ARROW FUNCTIONS

// Function declaration

// function percentageOfWorld1(population) {
//   const percentage = (population / 7900) * 100;
//   return `${percentage}%`;
// }

// const chinaPercentageOfWorld = percentageOfWorld1(1441);
// const australiaPercentageOfWorld = percentageOfWorld1(25);
// const theUKPercentageOfWorld = percentageOfWorld1(68);

// console.log(chinaPercentageOfWorld, australiaPercentageOfWorld, theUKPercentageOfWorld);

// Function expression

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
}

const chinaPercentageOfWorld = percentageOfWorld2(1441);
const australiaPercentageOfWorld = percentageOfWorld2(25);
const theUKPercentageOfWorld = percentageOfWorld2(68);

console.log(chinaPercentageOfWorld, australiaPercentageOfWorld, theUKPercentageOfWorld);

// TOPIC: ARROW FUNCTIONS

const percentageOfWorld3 = population => (population / 7900) * 100;

const chinaPercentage = percentageOfWorld3(1441);
const australiaPercentage = percentageOfWorld3(25);
const theUKPercentage = percentageOfWorld3(68);

console.log(chinaPercentage, australiaPercentage, theUKPercentage);

// TOPIC: FUNCTIONS CALLING OTHER FUNCTIONS

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}


const describePopulation = function (country, population) {
  return `${country} has ${population} people, which is about ${percentageOfWorld1(population)} of the world.`
}

console.log(describePopulation('China', 1441));
console.log(describePopulation('Australia', 25));
console.log(describePopulation('TheUK', 68));

// DATE: 10/01/2022

// TOPIC: INTRODUCTION TO ARRAYS

const population1 = 1441;
const population2 = 25;
const population3 = 68;
const population4 = 52;
const populations = [population1, population2, population3, population4];

console.log(populations.length === 4);

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])];

function percentageOfWorld1(population) {
  const percentage = (population / 7900) * 100;
  return `${percentage}%`;
}

console.log(percentages);

// TOPIC: BASIC ARRAY OPERATIONS (METHODS)

const neighbors = ['Russia', 'India', 'Indonesia'];

neighbors.push('Utopia');
console.log(neighbors);

neighbors.pop();
console.log(neighbors);

if (!neighbors.includes('Germany')) {
  console.log(`Probably not a central European country :D`);
}

neighbors[neighbors.indexOf('India')] = 'Thailand';
console.log(neighbors);

// TOPIC: INTRODUCTION TO OBJECTS

const myCountry = {
  country: 'China',
  capital: 'Beijing',
  language: 'Chinese',
  population: 1441,
  neighbors: ['Russia', 'India', 'Indonesia']
};

console.log(myCountry);

// DATE: 11/01/2022

// TOPIC: DOT VS. BRACKET NOTATION

const myCountry = {
  country: 'China',
  capital: 'Beijing',
  language: 'Chinese',
  population: 1441,
  neighbors: ['Russia', 'India', 'Indonesia']
};

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries and a capital called ${myCountry.capital}.`);

myCountry.population = myCountry.population + 2;
// myCountry.population += 2;
console.log(myCountry.population);

myCountry['population'] = myCountry['population'] - 2;
// myCountry['population'] -= 2;
console.log(myCountry.population);

// TOPIC: OBJECT METHODS

const myCountry = {
  country: 'China',
  capital: 'Beijing',
  language: 'Chinese',
  population: 1441,
  neighbors: ['Russia', 'India', 'Indonesia'],

  describe: function () {
    console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} neighboring countries and a capital called ${this.capital}.`);
  },

  checkIsland: function () {
    this.isIsland = this.neighbors = 0 ? true : false;
    return this.isIsland;
  }
};

myCountry.describe();
myCountry.checkIsland();
console.log(myCountry.isIsland);

// TOPIC: ITERATION: THE FOR LOOP

for (let voter = 1; voter <= 50; voter++) {
  console.log(`Voter number ${voter} is currently voting.`);
}

// TOPIC: LOOPING ARRAYS, BREAKING AND CONTINUING

const populations = [1441, 25, 68, 52];

// NOTE: Percentage2 should be declared outside the for loop bracket because the variables inside the bracket cannot be accessed outside.

const percentage2 = [];

// NOTE: Break DRY rule because the formula of percentageOfWorld1 has been written before.

// for (let a = 0; a < populations.length; a++) {
//   percentage2.push((populations[a] / 7900) * 100); // break DRY
// }
// console.log(percentage2);

for (let a = 0; a < populations.length; a++) {
  percentage2.push(percentageOfWorld1(populations[a]));
}
console.log(percentage2);

// Previous coding:

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const chinaPercentageOfWorld = percentageOfWorld1(1441);
const australiaPercentageOfWorld = percentageOfWorld1(25);
const theUKPercentageOfWorld = percentageOfWorld1(68);
const theKoreaPercentageOfWorld = percentageOfWorld1(52);

console.log(chinaPercentageOfWorld, australiaPercentageOfWorld, theUKPercentageOfWorld, theKoreaPercentageOfWorld);

// TOPIC: LOOPING BACKWARDS AND LOOPS IN LOOPS

const listOfNeighbors = [
  ['Canada', 'Mexico'],
  ['Spain'],
  ['Norway', 'Sweden', 'Russia']
];

for (let i = 0; i < listOfNeighbors.length; i++) {
  for (let a = 0; a < listOfNeighbors[i].length; a++) {
    console.log(`Neighbor: ${listOfNeighbors[i][a]}`);
  }
}

// TOPIC: THE WHILE LOOP

const populations = [1441, 25, 68, 52];
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

let i = 0;
const percentages3 = [];
while (i < populations.length) {
  percentages3.push(percentageOfWorld1(populations[i]));
  i++;
}
console.log(percentages3);
*/












