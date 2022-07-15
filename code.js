const gameBoard = (() => {
  const placeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  //querySelectors
  const gameboard = document.querySelector(".gameboard");

  //create grid gameboard

  for (let i = 0; i < placeNumber.length; i++) {
    const cell = document.createElement("div");
    console.log(cell);
    cell.classList.add("cell");
    cell.style.cssText = "width:100px; height:100px";
    cell.setAttribute("number", i);
    gameboard.appendChild(cell);
  }
  gameboard.style.cssText =
    "display:grid; grid-template: repeat(3,100px)/repeat(3,100px); gap:10px; gap-color";
})();
