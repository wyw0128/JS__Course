'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

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
/*
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
*/

// TOPIC: SETS

// NOTE: Sets are iterables, and it helps to ignores the duplicate values.

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);
