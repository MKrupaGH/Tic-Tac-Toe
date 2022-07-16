//factory to create players with names and markers
const players = (name, marker) => {
  return { name, marker };
};

//gameboard object - IIFE module
const gameBoard = (() => {
  let placeNumber = [];
  let choice1 = [];
  let choice2 = [];
  //querySelectors
  const gameboard = document.querySelector(".gameboard");
  const submitBtn = document.querySelector(".submitBtn");

  //create grid gameboard
  //creating numerable cells in grid
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("number", i);
    cell.addEventListener("click", (e) => {
      console.log(e.target.getAttribute("number"));
    });
    gameboard.appendChild(cell);
    placeNumber.push(i);
  }

  return {
    placeNumber,
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
    if (choice1.length >= 3) {
      for (let i = 0; i < combinations.length; i++) {
        if (combinations[i].every((arr1) => choice1.includes(arr1))) {
          winner.textContent = "The winner is player1!";
        }
      }
    }
    if (choice2.length >= 3) {
      for (let i = 0; i < combinations.length; i++) {
        if (combinations[i].every((arr2) => choice2.includes(arr2))) {
          winner.textContent = "The winner is player2!";
        }
      }
    }
    if (roundsCounter == 0) {
      winner.textContent = "It is a draw!";
    }
  };

  const nextPlayer = function () {
    if (activePlayer === player1) {
      activePlayer = player2;
      player2turn.style.cssText = "color:rgb(255,0,255)";
    } else {
      activePlayer = player1;
      player1turn.style.cssText = "color:rgb(255,0,255)";
    }
  };

  return {
    activePlayer,
    nextPlayer,
    check,
    roundsCounter,
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
