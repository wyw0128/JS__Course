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
*/
