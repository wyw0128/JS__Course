// DATE: 09/01/2022

"use strict";
/*

// TOPIC: ACTIVATING STRICT MODE

// NOTE: Strict mode makes it easier for developers to avoid accidental errors.

'use strict';

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; // Uncaught ReferenceError: hasDriverLicense is not defined at script.js:10:32
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio'; // Uncaught SyntaxError: Unexpected strict mode reserved word
// const private = 534;

// !!
// TOPIC: FUNCTIONS

// NOTE: DRY: Don't repeat yourself.

// NOTE: This function only prints a message to the developer console, but it doesn't return a value.

function logger() {
  console.log('My name is Jonas');
}

// calling / running / invoking the function

// NOTE: Once you call the function, it will execute the code in the function body line by line.

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// NOTE: Not all functions need to return something, and not all functions need to accept parameters like the fruit processor.

const num = Number('342');

// TOPIC: FUNCTION DECLARATIONS VS. EXPRESSIONS

// NOTE: Function declaration

// NOTE: Declaration does not produce values

// NOTE: We can call the function declaration before it's declared because of hoisting.

const age1 = calAge1(1991);
function calAge1(birthYear) {
  return 2037 - birthYear;
}

console.log(age1);

// NOTE: Function expression

// Function is a value, so it can be put into variable.

// NOTE: We cannot call the function expression eg. (calAge2) before calAge2 is declared

const calAge2 = function (birthYear) {
  return 2037 - birthYear;
}
const age2 = calAge2(1991);

// NOTE: Jonas thinks function expression is better because because this then forces him into a nice structure where I have to define all the functions first at the top of the code and only then I can call them. He also likes everything stored in variables, both values and functions.

// TOPIC: ARROW FUNCTIONS

const calAge3 = birthYear => 2037 - birthYear;
const age3 = calAge3(1991);
console.log(age3);


// NOTE: Return can be omitted if there is only one liner function, but if there is more than one function code, then return is still needed.

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));

// NOTE: There is a fundamental difference between arrow function and traditional function which is arrow function does not include this keyword.

// TOPIC: FUNCTIONS CALLING OTHER FUNCTIONS

function cutFruitPieces(fruit) {
  return fruit * 3;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
  return juice;
}

console.log(fruitProcessor(2, 3));

// TOPIC: REVIEWING FUNCTIONS

// NOTE: Although the name of the variable birthYear is the same in two different functions, but it is ok because this parameter is like a local variable to each function.

const calAge = function (birthYear) {
  return 2037 - birthYear;
}


const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));

// NOTE: A function declaration includes: FUNCTION NAME, PARAMETERS (placeholders to receive INPUT values. Like local variables of a function), FUNCTION BODY (block of code that we want to reuse. Processes the function's input data), RETURN (statement to OUTPUT a value from the function and terminate execution. the return statement also immediately terminates the function's execution), CALLING / RUNNING / INVOKING the function (using()), ARGUMENTS (actual values of function parameters, to input data), VARIABLE to save returned value (function output).

// DATE: 10/01/2022

// TOPIC: INTRODUCTION TO ARRAYS

const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

// NOTE: Literal syntax way to create array using brackets, which it's way more usual to use this way.

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);


// NOTE: This is another way to create array which is using array function(), and 'new' keyword should be added.

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

// NOTE: When you access the value of the array via index. Inside the bracket, JavaScript expects an expression (should be number), not a statement.

// NOTE: Array.length is a number.

console.log(friends.length);
console.log(friends[friends.length - 1]);

// NOTE: We can also add or change or mutate the array by using [].

// NOTE: We've learned before that variables declared with const cannot be changed, but only primitive values are immutable. Array is not a primitive value.

friends[2] = 'Jay';
console.log(friends);

// NOTE: But we cannot replace the entire array.

// friends = ['Bob', 'Alice'];

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

// Exercise

const calAge = function (birthYear) {
  return 2037 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2018];

// NOTE: We cannot do operations with arrays

const age1 = calAge(years[0]);
const age2 = calAge(years[1]);
const age3 = calAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calAge(years[0]), calAge(years[1]), calAge(years[years.length - 1])];
console.log(ages);

// TOPIC: BASIC ARRAY OPERATIONS (METHODS)

// NOTE: ADD ELEMENTS

// NOTE:: Push is a function(method) to add element to the END of array, eg. to attach values to friend array.

const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

// NOTE: Unshift method is a function to add element to the BEGINNING of array.

friends.unshift('John');
console.log(friends);


// NOTE: REMOVE ELEMENTS

friends.pop(); // Last
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // First
console.log(friends);

// NOTE: CHECK THE INDEX OF ARRAY

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

// NOTE: CHECK WHETHER THE ARRAY INCLUDE THE ELEMENT

friends.push(23);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Steven')) {
  console.log('You have a friend called Steven.');
}

// TOPIC: INTRODUCTION TO OBJECTS

// NOTE: Array is a kind of object, which has its index as its property name.

const jonasArray = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];

// NOTE: In objects, we actually define key value pairs, so we can give different values names.

// NOTE: In each key value pair, we call a key, property.

// NOTE: Object literal syntax:

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};

// NOTE: The big difference between arrays and objects is that we can only access array elements using its order number. This means that we should use arrays for more ordered data,and objects for more unstructured data. And data that we actually want to name, and then retrieve from the object, based on that name.

// DATE: 11/01/2022

// TOPIC: DOT VS. BRACKET NOTATION

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);

//  NOTE: DOT NOTATION

console.log(jonas.lastName);

// NOTE: BRACKETS NOTATION

console.log(jonas['lastName']);

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

// console.log(jonas.'last' + nameKey);

const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends');

// NOTE: We cannot use . to retrieve element from jonas object because it doesn't include interested in property.

// NOTE: Undefined is what we get when we try to access a property on an object that does not exist. Undefined is falsy value.

// console.log(jonas.interestedIn);

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);

} else {
  console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

// NOTE: Add new properties to the object

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschumedtmann';
console.log(jonas);

// challenge:
// 'Jonas has 3 friends, and his best friend is called Michael'

// NOTE: Operator precedence: . and [] is executed from left-to-right.

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas['friends'][0]}`);

// TOPIC: OBJECT METHODS

// NOTE: Objects can hold object inside of objects. Function is another type of value, so we can add functions inside of a object.

// NOTE: In an object, function is not written in as regular variable.

// NOTE: We use function express to create this method.

// NOTE: Any function that is attached to an object is called a method.

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: false,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // }

  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // }

  calcAge: function () {
    // NOTE: we can use dot notation like the following to create a new age property.
    this.age = 2037 - this.birthYear
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
  }
};

// NOTE: The this keyword is decided by who is calling the method, eg. jonas.

console.log(jonas.calcAge());

// NOTE: If you want to use jonas.age to call the function, you need to run the function first, otherwise jonas.age is not created actually.

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

// console.log(jonas['calcAge'](jonas['birthYear'])); // DRY

// Challenge
// 'Jonas is a 46-year old teacher, and he has a driver's license'

console.log(jonas.getSummary());

// NOTE: As we learned before of array methods, for example, array.push, array.pop..., which means arrays are also kind of objects, but special ones.

// TOPIC: ITERATION: THE FOR LOOP

// NOTE: If else statement is a control structure, and one of the other control structures is loop.

// NOTE: It allows us to automate repetitive tasks.

// console.log('Lifting weights repetition 1 🏋️‍♀️'); // break DRY rule
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// NOTE: For loop keeps running while condition is TRUE

// NOTE: Only when the second condition holds true, will the loop keeps running. And it will execute the next iteration.

for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

// TOPIC: LOOP ARRAYS, BREAKING AND CONTINUING

const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];

const types = [];

// console.log(jonas[0]);
// console.log(jonas[1]);
// ...
// console.log(jonas[4]);
// jonas[5] does NOT exist


for (let i = 0; i < jonas.length; i++) {

  // NOTE: READING FROM JONAS ARRAY
  console.log(jonas[i], typeof jonas[i]);

  // NOTE: Filling types array. Because we can add, change or mutate arrays by using array[].
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}

console.log(ages);

// NOTE: CONTINUE AND BREAK

// NOTE: Continue is to exit the current iteration of the loop and continue to the next one. Break is to completely terminate the whole loop,


// NOTE:
console.log('---- ONLY STRINGS ----')
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== 'string') continue;
  console.log(jonas[i], typeof jonas[i]);
}

console.log('---- BREAK WITH NUMBER ----')
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === 'number') break;
  console.log(jonas[i], typeof jonas[i]);
}

// TOPIC: LOOPING BACKWARDS AND LOOPS IN LOOPS

const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];

// 0, 1, ..., 4
// 4, 3, ..., 0

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}

// Create a loop inside a loop

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`--------- Starting exercise ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
  }
}

// TOPIC: WHILE LOOP

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// NOTE: The loop will repeat while the condition is true. But if the condition returns false, then the loop will stop.

// let rep = 1;
// while (rep <= 10) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
//   rep++;
// }

// rolling the dice, and until we roll a six, we stop. We should use random number.

// NOTE: Math.random will return a floating-point, pseudo-random number between 0 (inclusive) and 1 (exclusive).

// NOTE: Math.trunc will return the integer part of the given number.

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...')
}

// NOTE: The conclusion is that the while loop does really not have to depend on any counter variable. So the while loop is useful when you don't know how many iterations the loop will have beforehand.
*/
