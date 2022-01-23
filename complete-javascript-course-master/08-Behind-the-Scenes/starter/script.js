'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  printAge();
  // console.log(printAge);

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      // NOTE: So the scope chain isn't necessary at all, if the variable that we're looking for is already in the current scope.
      const str = `Oh, and you are a millenial, ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    // NOTE: Var variables are function scoped, so it will ignore the block.
    console.log(millenial);
    // NOTE: In strict mode, functions are restricted by block, it is block scoped. But if it is not strict mode, functions are function scoped.
    // console.log(add(2, 3));
    console.log(output);
  }
  return age;
}

// NOTE: You can have repeat variable names and it is totally ok if they are not in the same scope.
const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();

// Variables

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions

console.log(addDecl(2, 3));

// NOTE: The function is declared by const, so it is still in the temporary dead zone.

// console.log(addExpr(2, 3));
console.log(addArrow); // Undefined
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => {
  a + b;
};

// Example
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// TOPIC: THIS KEYWORD

// NOTE: Variables declared by let and const do not create properties on the window object.

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

// console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  // console.log(this);
};
calcAge(1991);

// NOTE: Because the arrow function does not get its own disc keyword. So instead the arrow function simply uses the lexical this keyword, which means that it uses the this keyword of its parent function or of its parents scope -- window function and global scope.

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  // console.log(this);
};
calcAgeArrow(1981);

// NOTE: When we have a method call, the this keyword inside of the method will be the object that is calling the method. In this case, it's the jonas object.

// NOTE: The this keyword will not simply point at the object in which we wrote the method. In this case, the this keyword points to jonas is because jonas was the object calling the method.

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

// NOTE: Method borrowing

matilda.calcAge = jonas.calcAge;

// NOTE: The fact that the disc keyword always points to the object that is calling the method. And so here we are calling the method on Matilda, so this keyword points to matilda.

matilda.calcAge();

// NOTE: This F function here is now just a regular function call. It is not attached to any object. There is no owner of this F function anymore here at this point. So in strict mode, this keyword in regular function is undefined.

const f = jonas.calcAge; // f = function () {console.log(this);console.log(2037 - this.year);},
f();

// NOTE: If we declare variables with var, that creates these kind of properties on the global object.

// var firstName = 'Matilda';

// NOTE: object literal
const jonas = {
  firstName: 'jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1 (Before ES6)
    // NOTE: The first solution is to use an extra variable that we usually call self. So outside of the function. So at the outside of the isMillenial function, we can still access the this keyword, set to jonas (Because calcAge is a method, so it's the this keyword is the object that is calling the method, which is jonas.).

    // const self = this; // self or that
    // const isMillenial = function () {
    //   // NOTE: It's a clear rule that a regular function call has the this keyword set to undefined.
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   // console.log(this.year >= 1981 && this.year <= 1996);

    // Solution 2 (Arrow Function)
    const isMillenial = () => {
      // NOTE: It's a clear rule that a regular function call has the this keyword set to undefined.
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: function () {
    console.log(`Hey ${this.firstName}`), console.log(this);
  },
};
jonas.greet(); // The parent of greet method is global scope because arrow function does not own this keyword.
jonas.calcAge();
// NOTE: When we try to access a property that doesn't exist on a certain object, we do not get an error, but simply undefined.
// console.log(this.firstName);

// ARGUMENTS KEYWORD

// NOTE: The argument key word exists only in function expression, but only in regular functions, eg. function expression and function declaration.

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);

// TOPIC: PRIMITIVES VS. OBJECTS (PRIMITIVE VS. REFERENCE TYPES) PPT

// NOTE: So whenever we change something in this object, it will always be reflected in Friend and in Me. So in both these objects. So these are basically just two different identifiers pointing to the exact same value.

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me;
friend.age = 27;
console.log('Friend', friend);
console.log('Me', me);

// TOPIC: PRIMITIVES VS. OBJECTS IN PRACTICE

// NOTE: It works this way because each primitive value will simply be saved into its own piece of memory in the stack.

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage', marriedJessica);

// NOTE: We could not change the marriedJessica to a new object because this new object will be stored at a different position in memory, and therefore the reference to that position in memory will have to change here in this variable. And therefore, that does not work. Because that is in the stack and so, since it is a constant, we cannot change that value in the stack. ---const

// marriedJessica = {};

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2); // Williams
console.log('After marriage', jessicaCopy); // Davis

// NOTE: There is still a problem because using this technique of object.assign only works on the first level. Or in other words, if we have an object inside the object, then this inner object will actually still be the same. So, it will still point to the same place in memory. And that's why we say that this object.assign only creates a shallow copy. a shallow copy will only copy the properties in the first level while a deep clone would copy everything.

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2);
console.log('After marriage', jessicaCopy);

// NOTE: If we want to create a deep clone, using an external library, like Lo-Dash, and this library has a ton of helpful tools and one of them is for deep cloning.
*/
// const a = [1, 3, 4];
// const b = [];
// for (let i = 0; i < a.length; i++) {
//   b[i] = a[i];
// }

// const a = [[[2, 5], 3, 4], [2, 3, 5], 4, 2];
// const b = [];
// for (let i = 0; i < a.length; i++) {
//   if (a[i] === 'object') {
//     const c = [];
//     for (let j = 0; j < a[i].length; j++) {
//       if (a[i][j] === 'object') {
//         const d = [];
//         for (let k = 0; k < a[i][j].length; k++) {
//           d[k] = a[i][j][k];
//         }
//         c[j] = d;
//       } else c[j] = a[i][j];
//     }
//     b[i] = c;
//   } else b[i] = a[i];
// }
// console.log(b);
