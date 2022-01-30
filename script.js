"use strict";

// Selecting elements
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const dice = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

// initial condition
let scores, currentScore, activePlayer, playing;

function init() {
  // Resetting everything
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");

  player1.classList.remove("player--active");
  player0.classList.add("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
}
init();

// Switch player functionality
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

// Dice roll functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // displaying random dice roll
    dice.classList.remove("hidden");
    dice.src = `images/dice-${diceRoll}.png`;

    // Check if it's a 1
    if (diceRoll !== 1) {
      // if not 1
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if 1
      switchPlayer();
    }
  }
});

// Button hold functionalitu
btnHold.addEventListener("click", function () {
  if (playing) {
    // add dice roll to current score
    scores[activePlayer] += currentScore;

    // Display new score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is more than 100. Player with 100 score first is winner
    if (scores[activePlayer] >= 100) {
      // Adding style to winner block  to signify the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      // Hide the dice
      dice.classList.add("hidden");

      // Game is over becaus winner is available
      playing = false;
    } else {
      // If the score isn' 100 yet, then switch player
      switchPlayer();
    }
  }
});

// Button new game functionality
btnNewGame.addEventListener("click", init);
