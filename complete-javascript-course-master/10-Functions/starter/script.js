'use strict';
/*
// TOPIC: DEFAULT PARAMETERS

const bookings = [];

// NOTE: What's even more useful is that we can actually use the values of the other parameters that were set before it. So here we can now say that the price should be calculated based on the number of passengers.

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // NOTE: ES5 Default setting
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 4);
createBooking('LH123', 6);

// NOTE: Setting the parameter to undefined, it's the same thing as not even setting it. When we don't set a parameter so when we don't pass an argument into that parameter, then it will take the value of undefined. so this is how we basically skip a default parameter that we want to leave at its default.

createBooking('LH123', undefined, 1000);

// TOPIC: HOW PASSING ARGUMENTS WORKS: VALUES VS. REFERENCE

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight); // LH234

// NOTE: When we pass a reference type to a function, what is copied is really just a reference to the object in the memory heap. So whatever we change in a copy will also happen in the original.

// console.log(jonas); // {name: 'Mr. Jonas Schmedtmann', passport: 24739479284}

// Is same as doing
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

// NOTE: There are two terms that are used all the time when dealing with functions, which is passing by value, and passing by reference. JavaScript does not have passing by reference, only passing by value. for objects, we do in fact pass in a reference. So the memory address of the object. However, that reference itself is still a value. It's simply a value that contains a memory address. So basically we pass a reference to the function, but we do not pass by reference.

// TOPIC: FIRST-CLASS AND HIGHER-ORDER FUNCTIONS

// NOTE: First class functions is just a feature that a programming language either has or does not have. All it means is that all functions are values. There are no first class functions in practice. It's just a concept. There are however higher order functions in practice, which are possible because the language supports first class functions.

// TOPIC: FUNCTIONS ACCEPTING CALLBACK FUNCTIONS (important)

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function

// NOTE: It's basically delegating the string transformation to the other lower level of functions, which are oneWord and upperFirstWord. Because transformer function here operates at a higher level of abstraction, leaving the low level details to this low level functions.

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

// NOTE: We do not need to call it by ourselves, we call the JavaScript to call it later.

transformer('JavaScript is the best!', upperFirstWord); // Original string: JavaScript is the best Transformed string: JAVASCRIPT is the best Transformed by: upperFirstWord

transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('🎉');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// NOTE: Callback functions allow us to create abstraction.

// NOTE: What abstraction means, is that we hide the detail of some code implementation because we don't really care about all that detail.

// TOPIC: FUNCTIONS RETURNING FUNCTIONS
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
// greeterHey = function (name) {console.log(`${greeting} ${name}`);};
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// NOTE: It is very useful for functions returning functions when we use the functional programming.

// challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Jonas');

// TOPIC: THE CALL AND APPLY METHODS
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// NOTE: The book function is now just a regular function call and so as we learned in one of the previous sections, in a regular function call, the this keyword points to undefined, at least in strict mode. book is not a method now.

// book(23, 'Sarah Williams'); // Does not work.

// Call method
// NOTE: We called the call method and it's then this call method, which will call the book function with the this keyword set to eurowings. So this allows us to manually and explicitly set the this keyword of any function that we want to call.

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method
const flightData = [583, 'George Cooper'];

// NOTE: The only difference is that apply does not receive a list of arguments after the this keyword, so it doesn't receive this list here but instead, it's gonna take an array. For apply, the first argument is to set this keyword, and the second argument should be an array.

book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// TOPIC: THE BIND METHOD

// NOTE: Bind also allows us to manually set this keywords for any function call. Now, the difference is that bind does not immediately call the function.

// NOTE: Bind returns a new function where this keyword is bound.

// book.call(eurowings, 23, 'Sarah Williams');

// NOTE: It will return a new function where this keyword will always be set to Eurowings as we set.

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schumedtmann');
bookEW23('Martha Cooper');

// NOTE: What we did basically specifying parts of the argument beforehand, is actually a common pattern called partial application. Partial application means that a part of the arguments of the original function are already applied, or already set.

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

// NOTE: In an event handler function, that this keyword always points to the element on which that handler is attached to.

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(100));
console.log(addVAT2(23));

// TOPIC: IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)

// NOTE: We need a function that is only executed once. And then never again. So basically a function that disappears right after it's called once.

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// NOTE: By simply wrapping all of this into parentheses, we transformed the statement into an expression.

// IIFE

// NOTE: All data defined inside a scope is private because the global scope does not have access to anything, that is inside of a scope. Data encapsulation and data privacy are extremely important concepts in programming.

(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate); //isPrivate is not defined

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate); // Var completely ignore block.

// NOTE: Now in modern JavaScript. Immediately Invoked Function Expressions are not that used anymore. Because if all we want is to create a new scope for data privacy. All we need to do, is to just create a block.

// NOTE: If what you really need, is to execute a function just once, then the IIFE is still the way to go.

// TOPIC: CLOSURES

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// NOTE: We can say that a closure makes a function remember all the variables that existed at the function's birthplace essentially.

// NOTE: Any function always has access to the variable environment of the execution context in which the function was created.

// NOTE: The closure basically has priority over the scope chain. For example, if there was a global passengerCount variable set to 10, it would still first use the one in the closure.

console.dir(booker);

// NOTE: So the closure (passengerCount) is the variable environment of this secureBooking.

// TOPIC: MORE CLOSURE EXAMPLES

// Example 1 Reassigning
let f;
const c = 1;
const g = function () {
  const a = 23;

  const add = (a, b) => a - b;
  const firstLevel = function () {
    const b = 2;
    f = () => {
      console.log(add(a, b), c);
    };
    // console.log(a * 2);
  };
  firstLevel();
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

// NOTE: This is really fascinating in my opinion that the closure can change like this as the variable is reassigned.

g();
f();
console.dir(f);
// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

// NOTE: setTimeout is a built-in function which accept several arguments, first is the callback function, the second is after how long (millisecond) the callback function is called.

// setTimeout(function () {
//   console.log('TIMER');
// }, 1000);

// NOTE: This callback function here was executed completely independently from the board passengers function, but still the callback function was able to use all the variables that were in the variable environment in which it was created.

boardPassengers(180, 3);
*/
