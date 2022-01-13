'use strict';
/*
// DATE: 13/01/2022

// TOPIC: HOW TO SELECT A ELEMENT:

// NOTE: We write document.querySelector(), and this querySelector is a method that is available on document object. eg. .message is a selector.

// NOTE: And it is exact SAME selector we use with CSS.
console.log(document.querySelector('.message').textContent);

// TOPIC: WHAT IS DOM AND DOM MANIPULATION

// NOTE: DOM: Document Object Model; allows us to use JavaScript to access HTML elements and styles; connection point between HTML document and JavaScript code; part of web API(Application Programming Interface);

// TOPIC: SELECTING AND MANIPULATING ELEMENTS

document.querySelector('.message').textContent = '🎉 Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// NOTE: To get the actual value with an input field, we use the VALUE property.

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
// TOPIC: HANDLING CLICK EVENTS, IMPLEMENTING THE GAME LOGIC, MANIPULATING CSS STYLES, IMPLEMENTING HIGHSCORES, REFACTORING OUR CODE: THE DRY PRINCIPLE

// NOTE: An event is something happens on that page, eg. mouse click, mouse moving... then we use eventListener to wait for a certain event to happen and then react to it.

// NOTE: We use the addEventListener to attach an event on that element and add the function inside the addEventListener as a event handler. Here, we don't call the function at all, we just define the function, but the JavaScript engine will call the function as soon as the event happens.

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // NOTE: We normally get a string if it is from the user interface, from an input field.
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔️ No number!';

    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');

    document.querySelector('.number').textContent = secretNumber;

    // NOTE: We can change the style in JS as well, by adding .style behind the element we choose, but it should be in camelCase structure. And it is an inline coding without any changes to the original CSS file.

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // NOTE: We should think before add the if statement, because we should figure out when the high score should be refreshed. In this case, it is when the player wins the game.

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      // score--;
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lost the game!';
      displayMessage('💥 You lost the game!');

      document.querySelector('.score').textContent = 0;
    }
  }

  // // When guess is too high
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too high!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  // if (Number(document.querySelector('.highscore').textContent) < score) {
  //   document.querySelector('.highscore').textContent = score;
  // }
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
// NOTE: You can always create a function and call it later to reduce the repetitive code.
