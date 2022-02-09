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

const displayMovements = function (movements, sort = false) {
  // NOTE: InnerHTML is an built-in function that is a little bit similar to text content. The difference is that text content simply returns the text itself while HTML returns everything, including the HTML. So all the HTML tags will be included.

  containerMovements.innerHTML = '';
  // .textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
  `;
    // NOTE: The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.

    // NOTE: element.insertAdjacentHTML(position, text); Text: The string to be parsed as HTML or XML and inserted into the tree.

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// TOPIC: IMPLEMENTING LOGIN

// Event handlers

let currentAccount;

// NOTE: When we click the button in a form element. So in HTML, the default behavior, when we click the Submit button, is for the page to reload.

// NOTE: Another thing that's great about forms, is that whenever we have one of these fields here, input it, and when we then hit enter, then that will actually automatically trigger a click event on this button.

btnLogin.addEventListener('click', function (e) {
  // NOTE: When you are working with forms, preventing the reload is common to do.

  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // NOTE: We can use this blur function or method. So just call blur, and so that will make this field loses its focus.

    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

// TOPIC: IMPLEMENTING TRANSFERS

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clean out input

  // NOTE: Essentially, textContent gives you a textual representation of what a node contains. Think of it as being everything between the opening and closing tags (i.e. <span>this text</span>); <input> elements however cannot have children (content model: nothing). The value that is associated with them can only be accessed via the value property.

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log(currentAccount);
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// TOPIC: THE FINDINDEX METHOD

// NOTE: The the findIndex method works almost the same way as find. But as the name says, findIndex returns the index of the found element and not the element itself.

// NOTE: The find and findIndex methods get access to also the current index, and the current entire array. the both the find and findIndex methods were added to JavaScript in ES6. And so they will not work in like super old browsers.

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // NOTE: The big difference here is that with indexOf, we can only search for a value that is in the array. So, if the array contains the 23, then it's true, and if not, then it's false. But on the other hand, with findIndex, we can create a complex condition like this one, and of course, it doesn't have to be the equality operator here. It can be anything that returns true or false.

    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
    //Clear
    inputClosePin.value = inputCloseUsername.value = '';
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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

// TOPIC: THE MAGIC OF CHAINING METHODS

const eurToUsd = 1.1;
console.log(movements);
// Pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// NOTE: First we should not overuse chaining, so we should try to optimize it because chaining tons of methods one after the other can cause a real performance issues if we have really huge arrays. So if we have a huge chain of methods, chained one after the other, we should try to compress all the functionality that they do into as little methods as possible.

// NOTE: Second, it is a bad practice in JavaScript to chain methods that mutate the underlying original array. And an example of that is the splice method. You should not chain a method like the splice or the reverse method.

// TOPIC: THE FIND METHOD

// NOTE: We can use the Find method to retrieve one element of an array based on a condition.

// NOTE: The Find method will actually not return a new array but it will only return the first element in the array that satisfies this condition.

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// NOTE: There are two fundamental differences between find and filter method. First Filter returns all the elements that match the condition while the Find method only returns the first one. Second and even more important, the Filter method returns a new array while Find only returns the element itself and not an array.

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); //{owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// const accountNew = accounts.filter(acc => acc.owner === 'Jessica Davis');
// console.log(...accountNew);

// TOPIC: SOME AND EVERY

console.log(movements);

// NOTE: We can use the includes method to test if an array includes a certain value. However, we can only really test for equality if any value in the array is exactly equal to -130.

// Equality
console.log(movements.includes(-130));

// NOTE: We can specify a condition using some method.

// Condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// Every
// NOTE: Every method: the every method is pretty similar to the some method. The difference between them is that every only returns true if all of the elements in the array satisfy the condition that we pass in.

// NOTE: If every element passes the test in our callback function, only then the every method returns true

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback

// NOTE: We could also write this function separately and then pass the function as a callback.

const deposits = mov => mov > 0;
console.log(movements.some(deposits));
console.log(movements.every(deposits));
console.log(movements.filter(deposits));

// TOPIC: FLAT AND FLATMAP

// NOTE: The flat method has no callback function, and it removes the nested arrays and flattens the array, which is why the method is called flat.

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

// NOTE: It now goes even into the second level of nesting and also takes the element out of depth array.
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
// NOTE: flatMap only goes one level deep and we cannot change it. So if you do need to go deeper than just one level, you still need to use the flat method.
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

// TOPIC: SORTING ARRAYS

// Strings
// NOTE: Sort is actually mutated the original array. So we have to be very careful with this method.
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']
console.log(owners); // ['Adam', 'Jonas', 'Martha', 'Zach']

// Numbers
// NOTE: The sort method does the sorting based on strings by default.
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

// NOTE: If you have a mixed array, like with strings and numbers together, then this is not gonna work and I advise you to simply not to use the sort method in these cases anyway.

// TOPIC: MORE WAYS OF CREATING AND FILLING ARRAYS

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// NOTE: The reason for that is this weird behavior of this Array() function which does it so that whenever we only pass in one argument, then it creates a new empty argument with that length.

const x = new Array(7);
console.log(x); // [empty × 7]

// NOTE: So this is not really useful except for one thing, because there is one method that we can call on this empty array and that is the fill() method.

// console.log(x.map(() => 5));

x.fill(1); // [1, 1, 1, 1, 1, 1, 1]
// x.fill(1, 3); // [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5); // [empty × 3, 1, 1, empty × 2]
console.log(x);
arr.fill(23, 4, 6);
console.log(arr); // [1, 2, 3, 4, 23, 23, 7]

// NOTE: How to create an array programmatically

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// Create an array with 100 random dice
// NOTE: What Math.random will generate is a random number between 0 to 1 (excludes).

const diceArray = Array.from(
  { length: 100 },
  () => Math.trunc(6 * Math.random()) + 1
);
console.log(diceArray);

// NOTE: Things like Strings, Maps or Sets, they are all Iterables in JavaScript. Iterables can be converted to real arrays using Array.from().

// NOTE: Using querySelectorAll(), returns something called a NodeList, which is something like an array, which contains all the selected elements. But it's not a real array, and so it doesn't have methods like map() or reduce(). So if we actually wanted to use a real array method like that on a NodeList, we would first need to convert the NodeList to an array. And for that Array.from() is perfect.

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI2);
});

// TOPIC: ARRAY METHODS PRACTICE

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .filter(mov => mov >= 1000).length;

  // NOTE: So we did count plus plus which then increased the value from zero to one. But the result of this expression here is still zero. And so zero was returned here to the next iteration. And therefore in the end we will always have zero. So we should use ++count.

  // .reduce((count, cur) => (cur >= 1000 ? count++ : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

let a = 10;
console.log(a++); // 10
console.log(++a); // 12
console.log(a); // 12

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
// NOTE: We can access a object property by both Object.propertyName and Object['propertyName'].
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);
// {deposits: 25180, withdrawals: -7340}
console.log(accounts);
console.log(accounts.flat());

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/
