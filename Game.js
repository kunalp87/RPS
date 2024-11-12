let userScore = 0;
let compScore = 0;
let winScore = 20;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const newGame = document.querySelector(".btn");
const showWin = document.querySelector(".show-win");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was a draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
    msg.style.backgroundColor = "green";
    checkWin();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}.`;
    msg.style.backgroundColor = "red";
    checkWin();
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "scissors";
    } else if (userChoice === "paper") {
      userWin = compChoice === "rock";
    } else {
      userWin = compChoice === "paper";
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

newGame.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  showWin.style.display = "none";
  showWin.style.backgroundColor = ""; // Reset background color
  choices.forEach((choice) => (choice.disabled = false));
});

function checkWin() {
  if (userScore >= winScore) {
    console.log("Congratulations, you win!");
    showWin.style.display = "block";
    showWin.innerHTML = "Congratulations, you win!";
    showWin.style.backgroundColor = "green";
    choices.forEach((choice) => (choice.disabled = true));
  } else if (compScore >= winScore) {
    console.log("You lost the game.");
    showWin.style.display = "block";
    showWin.style.backgroundColor = "red";
    // showWin.style.width = "250px";
    // showWin.style.marginLeft = "30px";
    showWin.innerHTML = "You lost the game. Try again!";
    choices.forEach((choice) => (choice.disabled = true));
  }
}
