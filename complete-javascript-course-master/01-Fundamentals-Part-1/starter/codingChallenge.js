/*

// TOPIC: Challenge 1

let markHeight;
let markMass;
let johnHeight;
let johnMass;

markHeight = 1.69;
markMass = 78;
johnHeight = 1.95;
johnMass = 92;

markHeight = 1.88;
markMass = 95;
johnHeight = 1.76;
johnMass = 85;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;

console.log(markBMI); // console.log(markBMI, johnBMI);
console.log(johnBMI);

const markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);


// NOTE: Jonas's code for code challenge 1:

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);


// TOPIC: Challenge 2

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

// console.log(BMIMark, BMIJohn, markHigherBMI);

if (markHigherBMI) {
  console.log("Mark's BMI is higher than John's!");
} else {
  console.log("John's BMI is higher than Mark's!");
}

if (markHigherBMI) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}

// NOTE: Jonas's code for code challenge 2:

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

// NOTE: It is always more common to write the condition directly inside the if parenthesis.

if (BMIMark > BMIJohn) {
  console.log("Mark's BMI is higher than John's!");
} else {
  console.log("John's BMI is higher than Mark's!");
}

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}


// TOPIC: Challenge 3

const averageDolphins = (96 + 108 + 89) / 3;
const averageKoalas = (88 + 91 + 110) / 3;

console.log(averageDolphins, averageKoalas);

if (averageDolphins > averageKoalas) {
  console.log('Dolphins');
} else if (averageDolphins < averageKoalas) {
  console.log('Koalas');
}

// BONUS 1

const averageDolphins = (97 + 112 + 101) / 3;
const averageKoalas = (109 + 95 + 106) / 3;

console.log(averageDolphins, averageKoalas);

const isDolphinsMinOver100 = 97 >= 100 || 89 >= 100 || 89 >= 100;
const isKoalasMinOver100 = 109 >= 100 || 95 >= 100 || 106 >= 100;

console.log(isDolphinsMinOver100, isKoalasMinOver100);

// BONUS 2

if (averageDolphins > averageKoalas && isDolphinsMinOver100) {
  console.log('Dolphins');
} else if (averageDolphins < averageKoalas && isKoalasMinOver100) {
  console.log('Koalas');
} else if (averageDolphins === averageKoalas && isDolphinsMinOver100 && isKoalasMinOver100) {
  console.log('Dolphins & Koalas');
}


// NOTE: Jonas's code for code challenge 3:

// const averageDolphins = (96 + 108 + 89) / 3;
// const averageKoalas = (88 + 91 + 110) / 3;
// console.log(averageDolphins, averageKoalas);

// if (averageDolphins > averageKoalas) {
//   console.log('Dolphins win the trophy');
// } else if (averageKoalas > averageDolphins) {
//   console.log('Koalas win trophy');
// } else if (averageDolphins === averageKoalas) {
//   console.log('Both win the trophy');
// }

// Bonus 1

const averageDolphins = (97 + 112 + 80) / 3;
const averageKoalas = (109 + 95 + 50) / 3;

console.log(averageDolphins, averageKoalas);

if (averageDolphins > averageKoalas && averageDolphins >= 100) {
  console.log('Dolphins win the trophy 🏆');
} else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
  console.log('Koalas win trophy 🏆');
} else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100) {
  console.log('Both win the trophy 🏆');
} else {
  console.log('No one wins the trophy 😭')
}

// TOPIC: Challenge 4

const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);
*/
















