'use strict';
/*
// TOPIC: Challenge 1

let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogs1, dogs2) {
  // const dogs1Corrected = dogs1.slice(1, -2);
  // NOTE: Jonas's code:
  const dogs1Corrected = dogs1.slice();
  dogs1Corrected.splice(0, 1);
  dogs1Corrected.splice(-2);
  const dogs = dogs1Corrected.concat(dogs2);
  console.log(dogs);
  // const dogs = [...dogs1Corrected, ...dogs2];
  dogs.forEach(function (dogs, i) {
    dogs < 4
      ? console.log(`Dog number ${i + 1} is still a puppy 🐶`)
      : console.log(
          `Dog number ${i + 1} is an adult, and is ${dogs} years old`
        );
  });
};
dogsJulia = [9, 16, 6, 8, 3];
dogsKate = [10, 5, 6, 1, 4];
checkDogs(dogsJulia, dogsKate);

// TOPIC: Challenge 2

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(ages => (ages <= 2 ? ages * 2 : 16 + ages * 4));
  const adults = humanAge.filter(ages => ages >= 18);
  const averageHumanAge = adults.reduce(
    (acc, ages, i, arr) => acc + ages / arr.length,
    0
  );
  // NOTE: Another way calculating average:
  // 2 3; (2 + 3) / 2 = 2.5; === 2 / 2 + 3 / 2 = 2.5;
  return averageHumanAge;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1);
console.log(avg2);

// TOPIC: Challenge 3

const calcAverageHumanAge = ages =>
  ages
    .map(ages => (ages <= 2 ? ages * 2 : 16 + ages * 4))
    .filter((ages, i, arr) => ages >= 18)
    .reduce((acc, ages, i, arr) => acc + ages / arr.length, 0);
// NOTE: Another way calculating average:
// 2 3; (2 + 3) / 2 = 2.5; === 2 / 2 + 3 / 2 = 2.5;
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1);
console.log(avg2);

// TOPIC: Challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.

dogs.forEach(dog => {
  const recommendedFood = dog.weight ** 0.75 * 28;
  dog.recommendedFood = recommendedFood;
});
// NOTE: Jonas's code:
// NOTE: The Math.trunc() function returns the integer part of a number by removing any fractional digits.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
// const NumOwnerExist = dogs
//   .map(dog => dog.owners)
//   .findIndex(owner => owner.includes('Sarah'));
// const recommendedPortion = dogs[NumOwnerExist].recommendedFood * 0.1;
// if (
//   dogs[NumOwnerExist].curFood >
//   dogs[NumOwnerExist].recommendedFood + recommendedPortion
// ) {
//   console.log('Eating Too Much!');
// } else if (
//   dogs[NumOwnerExist].curFood <
//   dogs[NumOwnerExist].recommendedFood - recommendedPortion
// ) {
//   console.log('Eating Too Little');
// }

// NOTE: Jonas's code:
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3.
// console.log(dogs.flatMap(dog => dog.owners));

// curFood > recommendedFood * 1.1 -- Eating too much
// curFood < recommendedFood * 0.9 -- Eating too little

const isEatingTooMuch = function (recommendedFood, curFood) {
  if (curFood > recommendedFood * 1.1) return 'Eating too much';
  else if (curFood < recommendedFood * 0.9) return 'Eating too little';
  else return 'Eating ok';
};

const ownersEatingTooMuch = dogs
  .filter(
    dog =>
      isEatingTooMuch(dog.recommendedFood, dog.curFood) === 'Eating too much'
  )
  .flatMap(dog => dog.owners);
console.log(ownersEatingTooMuch);

const ownersEatingTooLittle = dogs
  .filter(
    dog =>
      isEatingTooMuch(dog.recommendedFood, dog.curFood) === 'Eating too little'
  )
  .flatMap(dog => dog.owners);
console.log(ownersEatingTooLittle);

// NOTE: Jonas's code:
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatingTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatingTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.recommendedFood === dog.curFood));

// 6.
const dogEatingOkExist = dogs.some(
  dog => isEatingTooMuch(dog.recommendedFood, dog.curFood) === 'Eating ok'
);
console.log(dogEatingOkExist);

// NOTE: Jonas's code:
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
const dogsEatingOk = dogs.filter(
  dog => isEatingTooMuch(dog.recommendedFood, dog.curFood) === 'Eating ok'
);
console.log(dogsEatingOk);

// 8.
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));

// NOTE: Jonas's code:
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/
