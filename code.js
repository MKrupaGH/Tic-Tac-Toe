//factory to create players with names and markers
const players = (name, marker) => {
  return { name, marker };
};

//gameboard object - IIFE module
const gameBoard = (() => {
  let choice1 = [];
  let choice2 = [];

  //querySelectors
  const gameboard = document.querySelector(".gameboard");

  //create grid gameboard
  //creating numerable cells in grid with functionality
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    const childSqaure = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("number", i);
    cell.appendChild(childSqaure);
    cell.addEventListener("click", (e) => {
      console.log(gameFlow.activePlayer);
      childSqaure.classList.add(gameFlow.activePlayer.marker);
      cell.appendChild(childSqaure);
      gameFlow.activeChoice.push(Number(e.target.getAttribute("number")));
      gameFlow.roundsCounter--;
      cell.style.pointerEvents = "none";
      gameFlow.check();
      if (gameFlow.roundsCounter === 0) return;
      gameFlow.nextPlayer();
    });
    gameboard.appendChild(cell);
  }

  return {
    choice1,
    choice2,
  };
})();

const gameFlow = (() => {
  //creating players
  const player1 = players("Player1", "circle");
  const player2 = players("Player2", "cross");
  //starting
  let activePlayer = player1;
  let roundsCounter = 9;
  let activeChoice = gameBoard.choice1;
  //selectors
  const winner = document.querySelector(".winner");
  const player1turn = document.querySelector(".player1");
  const player2turn = document.querySelector(".player2");
  const playerInfo = document.querySelector(".player");
  //winning combinations
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const check = function () {
    if (this.activeChoice.length >= 3) {
      for (let i = 0; i < combinations.length; i++) {
        let addArr = [...combinations[i]];
        if (addArr.every((ele) => this.activeChoice.includes(ele))) {
          winner.textContent = "The winner is: " + this.activePlayer.name;
          matchInfo();
        }
      }
    }
    if (this.roundsCounter === 0) {
      winner.textContent = "It is a draw!";
      matchInfo();
    }
  };

  const matchInfo = function () {
    playerInfo.classList.add("restart");
    const cells = document.querySelectorAll(".cell");
    cells.forEach((el) => (el.style.pointerEvents = "none"));

    const btn = document.querySelector("button");
    btn.classList.remove("restart");
    btn.addEventListener("click", () => {
      document.location.reload();
    });
  };

  const nextPlayer = function () {
    if (this.activePlayer === player1) {
      //console.log("Im working");
      this.activePlayer = player2;
      //console.log(activePlayer);
      this.activeChoice = gameBoard.choice2;
      player2turn.classList.add("activePlayer");
      player1turn.classList.remove("activePlayer");
    } else if (this.activePlayer === player2) {
      //console.log("Im working too");
      this.activePlayer = player1;
      //console.log(activePlayer);
      this.activeChoice = gameBoard.choice1;
      player2turn.classList.remove("activePlayer");
      player1turn.classList.add("activePlayer");
    }
  };

  return {
    activePlayer,
    nextPlayer,
    check,
    roundsCounter,
    activeChoice,
  };
})();
