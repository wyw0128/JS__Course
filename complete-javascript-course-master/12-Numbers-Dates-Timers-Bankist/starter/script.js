'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-02-08T17:01:17.194Z',
    '2022-02-09T23:36:17.929Z',
    '2022-02-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

// TOPIC: OPERATIONS WITH DATES
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  // NOTE: As once we return, the function stops executing. And so these other returns will then never be reached.
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    // NOTE: The currency is completely independent from the locale itself.
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1s
    time--;
  };
  // Set time to 5 mins
  let time = 120;

  // Call the timer every second
  // NOTE: So this callback function that we passed into set interval is not called immediately. It will only get called the first time after one second. The trick to doing that is to export this into a separate function, then call it immediately and then also start calling it every second using the set interval function.
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// TOPIC: ADDING DATES TO 'BANKIST' APP

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // TOPIC: INTERNATIONALIZING DATES (INTL)

    // Create current date and time
    // NOTE: Experimenting API
    // So just with this one line of code, we have correctly formatted the date for any user around the world.
    // http://www.lingoes.net/en/translator/langcode.htm
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // 2
      // month: '2-digit', // 02
      // month: 'long', // February
      year: 'numeric',
      // weekday: 'narrow', // F
      // weekday: 'short', // Fri
      // weekday: 'long', // Friday
    };
    // NOTE: Now in many situations, it actually makes more sense to not define the locale manually, but instead to simply get it from the user's browser using navigator.language.
    // const locale = navigator.language;
    // console.log(locale);
    // labelDate.textContent = new Intl.DateTimeFormat('en-GB').format(now); //11/2/2022
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //2/11/2022

    // const now = new Date();
    // // NOTE: The padStart() method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of the current string.
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = `${now.getFullYear()}`;
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// TOPIC: CONVERTING AND CHECKING NUMBERS

// NOTE: In JavaScript, all numbers are presented internally as floating point numbers. So basically, always as decimals, no matter if we actually write them as integers or as decimals.

console.log(23 === 23.0); // true

// NOTE: Numbers are represented internally in a 64 base 2 format. So that means that numbers are always stored in a binary format. So basically, they're only composed of zeros and ones.

// Base 10 - 0 to 9
// Binary base 2 - 0 1
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false: it is a JS error.

// NOTE: Because when JavaScript sees the plus operator, it will do type coercion. So it will automatically convert all the operands to numbers.

console.log(Number('23')); // 23
console.log(+'23'); // 23

// Parsing

// NOTE: On the Number object, which is kind of this function here, but it's also an object in the end. Remember because every function is also an object. It has some methods to do parsing. eg. .parseInt. So here we can now specify a string and that string can even include some symbols. And JavaScript will then automatically try to figure out the number that is in this string.

console.log(Number.parseInt('30px', 10)); // 30

// NOTE: In order to make this work, the string needs to start with a number.

console.log(Number.parseInt('e23', 10)); // NaN

console.log(Number.parseInt('   2.5rem  ')); // 2
console.log(Number.parseFloat('  2.5rem ')); // 2.5

// NOTE: Those two are so called global functions. We would not have to call them on Number. But it is an old-school way of doing it, now in modern JavaScript, it is more encouraged to call these functions actually on the Number object.

// NOTE: Number here provides a namespace. So a namespace for all these different functions.

// console.log(parseInt('2.5rem'));

// Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20x')); // true
console.log(Number.isNaN(23 / 0)); // false: it is an infinity

// NOTE: the isFinite method is indeed the best way of checking if a value is a number. A real number, not a string.
// Checking if value is number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20x')); // false
console.log(Number.isFinite(23 / 0)); // false

// Check if the value is a integer
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

// TOPIC: MATH AND ROUNDING
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2));
// NOTE: This is the only way to calculate the cubic root if you need it.
console.log(8 ** (1 / 3)); // 2

// Max and min
console.log(Math.max(5, 18, 23, 11, 2)); // 23
// NOTE: This max function here actually does type coercion. However it does not parsing.
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

// How we make a random dice roll
console.log(Math.trunc(Math.random() * 6) + 1);
// NOTE: So this is how we end up with a nice function which will give us always a number that's going to stay between min and max.
// 0...1 -> 0...(max - min) -> min...(max - min + min) -> min...max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding integers

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.9')); // 23

// NOTE: So basically floor and trunc, both cut off the decimal part when we are dealing with positive numbers. Actually a floor is a little bit better than trunc because it works in all situations, no matter if we're dealing with positive or negative numbers.
console.log(Math.trunc(-23.3)); // -23
console.log(Math.trunc(-23.9)); // -23
console.log(Math.floor(-23.3)); // -24
console.log(Math.floor(-23.9)); // -24
console.log(Math.ceil(-23.3)); // -23
console.log(Math.ceil(-23.9)); // -23

// Rounding decimals
// NOTE: toFixed will always return a string and not a number.
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log(+(2.345).toFixed(2)); // 2.35

// TOPIC: THE REMAINDER OPERATOR
console.log(5 % 2); // 1
console.log(8 % 3); // 2

// Check even or odd
console.log(6 % 2 === 0); // true
console.log(7 % 2 === 0); // false

const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

// NOTE: so every Nth time, then it is a good idea to use the remainder operator for that.
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'; // 2nd time
    if (i % 3 === 0) row.style.backgroundColor = 'blue'; // 3rd time
  });
});

// TOPIC: NUMERIC SEPARATORS
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); // 287460000000

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

console.log(Number('230000'));
console.log(Number('2300_00')); // NaN
console.log(parseInt('2300_00')); // 2300

// TOPIC: WORKING WITH BIGINT

// NOTE: This is the biggest number that JavaScript can safely represent. it's even stored into the number namespace as MAX_SAFE_INTEGER.
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// NOTE: BigInt stands for big integer. It is a new primitive type. And it can be used to store numbers as large as we want.
// Those two have different outcomes.
console.log(3243253254324534543656465465645645n);
console.log(BigInt(3243253254324534543656465465645645));

// Operations
console.log(10000n + 10000n); // 20000n
console.log(32423524356234542353424564326563454236243n * 100000000n);
// console.log(Math.sqrt(16n)); //Cannot convert a BigInt value to a number at Math.sqrt

// NOTE: Cannot mix BigInt and other types
const huge = 34254234624365462546435234n;
const num = 23;
console.log(huge * BigInt(num));

console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
console.log(20 == 20n); // true: JS does type coercion
console.log(20n == '20'); // true: JS does type coercion

console.log(huge + ' is REALLY big!!!'); // 34254234624365462546435234 is REALLY big!!! The number is actually converted to string, even for the BigInt.

// Divisions
// NOTE: It will cut the decimal part.
console.log(10n / 3n); // 3n
console.log(10 / 3); // 3.33333333333


// TOPIC: CREATING DATES

// Create a date
const now = new Date();
console.log(now); // Thu Feb 10 2022 22:19:37 GMT+1100 (Australian Eastern Daylight Time)

console.log(new Date('Feb 10 2022 22:19:28')); // Thu Feb 10 2022 22:19:37 GMT+1100 (Australian Eastern Daylight Time)
console.log(new Date('January 28, 2022')); // Fri Jan 28 2022 00:00:00 GMT+1100 (Australian Eastern Daylight Time)
console.log(new Date(account1.movementsDates[0])); // Tue Nov 19 2019 08:31:17 GMT+1100 (Australian Eastern Daylight Time)

// NOTE: November is actually the month 11. the month here in JavaScript is zero based.
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+1100 (Australian Eastern Daylight Time)

// NOTE: JavaScript actually auto corrects the day.
console.log(new Date(2037, 10, 33, 15, 23, 5)); // Thu Dec 03 2037 15:23:05 GMT+1100 (Australian Eastern Daylight Time)

console.log(new Date(0)); // Thu Jan 01 1970 10:00:00 GMT+1000 (Australian Eastern Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 10:00:00 GMT+1000 (Australian Eastern Standard Time)

// NOTE: 3 * 24 * 60 * 60 * 1000 = 259200000; It is a timeStamp.

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// NOTE: toISOString is one of the very useful cases is when you want to convert a particular date object into a string that you can then store somewhere.
console.log(future.toISOString()); // 2037-11-19T04:23:00.000Z

// NOTE: We can also get the timeStamp using getTime.
console.log(future.getTime()); // 2142217380000

console.log(new Date(2142217380000));
// NOTE: So if you want simply the current timestamp for this exact moment, then you don't even need to create a new date. All we have to do is to call date.now.
console.log(Date.now()); // 1644493215924

future.setFullYear(2040); // Mon Nov 19 2040 15:23:00 GMT+1100 (Australian Eastern Daylight Time)
console.log(future);

// TOPIC: OPERATIONS WITH DATES

// NOTE: We can do with dates is to do calculations with them. And this works, because whenever we attempt to convert a date to a number, then the result is going to be the timestamp in milliseconds.
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));
console.log(+future);
// NOTE: After the calculation, then we can simply convert these milliseconds back to Days, or to hours, or to whatever we really want.

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// NOTE: If you need really precise calculations, for example, including time changes due to daylight saving changes, and other weird edge cases like that, then you should use a date library like moment.js. And that's a library that's available for free for all JavaScript developers.

// TOPIC: INTERNATIONALIZING NUMBERS (INTL)
const num = 3884764.23;
// NOTE: There are three different options for the style. That's unit, percent or currency. If we have a currency, then the unit is just completely ignored. But we do have to then define the currency.
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

// TOPIC: TIMERS: setTimeout AND setInterval

// setTimeout: simply schedules a function to run after a certain amount of time, and the callback function is only executed once.

// NOTE: When the execution of our code reaches this point, it will simply call the setTimeout function, it will then essentially register this callback function here to be called later. And then the code execution simply continues. And this mechanism is called Asynchronous JavaScript.
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');
// NOTE: We can actually cancel the timer, at least until the delay has actually passed. So before these three seconds here have passed, we can cancel the timeout. We can store the result of the setTimeout function into a variable and then we can use that variable to delete the timer using clearTimeout.
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function () {
  const nowHour = new Date().getHours();
  const nowMinute = new Date().getMinutes();
  const nowSecond = new Date().getSeconds();
  console.log(`${nowHour}:${nowMinute}:${nowSecond}`);
}, 1000);

console.log('first');
setTimeout(() => {
  console.log('second');
}, 0);
console.log('third');
*/
// TOPIC: IMPLEMENTING A COUNTDOWN TIMER
