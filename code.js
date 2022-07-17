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
  const submitBtn = document.querySelector(".submitBtn");

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
      gameFlow.activeChoice.push(e.target.getAttribute("number"));
      gameFlow.roundsCounter--;
      cell.style.pointerEvents = "none";
      gameFlow.check();
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
          console.log("Win");
        }
      }
    } else if (this.roundsCounter === 0) {
      winner.textContent = "It is a draw!";
    }
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

/*const createPlayer = (event) => {
    event.preventDefault();
    //players

    let player1;
    let player2;

    //selectors

    const input1 = document.querySelector("#fname");
    const input2 = document.querySelector("#sname");

    const info = document.querySelector(".info");
    //createPlayers

    if (input1.value == "" || input2.value == "") {
      info.textContent = "Nicknames can't be empty";
      return;
    } else {
      info.textContent = "";
      player1 = players(input1.value, "circle");
      player2 = players(input2.value, "cross");
    }

    input1.value = "";
    input2.value = "";

    return {
      player1,
      player2,
    };
  };*/
//event
//submitBtn.addEventListener("click", createPlayer);
