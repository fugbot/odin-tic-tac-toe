// const ticTacToe = (function () {
//     const gameboard = []
// })();

function ticTacToeGameboard() {
    const board = ["X", "X", "X",
                  "", "O", "",
                  "", "O", ""];

    // //create 2d array
    // for(let i=0; i<rows; i++){
    //     board[i] = [];
    //     for(let j=0; j<columns; j++){
    //         board[i].push(Cell());
    //     }
    // }

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
      if(board[index] == ""){
        board[index] = marker;
        return true;
      }
      return false;
    } 

    const printBoard = () => {
      //const boardWithCellValues = board.map((cell) => cell.getValue())
      board.forEach(function(cell) {
        console.log(cell);
      })
    }

    return {getBoard, placeMarker, printBoard};
}

const Player = (name, marker) => {
  return {name, marker}
}


/*
** A Cell represents one "square" on the board and can have one of
** 0: no token is in the square,
** 1: Player One's token,
** 2: Player 2's token
*/

// function Cell() {
//     let value = 0;
  
//     // Accept a player's token to change the value of the cell
//     const addToken = (player) => {
//       value = player;
//     };
  
//     // How we will retrieve the current value of this cell through closure
//     const getValue = () => value;
  
//     return {
//       addToken,
//       getValue
//     };
//   }

function GameController(){
  const player1 = Player("Player 1", "X"); 
  const player2 = Player("Player 2", "O");
  const board = ticTacToeGameboard();

  let activePlayer = player1;
  let isGameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  }

  const playRound = (index) => {
    console.log(`Piece placed by ${getActivePlayer().name}'s token onto index ${index}...`);
    if (isGameOver) return;
    if(ticTacToeGameboard.placeMarker(index, activePlayer.marker)){
      const winner = checkWin();
      if(winner){
        console.log(`Game over: ${winner} is the winner`);
      }else{
        switchPlayerTurn();
      }
    }
    //board.placeMarker(row, column, getActivePlayer().token);
  
    //todo: check for winner here
    checkWin();
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound, 
    getActivePlayer
  }

}

function checkWin(){
  const currentBoard = board.getBoard();
  const winConditions = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
  ]

  for(let condition of winConditions) {
    const [a,b,c] = condition;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      isGameOver = true;
      return activePlayer.name;
    }
    
  }
  if(!board.includes("")) {
    isGameOver = true;
    return "Tie Game";
  }
  return null;
}
const game = GameController();

function DisplayController(){
  const cells = document.querySelectorAll(".cell");

  const updateBoard = () => {
    const board = ticTacToeGameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    })
  }
  const handleClick = (e) => {
    const index = e.target.dataset.index;
    GameController.playRound(index);
    updateBoard();
  }

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);

  })
  return updateBoard;
}
