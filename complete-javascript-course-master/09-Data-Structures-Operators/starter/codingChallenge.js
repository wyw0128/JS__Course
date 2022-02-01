'use strict';

// TOPIC: Challenge 1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
/*
// 1.
const [players1, players2] = game.players;
console.log(players1, players2);
// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
// 5.
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

// NOTE: Jonas's code:
const {
  // odds here cannot be access because it is just a temporary variable.
  odds: { team1, x: draw, team2 }, 
} = game;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {
  console.log(players);
  console.log(players.length);
};
printGoals(...allPlayers);
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);
// 7.
// NOTE: Jonas's code:
team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');

// TOPIC: Challenge 2:

// 1.
const entries1 = game.scored.entries();
// console.log(...entries);
for (const [index, value] of entries1) {
  console.log(`Goal ${index + 1}: ${value}`);
}

// 2.
const entries2 = Object.entries(game.odds);
// // console.log(entries2);
// let sum = 0;
// let arrayLength = 0;
// for (const [team, value] of entries2) {
//   console.log(team, value);
//   arrayLength += 1;
//   sum += value;
// }
// console.log(sum / arrayLength);

// NOTE: Jonas's code:

const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

// 3. FIXME:

for (const [key, value] of entries2) {
  const teamName = game[key];
  console.log(
    `Odd of ${teamName ? 'victory ' : ''}${teamName ?? 'draw'}: ${value}`
  );
}

// NOTE: Jonas's code:

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

// 4. FIXME: How to calculate duplicate values in arrays and create an object to store the key value pair.

// const scorers = {};
// for (const x of game.scored) {
//   scorers[x] ? scorers[x]++ : (scorers[x] = 1);
// }
// // NOTE: You can add properties to object by the following ways:

// scorers['Notail'] = 5;
// scorers.Daisy = 7;

// console.log(scorers);

// NOTE: Jonas's code:

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

// TOPIC: Challenge 3

const gameEvent = new Map([
  [17, '⚽️ GOAL'],
  [36, 'Substitution'],
  [47, '⚽️ GOAL'],
  [61, 'Substitution'],
  [64, '🟡 Yellow card'],
  [69, '🔴 Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🟡 Yellow card'],
]);

// 1.
// const events = new Set([...gameEvent.values()]);
// console.log(events);

//  NOTE: Jonas's code:
const events = [...new Set(gameEvent.values())];
console.log(events);

// 2.
gameEvent.delete(64);
console.log(gameEvent);

// 3.
// console.log(
//   `An event happened, on average, every ${90 / gameEvent.size} minutes`
// );

// NOTE: array.pop() does not only delete the last value from current array, it also return the value.

const time = [...gameEvent.keys()].pop();
console.log(time);

console.log(
  `An event happened, on average, every ${time / gameEvent.size} minutes`
);

// 4.
// for (const [key, value] of [...gameEvent]) {
//   console.log(
//     `${key < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
//   );
// }

// NOTE: Jonas's code:

for (const [min, event] of gameEvent) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}

// TOPIC: Challenge 4 (Overall Exercise)
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  console.log(rows);

  // for (const x of rows) {
  //   const [firstWord, secondWord] = x.split('_');
  //   console.log(
  //     firstWord.toLowerCase().trim() +
  //       secondWord[0].toUpperCase() +
  //       secondWord.slice(1).toLowerCase()
  //   );
  // }

  // NOTE: Jonas's code:
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/
