'use strict';
/*
// TOPIC: Challenge 1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  // NOTE: Jonas's code:
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.options.length &&
      this.answers[answer]++;

    // console.log(this.answers);
    this.displayResult();
    this.displayResult('string');
  },

  displayResult(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// NOTE: We will have to use the call method, because we will need a new disk keyword, so that we could manually set the disk keyword to a new object.

poll.displayResult.call({ answers: [5, 2, 3] }, 'string');
poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

// +++++++++++++++++++++++++Myself code+++++++++++++++++++++++++++

// const displayResults = function (type = 'array') {
//   if (type === 'string')
//     console.log(`Poll results are ${String(poll.answers)}`);
//   else if (type === 'array') console.log(poll.answers);
// }; 

// poll.registerAnswer = function () {
//   const answer = Number(
//     prompt(
//       `${this.question}\n${String(this.options).replaceAll(
//         ',',
//         '\n'
//       )}\n(Write option number)`
//     )
//   );
//   if (typeof answer === 'number' && answer <= 3) {
//     this.answers[answer]++;
//     // console.log(this.answers);
//   }
//   return displayResults('string');
// };

// const registerNewAnswer = poll.registerAnswer.bind(poll);
// document.querySelector('.poll').addEventListener('click', registerNewAnswer);

// TOPIC: Challenge 2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/
