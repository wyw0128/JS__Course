'use strict';
/*
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(40);
  console.log(output);
}

// Data needed for first part of the section

// TOPIC:  Enhanced object literals

// NOTE: The third enhancement is that we can now actually compute property names instead of having to write them out manually and literally.

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // [`day-${2 + 4}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // NOTE: The first enhancement is that if you already declared the object outside one object, you don't need to type all the content, just write the object name you declared before.

  openingHours,

  // NOTE: The second enhancement is that you don't need to write function keyword to write a method.

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
    console.log(
      // FIXME: Why it console log out the separate value in the string.
      // NOTE: const x = { name: 'jonas', age: 25,}; console.log(x); // objects cannot be converted to string. However, array can be converted to string.
      `Your pizza is made by main ingredient(s) like ${mainIngredient} and other ingredients like ${otherIngredients}`
    );
  },
};

// TOPIC: OPTIONAL CHAINING (?.) (Important)

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//With optional chaining (?.)

// NOTE: Only if the property before this question mark exists, then this open property will be read from there.

// console.log(restaurant.openingHours.mon.open);

// NOTE: Here this next operation of trying to read open only happens if all of this here actually exists. So if it's not null and not undefined. But if it is undefined or null, then the result will be undefined immediately.

console.log(restaurant.openingHours.mon?.open); // undefined
console.log(restaurant.openingHours?.mon?.open); // undefined

// Example

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Method

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays

// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
const users = ['', { name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty');
// const users = [];

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole,21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole,21',
  starterIndex: 1,
});

// TOPIC: DESTRUCTURING OBJECTS

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// NOTE: If you want to rename the properties' names, first use the original object property name, then followed by : and new name.

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// NOTE: Default Value

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// NOTE: Mutating variables

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// NOTE: Nested Object Destructuring

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// TOPIC: DESTRUCTURING ARRAYS

// NOTE: EX6 Feature: Destructuring is to break a complex data structure down into a smaller data structure like a variable.

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// NOTE: Destructing the array from arr, it looks like array, but it is just the destructuring assignment.

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

// NOTE: If we only need to take this and this, we just skip the element in the middle.

let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian

// NOTE: Switching variables without destructuring:
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// With destructuring:
[main, secondary] = [secondary, main];
console.log(main, secondary);

// NOTE: Receive 2 return values from a function

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]]; // Nested array means there is other arrays inside an array.
// const [i, , j] = nested;
// console.log(i, j); // 2,[5,6]

// NOTE: How can we get separate values, we need to do NESTED DESTRUCTURING, that is destructuring inside destructuring.

const [i, , [j, k]] = nested;
console.log(i, j, k); // 2,5,6

// NOTE: Default Values
// It sometimes can be useful when we get data from an API.
const [p, q, r] = [8, 9];
console.log(p, q, r); // 8,9,undefined
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8,9,1
const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r); // 8,1,1


// TOPIC: THE SPREAD OPERATE

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// NOTE: With ..., it sames like taking all the elements out from the arr manually into the new array.

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

//NOTE: By using [], we are actually creating a new array, not manipulating the original array.

// NOTE: The big difference is that the spread operator takes all the elements from the array and it also doesn't create new variables. And as a consequence, we can only use it in places where we would otherwise write values separated by commas.

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
console.log(...newMenu);

// NOTE: Copy array
// shallow copy
const mainMenuCopy = [...restaurant.mainMenu];

// NOTE: Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// iterables: arrays, strings, maps, sets. Not object

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
const strCopy = [...str];
console.log(letters); // ['J','o','n','a','s',' ','S.']
console.log(...str); // J o n a s  S.
console.log(strCopy); // ['J', 'o', 'n', 'a', 's']

// NOTE: This is not a place that expects multiple values separated by a comma. So you see unexpected token, all right? So again, multiple values separated by a comma are usually only expected when we pass arguments into a function, or when we build a new array.

// console.log(`${...str} Schmedtmann`);

const ingredients = [
  //   prompt("Let's make pasta! Ingredient 1?"),
  //   prompt('Ingredient 2?"'),
  //   prompt('Ingredient 3?'),
];
console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// NOTE: ES2018 specifies that spread operator can also works on objects, even though objects are not iterables.

//objects
const newRestaurant = { foundIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// Real world case

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano

// TOPIC: REST PATTERN AND PARAMETERS

// NOTE: We used the spread operator to build new arrays or to pass multiple values into a function. In both cases, we use the spread operator to expand an array into individual elements.

const arr = [1, 2, ...[3, 4]];

// NOTE: REST syntax, because on LEFT side of =

// NOTE: the first and the second elements become this first and second variables, but then here comes the rest pattern and so it's called rest because it will take the rest of the elements. So the remaining elements of the array and then put them into a new array and in this case, we call this array others.

const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
console.log(others); // [3,4,5]

// NOTE: Rest Pattern does not include any skipped elements, and it must be last element.

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // fri:{}, thu:{}

// Functions

// NOTE: The rest syntax is taking multiple numbers or multiple values and then packs them all into one array. It does the opposite of the spread operator.

// Rest argument
const add = function (...numbers) {
  // console.log(numbers); // It generally input the array parameter into the function.
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

// NOTE: It means we can not only accept parameters like array and numbers like above by using rest parameter.
const x = [23, 5, 7];
add(...x);
console.log(x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

// TOPIC: SHORT CIRCUITING (&& AND ||)

console.log('------OR------');
// NOTE: Use ANY data type, return ANY data type, short-circuiting

// NOTE: If the first operand is truthy here in the OR operator, then the other operand will not even be evaluated. So JavaScript will not even take a look at it.And so that's what we mean with short circuiting.

console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// Practical example:

// FIXME: If we set the default value as 0, OR operator cannot be used because 0 is a falsy value.

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('------AND------');

// NOTE: The AND operator works in the exact opposite way of the OR operator. the AND operator short circuits, when the first value is falsy. And then immediately returns that falsy value without even evaluating the second operand.

// NOTE: The AND operator is only true if all the operands are true. And so, if the first one here is false, then it means that the entire result of the AND operation will already be false anyway.

console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

//Practical example

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// NOTE: the OR operator will return the first truthy value of all the operands, or simply the last value if all of them are falsy. The AND operator will return the first falsy value or the last value if all of them are truthy.

// NOTE: And as for practical applications, we can use the OR operator to set default values, and we can use the AND operator to execute code in the second operand if the first one is true.

// TOPIC: THE NULLISH COALESCING OPERATOR (??) (ES2020)

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// NOTE: Nullish: null and undefined (NOT 0 or '')

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// TOPIC: LOGICAL ASSIGNMENT OPERATORS (ES2021)

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};
// NOTE: OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NOTE: Nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10; // rest2.numGuests is undefined

// NOTE: AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>'; // undefined
// rest2.owner = rest2.owner && '<ANONYMOUS>'; // '<ANONYMOUS>'

// NOTE: What the logical and assignment operator does is to assign a value to a variable if it is currently truthy.

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>'; // '<ANONYMOUS>'

console.log(rest1);
console.log(rest2);

// const x = {
//   name: 'Notail',
//   age: 29,
// };

// x.family = ['daisy', 'jonathan', 'smith'];
// console.log(x); //{name: 'Notail', age: 29, family: Array(3)}

// const y = [25, 34, 57];
// y[3] = 34;
// console.log(y); // [25, 34, 57, 34]

// TOPIC: LOOPING ARRAYS: THE FOR-OF LOOP

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// NOTE: This loop will automatically loop over the entire array and in each iteration, it will give us access to the current array element, which we can specify here.

for (const item of menu) {
  console.log(item);
}

// NOTE: We can still use the continue and break keywords.

// NOTE: By using entries, we can get both the index and each element of the array.

for (const [index, item] of menu.entries()) {
  console.log(index, item);
}

// NOTE: Menu.entries will create arrays and contain that arrays inside an iterator.

console.log([...menu.entries()], menu.entries()); // [array[2], array[2], ...] Array Iterator {}

// NOTE: We can destruct the menu.entries

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// TOPIC: LOOPING OBJECTS: OBJECT KEYS, VALUES, AND ENTRIES

// NOTE: We learned about the for of loop to loop over a race, which remember is an Iterable, but we can also loop over objects, which are not Iterable, but in an indirect way.

// NOTE: Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr);

// NOTE: Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object

// NOTE: It works differently on objects because it's not going to be a method that we call on the object itself.

const entries = Object.entries(openingHours);
console.log(entries);

// NOTE: [Key, Value]
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// TOPIC: SETS

// NOTE: Sets are iterables, and it helps to ignores the duplicate values.

// NOTE: Sets are different from arrays, first, because its elements are unique. And second, because the order of elements in the set is irrelevant.

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);

console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// NOTE: Because in sets there are actually no indexes. And in fact, there is no way of getting values out of a set.

// NOTE: There's no need for getting values out of a set, because if you need it, then you will just use an array.

console.log(ordersSet[0]); // undefined
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// NOTE: To convert sets into arrays
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
console.log(new Set('Daisy Wu').size);

// NOTE: Sets are not intended to replace arrays at all. So whenever you need to store values in order, and that might contain duplicates, always just use arrays. That's also true when you need to really manipulate data, because arrays have access to a lot of great array methods.

// TOPIC: MAPS: FUNDAMENTALS

// NOTE: Maps are iterables, so the for loop is available for them.

// NOTE: A map is a data structure that we can use to map values to keys. So, just like an object, data is stored in key value pairs in maps. Now, the big difference between objects and maps is that in maps, the keys can have any type and this can be huge.

// NOTE: How Maps solve the limitations of Objects in JavaScript: https://javascript.plainenglish.io/how-maps-make-up-for-limitations-of-objects-in-javascript-6c71f6e61af0

const rest = new Map();
rest.set('name', 'Classico Italino');
rest.set(1, 'Firenze Italy');

// NOTE: Calling the set method like this does not only update the map that it's called on, but it also returns the map.

console.log(rest.set(2, 'Lisbon Portugal'));

// NOTE: Calling the set method returns the updated map.

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :)')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get('open'));
console.log(rest.get(true));
console.log(rest.get('1')); // undefined
console.log(rest.get(1));

// Example

// NOTE: Don't overuse this kind of pattern.

const time = 24;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// NOTE: Check if the map has the certain key.

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const arr = [1, 2];
rest.set(arr, 'Test');

rest.set(document.querySelector('h1'), 'heading');
console.log(rest);
console.log(rest.size);

// NOTE: This cannot work because the following array is not the same array as the previous declared one.

// NOTE: They are not the same object in the heap. And, the key is exactly the first object in memory,

console.log(rest.get(arr));

// TOPIC: MAPS: ITERATION

// NOTE: Because the set method is a bit cumbersome when there are a lot of values to set.

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// NOTE: Convert object to map

console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(answer === question.get('correct')));

// NOTE: Convert map to array

console.log([...question]);

// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

// TOPIC: WORKING WITH STRINGS - PART 1

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

// NOTE: Strings are also have methods, like arrays, for example, for indexOf, we can get the position in which a certain letter is in the string. Strings are also 0 based.

console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10

// NOTE: This is case sensitive, if you search portugal, you will get -1, which means does not exist.

console.log(airline.indexOf('Portugal'));

// NOTE: One good use case is to extract part of a string using the slice method and a slice method needs indexes as arguments.

// NOTE: This is only substring, this does not change the underlying string. That's because it's actually impossible to mutate strings. They are primitives.

// NOTE: In JavaScript, the primitive type values are immutable.

console.log(airline.slice(4)); // Air Portugal

// NOTE: It stops extracting before reaching index number seven. The length of the extracted string is always going to be end minus beginning.

console.log(airline.slice(4, 7)); // Air

console.log(airline.slice(0, airline.indexOf(' '))); // TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

// NOTE: Actually start extracting from the end. Including the first index but excluding the second index.

console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  //  B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 🥵');
  else console.log('You got lucky 😄');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// NOTE: Why does string have method? Whenever we call a method on a string, JavaScript will automatically behind the scenes convert that string primitive to a string object with the same content. And then it's on that object where the methods are called. All right and this process is called boxing because it basically takes our string and puts it into a box which is the object.

// NOTE: JavaScript will call this string function whenever we call a method on a string.

console.log(new String('jonas'));
console.log(typeof new String('jonas')); // object

// NOTE: And then when the operation is done the object is converted back to a regular string primitive. And in fact all string methods return primitives. Even if called on a string object.

console.log(typeof new String('jonas').slice(1)); // string

// TOPIC: WORKING WITH STRINGS - PART 2

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log('jonas'.toUpperCase());

// NOTE: Fix capitalization in name
const passenger = 'jOnAS'; // Jonas

const correctPassengerName = function (passengerName) {
  const passengerLower = passengerName.toLowerCase();
  return passengerLower[0].toUpperCase() + passengerLower.slice(1);
};

console.log(correctPassengerName(passenger));

// NOTE: Comparing email
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io  \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);

// console.log(email === normalizedEmail);

// NOTE: .trim can help remove the spaces and returns.
const compareEmail = function (email, loginEmail) {
  const normalizedEmail = loginEmail.toLowerCase().trim();
  return email === normalizedEmail;
};

console.log(compareEmail(email, loginEmail));

// NOTE: Replace part of strings
const priceGB = '288,97$';
const priceUS = priceGB.replace('$', '@').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

// NOTE: Replace and ReplaceAll
console.log(announcement.replace('door', 'gate')); //All passengers come to boarding gate 23. Boarding door 23!
console.log(announcement.replaceAll('door', 'gate')); //All passengers come to boarding gate 23. Boarding door 23!

// NOTE: Regular expression to solve that replace can not replace all of the target string.
console.log(announcement.replaceAll(/door/g, 'gate'));

// NOTE: Booleans
const plane2 = 'Airbus A320';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Airb'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW AIRBUS family.');
}

// Practice exercise

// NOTE: Normally, when we receive inputs from users, we usually always start by putting everything into lower case.

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed in board');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop, some food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// TOPIC: WORKING WITH STRINGS - PART 3

// Split and join
// NOTE: It will split up this string by this plus sign and it will then store the results into elements of a new array.

console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtman'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtman'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // Mr. Jonas SCHMEDTMAN

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// NOTE: Padding strings: padding a string means to add a number of characters to the string until the string has a certain desired length.

// NOTE: The first number of PadStart means the total length of the string, including the target string(message) length, the first number of padEnd is the total length of the string.
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+')); // ++++++Go to gate 23!++++++++++
console.log('Jonas'.padStart(20, '+').padEnd(30, '+')); // +++++++++++++++Jonas++++++++++

const maskCreditCard = function (number) {
  // NOTE: when one of the operands of the plus sign is a string it will convert all the operands to a string.
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(43378462837384892));
console.log(maskCreditCard(3423342));
console.log(maskCreditCard('23243935893842898892'));

// NOTE: Repeat

const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛫'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(10);
*/
