// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
// DATE: 12/01/2022

// TOPIC: SETTING UP PRETTIER AND VS CODE
const x = 23;

const calcAge = birthYear => 2037 - birthYear;

// NOTE: We can change the prettier as we want by creating a new file, eg. prettierrc and search prettier options to check the name of what you want to change.

// NOTE: We can set up our own snippets in code -> preference -> user snippets. We can create a new snippet file or add new ones in existing file.

console.log(calcAge(1991));

// TOPIC: INSTALLING NODE.JS AND SETTING UP A NEW ENVIRONMENT

// NOTE: Live server(extension);

// NOTE: Node.js

// We can install Node.js in our computer and then open terminal in vs code (vs code has its own terminal), then hit -> sudo npm install live-server -g; then hit -> liver-server.

// TOPIC: LEARNING HOW TO CODE

// NOTE: codewars: different skill level of code challenges

// TOPIC: HOW TO THINK LIKE A DEVELOPER: BECOME A PROBLEM SOLVER

// NOTE: We can do some research through the following websites: google, stack overflow, MDN web docs.

// NOTE: We can first write pseudo-code: code that not written for the computer but for human to read.

// TOPIC: USING GOOGLE, STACKOVERFLOW AND MDN

// Problem 1

// Calculate the amplitude of the array following and ignore error.
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

// NOTE: How to calculate the max and min in an array

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// Problem 2

// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// Merge 2 arrays

// NOTE: How to merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

// TOPIC: DEBUGGING WITH THE CONSOLE AND BREAKPOINTS

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // C) Fix
    // value: Number(prompt('Degrees celsius')), // NOTE: prompt always returns a string.
    value: 10,
  };

  // B) Find
  console.table(measurement);

  // console.log(measurement.value);

  //NOTE: With console.warn and console.error, we can generate warnings and errors in the console.
  // console.warn(measurement.value);
  // console.error(measurement.value);
  const kelvin = measurement.value + 273;
  return kelvin;
};

// A) Identify
console.log(measureKelvin());

// NOTE: Use Debugger in google chrome: go to sources -> script.js -> click left point of the line to create a break point.

const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    // NOTE: You can write debugger here in javaScript and it will recognize this and open source automatically.
    // debugger;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) Identify
console.log(amplitudeBug);
*/
