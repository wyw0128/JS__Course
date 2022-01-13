/*
DATE: 06/01/2022

// TOPIC:VALUES AND VARIABLES

let js = 'amazing';
console.log(48 + 3 - 4);

console.log('Jonas');
console.log(23);

// NOTE: This is declaring a variable in js. It is creating a variable in your computer memory and storing the value inside the variable.
let firstName = 'Matilda';

console.log(firstName);
console.log(firstName);
console.log(firstName);

// NOTE: Variable name conventions:
// In JS, variable name is normally written in camelCase notation. You can only use numbers, letters, underscores or the dollar sign to name variables, and you cannot use a reserved keyword to name variables. Also, variables all in upper case is seen as constants that would never change, such as PI.
let jonas_matilda = 'JM';
let $function = 27;

let person = 'Jonas'
let PI = 3.1415;

// NOTE: You should name your variable more understandable and descriptive.
let myFirstJob = 'Coder';
let myCurrentJob = 'Teacher';

let job1 = 'programmer';
let job2 = 'teacher';

console.log(myFirstJob);

// TOPIC: DATA TYPES

// NOTE: There are seven types of primitive data: number, string, bullion, undefined, null, symbol and big int (after 2020). Symbol is not useful for now.
// NOTE: JavaScript has dynamic typing: We do not have to manually define the data type of the value stored in a variable. Instead, data types are determined automatically.
// NOTE: In JavaScript, it is the value that has the type not the variable.
// NOTE: JavaScript is executed from top to bottom, so the variable declaration needs to happen before the log.
let javaScriptIsFun = true;
console.log(javaScriptIsFun);

// console.log(typeof true);
console.log(typeof javaScriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jonas');

// NOTE: You can see the JavaScript has changed the data type automatically after you redefine the value of the variable javaScriptIsFun.
javaScriptIsFun = 'YES!';
console.log(typeof javaScriptIsFun);

// NOTE: Undefined is both the value and the type of the value.
let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

// NOTE: It is a bug that the type of null is an object, but it is not fixed because of legacy reasons. It should return null at both value and type of value as undefined does.
console.log(typeof null);


// TOPIC: LET, CONST AND VAR

// NOTE: We use let that we can reassign a new value later;
let age = 30;
age = 31;

// NOTE: We use const to declare variables that are not supposed to change, so the value in a const variable can not be changed.
const birthYear = 1991;
// birthYear = 1990;

// NOTE: When using const, we need basically an initial value.
// NOTE: As best practice to writing clean code, recommend to use const. As it will create as little variable mutations or variable changes as possible. Reduce bugs.
// const job;

// NOTE: We do not use var any more, and it's before ES6.
var job = 'programmer';
job = 'teacher';

// Not a good way because we don not create any variables. It cannot work in strict mode.
lastName = 'Schmedtmann';
console.log(lastName);

DATE: 07/01/2022

// TOPIC: BASIC OPERATORS

// NOTE: Math Operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

// NOTE: 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2
console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// NOTE: typeof is also a kind of operator
const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// NOTE: Assignment Operator
let x = 10 + 5; // 15
// NOTE: x = x + 10 = 25
x += 10;
// NOTE: x = x * 4 = 100
x *= 4;
// NOTE: x = x + 1
x++;
// NOTE: x = x - 1
x--;
x--;
console.log(x);

// NOTE: Comparison Operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);
// NOTE: In real case, we would store these results in variables, not just lock the results to the console. Console has access to all the variables that is running in the current browser tab, but if you reload the web, it will all gone.

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

// TOPIC: OPERATOR PRECEDENTS

// NOTE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10 (assignment executed from right-to-left)
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);

// TOPIC: STRINGS AND TEMPLATE LITERALS

const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas);

// NOTE: A template literal can assemble multiple pieces into one final string. By using it, we should use `` (back ticks), $ sign with {}, inside the {}, we add variables.
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log('String with \n\
multiple \n\
lines');
// NOTE: When you want to all new line, always use template literal.
console.log(`String
multiple
lines`);

// TOPIC: TAKING DECISIONS: IF/ELSE STATEMENTS

const age = 15;

// NOTE: If else is a control structure. There are other control structures.

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :`);
}

const birthYear = 2018;

// NOTE: Else block is optional. In if parenthesis, the value need to be a boolean.
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

// TOPIC: TYPE CONVERSION AND COERCION

// NOTE: TYPE CONVERSION

// NOTE: Type conversion is when we manually convert from one type to another. Type coercion is when JavaScript automatically converts types behind the scenes for us.
// NOTE: eg. by using Number won't mutate inputYear value

const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

// NOTE: NaN is not actually not a number, it means invalid number. We normally get NaN whenever an operation involving numbers fails to give us a new number.

console.log(Number('Jonas'));
// NOTE: console.log(typeof NaN); Number

// NOTE: We need to write the first letter in upper case. JS can only convert to numbers (Number), to strings (String) and to booleans (Boolean), not to undefined or null.

console.log(String(23), 23);

// NOTE: TYPE COERCION

console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3); // minus operator triggers the opposite conversion;
console.log('23' + '10' + 3); // Three strings are concatenated
console.log('23' / '2');


let n = '1' + 1;
n = n - 1;
console.log(n);

// TOPIC: TRUTHY AND FALSY VALUES

// NOTE: 5 falsy values: 0, '', undefined, null, NaN

console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean('Jonas')); // true
console.log(Boolean({})); // true;  empty object are true
console.log(Boolean('')); // false

const money = 10;
if (money) {
  console.log("Don't spend it all");
} else {
  console.log('You should get a job!');
}

let height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}

// TOPIC: EQUALITY OPERATORS: == VS. ===

// NOTE: === is strict equality operator, it is strict because it does not perform type coercion, so it only returns true to when both values are exactly the same.
// 18 === 18 is true; 18 === 19 is false.
// NOTE: == is loose equality operator, it performs type coercion.
// '18' == 18 is true; '18' === 18 is false.
// NOTE: As a general rule for clean code, avoid the loose equality operator as much as you can.

const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)');

if (age == 18) console.log('You just became an adult :D (loose)');

// NOTE: Prompt: getting a value from web page.

const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {  // 23 === 23
  console.log('Cool! 23 is an amazing number!');
} else if (favorite === 7) {
  console.log('7 is also a cool number!')
} else if (favorite === 9) {
  console.log('9 is also a cool number')
} else {
  console.log('Number is not 23 or 7')
}

// NOTE: !== is the strict inequality operator, != is the loose inequality operator.

if (favorite !== 23) console.log('Why not 23?');

// TOPIC: BOOLEAN LOGIC

// NOTE: AND operator: only all of the variables are true, the result of the operator will be true.
// NOTE: OR operator: the or operator will be true if just one of the variables will be true.
// NOTE: NOT A: all it does is to invert the logical value of the variable.
// NOTE: NOT operator actually has precedents over the OR and AND operators.


// DATE: 08/01/2022

// TOPIC: LOGICAL OPERATORS

const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision); // &&: AND operator
console.log(hasDriversLicense || hasGoodVision); // ||: OR operator
console.log(!hasDriversLicense); // !: NOT operator

const shouldDrive = hasDriversLicense && hasGoodVision

// NOTE: It is always more common to write the condition directly inside the if parenthesis.

// if (shouldDrive) {
//   console.log('Sarah is able to drive!');
// } else {
//   console.log('Someone else should drive...');
// }

const isTired = false; // C
console.log(hasDriversLicense || hasGoodVision || isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}


// TOPIC: THE SWITCH STATEMENT

// NOTE: If you don't add break at each case, it will execute down the following case until it has a break.

const day = 'monday';

switch (day) {
  case 'monday': // day === 'monday'
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;
  case 'tuesday':
    console.log('Prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend :D');
    break
  default:
    console.log('Not a valid day!');
}

// NOTE: Jonas thinks IF ELSE statement write a lot repetitive codes, and that's the switch statement try to avoid.

if (day === 'monday') {
  console.log(`Plan course structure`);
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log(`Prepare theory videos`);
} else if (day === 'wednesday' || 'thursday') {
  console.log(`Write code examples`);
} else if (day === 'friday') {
  console.log(`Record videos`);
} else if (day === 'saturday' || 'sunday') {
  console.log(`Not a valid day!`);
} else {
  console.log('Not a valid day!')
}


// TOPIC: STATEMENTS AND EXPRESSIONS

// NOTE: An expression is a piece of code that produces a value.

3 + 4
1991
true && false && !false

// NOTE: An statement is like a bigger piece of code that is executed and which does not produce a value on itself. It just create some actions but does not generate values.

// NOTE: '23 is bigger' is an expression because it is a value, and const str = '23 is bigger' is an statement because it doesn't return any value.

if (23 > 10) {
  const str = '23 is bigger';
}

// NOTE: Template literal can only use with expressions because template literal expects values, if statement is put into it, it makes no sense.

const me = 'Jonas';
console.log(`I'm ${2037 - 1991} years old ${me}`);


// TOPIC: THE CONDITIONAL(TERNARY) OPERATOR

// NOTE: Conditional operator allows to write the if else statement only in one line. And it contains a mandatory else part. It has three parts: condition, if part and else part.

// NOTE: An operator always produces a value, so in other words an operator is an expression. So with this we can make the ternary operator really useful to basically conditionally declare variables.

const age = 18;
// age >= 18 ? console.log('I like to drink wine 🍷') :
//   console.log('I like to drink water 💧');

// This is what often used in reality.
const drink = age >= 18 ? 'wine 🍷' : 'water 💧';
console.log(drink);

// NOTE: We need to declare the drink2 variable outside the if and else block because any variables declared inside the block is not available outside.

let drink2;
if (age >= 18) {
  drink2 = 'wine 🍷';
} else {
  drink2 = 'water 💧';
}
console.log(drink2);


// NOTE: We can use template literal with conditional operator because it produces a value and template literal expects a value.

console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);

// NOTE: The ternary operator is not thought as a replacement of if/else statements. For example when we have bigger blocks of code that we need to execute based on a condition. But the ternary operator is perfect when we just need to take a quick decision.
*/



