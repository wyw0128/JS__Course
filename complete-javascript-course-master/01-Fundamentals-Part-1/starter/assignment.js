/*
// TOPIC: Values and Variables
let country = 'China';
let continent = 'Asia';
let population = 1400000000;

console.log(country);
console.log(continent);
console.log(population);

// TOPIC: Data Types
let isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// TOPIC: Let Const and Var
language = 'China';
console.log(language);
// const country = 'China';
// const continent = 'Asia';
// const isIsland = false;
// country = 'Australia';

// TOPIC: Basic Operators
console.log(population / 2);
console.log(population + 1); // population++;
let finlandPopulation = 6000000;
console.log(finlandPopulation > population);
let averagePopulation = 33000000;
console.log(population > averagePopulation);
// It's like hard code, not good enough.
// const description = 'China is in Asia, and its 1.4 billion people speak Chinese.';
const description = country + ' is in ' + continent + ', and its ' + population + ' people speak ' + language;
console.log(description);

// TOPIC: Strings and Template Literal
console.log(`${country} is in ${continent}, and its ${population} people speak ${language}`);

// TOPIC: Taking decisions: if/else statements
if (population > averagePopulation) {
  console.log(`${country}'s population is above average.`);
} else {
  console.log(`${country}'s population is ${averagePopulation - population} below average`);
}

// TOPIC: Type Conversion and Type Coercion
console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2);

// TOPIC: EQUALITY OPERATORS

// const numNeighbor = prompt('How many neighbor countries does your country have?');

// NOTE: This helps us prevent bugs.

// const numNeighbor = Number(prompt('How many neighbor countries does your country have?'));


// if (numNeighbor === 1) {
//   console.log('Only 1 border!');
// } else if (numNeighbor > 1) {
//   console.log('More than 1 border')
// } else {
//   console.log('No borders');
// }

// TOPIC: LOGICAL OPERATORS

if (language === 'English' && population < 500000000 && !isIsland) {
  console.log(`You should live in ${country}.`);
} else {
  console.log(`${country} does not meet your criteria.`);
}

// TOPIC: THE SWITCH STATEMENT

// const language = 'mandarin'

// switch (language) {
//   case 'chinese':
//   case 'mandarin':
//     console.log('MOST number of native speakers!');
//     break
//   case 'spanish':
//     console.log('2nd place in number of native speakers!');
//     break
//   case 'english':
//     console.log('3rd place');
//     break
//   case 'hindi':
//     console.log('Number 4');
//     break
//   case 'arabic':
//     console.log('5th most spoken language');
//     break
//   default:
//     console.log('Great language too :D');
// }


// TOPIC: THE CONDITIONAL OPERATOR

console.log(`${country}'s population is ${population > averagePopulation ? 'above' : 'below'} average.`);
*/

