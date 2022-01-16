'use strict';

// DATE: 14/01/2022

// NOTE: We normally select all the element we need and store them into variables, so we can use them over again.

const modal = document.querySelector('.modal');
console.log(modal);
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// NOTE: modal is a variable here as we saved before, and it contains the div elements that attached a hidden class. And we want to remove that class now using classList.

// NOTE: classList is a DOM property of JavaScript that allows for styling the CSS (Cascading Style Sheet) classes of an element. JavaScript classList is a read-only property that returns the names of the CSS classes.

// NOTE: We don't need to write the dot here.

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// NOTE: The limitation of querySelector is when we use querySelector with a selector which matches multiple elements, only the first one will be selected. So we can use querySelectorAll.

const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

// NOTE: NodeList is like an array, and we can attach to each of the content by using for loop like what we used to arrays.

// NOTE: If there is only one line to execute, we don't need to create block {}, so that's the one that will be iterated over and over again.

for (let i = 0; i < btnsOpenModal.length; i++)
  // NOTE: We can attach the text content through .textContent
  // console.log(btnsOpenModal[i].textContent);

  btnsOpenModal[i].addEventListener('click', openModal);

// NOTE: We don't write () after the function because it will executed immediately when the code is executed to this line. We want to close modal function to be executed only as soon as the click event happens on the closeModal button.

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// NOTE: if you want to use the same function in multiple event listeners, then you need to specify that function as a separate function, like this one here (openModal, closeModal). And then you can pass that function as an argument to multiple "add event listener" methods.

// NOTE: We really, in practice, use the functionality of adding and removing classes all the time in order to change the appearance of elements on our page. And that's because classes allow us to basically aggregate multiple CSS properties in just one, like a container. So each class functions a bit like a container with a lot of properties in it. And then here, by adding and removing them, we basically can activate and deactivate certain styles, all at the same time.

// NOTE: It's important to learn how to respond to keyboard events, which are global events because they do not happen on one specific element. We usually list and on the whole document.

// NOTE: There are three types of events for the keyboard: key down, key press or key up.

// NOTE: When an event happened, we can have access to information about that event in the event handler function just like the following one.

// NOTE: When JavaScript call the function, if we add parameters to the function, it also pass in the event object as an argument.

document.addEventListener('keydown', function (e) {
  // console.log('A key was pressed.');
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
