const hangManImage = document.querySelector(".hangMan-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
let maxGuessCount = 6;

const resetGame = () => {
  // Ressetting all game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangManImage.src = `./images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuessCount}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("Show");
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
};

const getRandomWord = () => {
  // Selecting a Random word and hint the wordList
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text p").innerHTML = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  resetGame();
};

const gameOver = (isVictory) => {
  // After 600ms of Game complete... showing modal with relevant details
  setTimeout(() => {
    const modalText = isVictory ? `You Found The Word` : `The Correct Word Was`;
    gameModal.querySelector("img").src = `./images/${
      isVictory ? `Victory` : `Lost`
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? `Congrats!` : `Game Over!`
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("Show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  // Checking if ClickedLetter is exist or the currentWord
  if (currentWord.includes(clickedLetter)) {
    // Showing all correct letters on the word
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangManImage.src = `./images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuessCount}`;

  // Calling game Over function if any of these condition meets
  if (wrongGuessCount === maxGuessCount) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating Keyboard Button and adding event listener
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
