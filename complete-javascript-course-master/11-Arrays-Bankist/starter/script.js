'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// TOPIC: CREATING DOM ELEMENTS (insertAdjacentHTML)

// NOTE: Instead of working with global variables, start passing the data that function needs actually into that function.

const displayMovements = function (movements) {
  // NOTE: InnerHTML is an built-in function that is a little bit similar to text content. The difference is that text content simply returns the text itself while HTML returns everything, including the HTML. So all the HTML tags will be included.

  containerMovements.innerHTML = '';
  // .textContent = 0

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
  `;
    // NOTE: The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.

    // NOTE: element.insertAdjacentHTML(position, text); Text: The string to be parsed as HTML or XML and inserted into the tree.

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

// TOPIC: COMPUTING USERNAMES

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
// NOTE: In this function, we do not return anything, because what we're doing here is to produce a side effect. We are doing something to this account object here. And so there is no need to return anything.

createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// TOPIC: SIMPLE ARRAY METHODS

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE (does not mutate)

// NOTE: This does not mutate the original array (arr). Instead it returns a new array. So a copy of the array, but only with the extracted parts.
console.log(arr.slice(2)); //['c', 'd', 'e']

// NOTE: The length of the output array right here will be the end parameter minus the beginning one.
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b', 'c']

// NOTE: We can use the slice method to simply create a shallow copy of any array.
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']
console.log([...arr]);

// SPLICE (mutate)

// NOTE: A splice method works in almost the same way as slice. But the fundamental difference is that it does actually change the original array.

// NOTE: Splice actually does mutate the original array, so it takes part of the array and returns it and then the original array itself loses this part that was extracted.
// console.log(arr.splice(2)); // ['c', 'd', 'e']
arr.splice(-1);
console.log(arr); // ['a', 'b', 'c', 'd']

// NOTE: This first parameter here works the same as in the slice method but the second one is really the number of elements that we want to delete.
arr.splice(1, 2);
console.log(arr); // ['a', 'd']

// REVERSE (mutate)

// NOTE: Reverse does mutate the original array.
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']

console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// CONCAT (does not mutate)
const letters = arr.concat(arr2); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log(letters);
console.log([...arr, ...arr2]); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// JOIN (does not mutate)
console.log(letters.join(' - '));
console.log(arr.join(', ')); // a, b, c, d, e
console.log(arr);

// TOPIC: THE NEW AT METHOD
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// NOTE: The At Method also works on strings.
console.log('jonas'.at(0)); // j
console.log('jonas'.at(-1)); // s

// TOPIC: LOOPING ARRAYS: FOREACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// NOTE: What the forEach method does is to loop over the array, and in each iteration it will execute the callback function here.
console.log('----------FOREACH-----------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...

// NOTE: The first parameter always needs to be the current element, the second parameter always the current index and the third one always the entire array
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// NOTE: One fundamental difference between the for of loop and forEach is that you cannot break out of a forEach loop. So the continue and break statements do not work in a forEach loop at all.

// TOPIC: FOREACH WITH MAPS AND SETS
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// NOTE: This function with three arguments. So the first one will be the current value, so the current value in the current iteration, the second one is the key, and the third one is the entire map that is being looped over.

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set

// NOTE: A set doesn't have keys, and it doesn't have indexes either. So there is no value that would make sense for the key.

// NOTE: We cannot have the duplicate parameter name. And so we can just use an underscore, which in JavaScript means a throwaway variable.

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// TOPIC: DATA TRANSFORMATIONS: MAP, FILTER, REDUCE

// MAP

// NOTE: The map method is yet another method that we can use to loop over arrays. So, map is actually similar to the forEach method that we studied before but with the difference that map creates a brand new array based on the original array.

// NOTE: More useful than in forEach method because forEach simply allows us to do some work with each array element. But map on the other hand, builds us a brand new array containing the results of applying an operation to the original array,

// FILTER

// NOTE: Elements for which the condition is true will be included in a new array that the filter method returns.

// REDUCE

// NOTE: We use REDUCE method to boil down all the elements of the original array into one single value.

// TOPIC: THE MAP METHOD

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

// NOTE: In this map method we did not create a side effect in each of the iteration.

// TOPIC: THE FILTER METHOD

// NOTE: That condition is so that only the values that has the condition will then make it into the new array. And passing that condition means that it's true.

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}
console.log(depositsFor);

// NOTE: Why should't we use for loop almost everywhere? Because we can actually chain all of these methods together. Basically use them all one after another to build a big final result.

// NOTE: One line arrow function actually has a return and it is omitted. So this is why it works.

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// TOPIC: THE REDUCE METHOD

console.log(movements);

// NOTE: And this works because in each call of the callback function, the accumulator will be the current sum of all the previous values.

// NOTE: This callback function is the first argument of the reduce method, but the reduce method actually has a another, so a second parameter, and that is the initial value of the accumulator.

// Accumulator -> SNOWBALL

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// NOTE: Reduce method is by far the most useful array method.
*/
