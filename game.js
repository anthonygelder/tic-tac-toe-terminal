const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function askName() {
//     rl.question('Please input your name\n', (answer) => {
//         console.log(`Hello ${answer}!`);
//         rl.close();
//     });
// }

// askName();



// Board

class Board {
  constructor() {
    this.grid = [["_","_","_"], 
                 ["_","_","_"], 
                 ["_","_","_"]]
  }

  mark(mark, x, y) {
    // check if input is within bounds
    if(x > 2 || y > 2 || x < 0 || y < 0) {
      console.log('invalid move')
      return false
    }

    if(this.grid[x][y] === "_") {
      this.grid[x][y] = mark
      return true;
    }  else {
      console.log("move taken");
      return false
    }
    return false;
  } 

  // display 
  display() {
    console.log(this.grid[0])
    console.log(this.grid[1])
    console.log(this.grid[2])
  }
  
  // clear
  clear() {
        this.grid = [["_","_","_"], 
                    ["_","_","_"], 
                    ["_","_","_"]]
  }

  checkForWinner(mark) {
    let winningMoves = [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ]

    // for(let i = 0; i < winningMoves.length; i++) {
    //   let x, y = winningMoves[i]
    //   let winning = true;
    //   for (let  = 0; j < 3; j++) {
    //     if (this.grid[i][j] !== mark) {
    //       winning = false;
    //     }
    //   }
    //   return winning;
    // }
    
 

    console.log('no winners here');
  }
}

// Game

class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayerIndex = 0;
    this.winner = false;
    this.moveCount = 0;
  }

  newGame() {
    this.board.clear()
    this.announcePlayer();
    this.promptPlayer();
    // announceWinner();
    // promptNewGame();
  }

  newTurn() {
    this.moveCount++;
    this.swapPlayer()
    this.announcePlayer()
    this.promptPlayer()
  }

  repeatTurn() {
    this.announcePlayer()
    this.promptPlayer()
  }

  swapPlayer() {
    this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 0 : 1;
    
  }

  announcePlayer() {
    console.log(`Current player is Player ${this.currentPlayerIndex + 1}`)
  }

  promptPlayer() {
    let currentMark = this.players[this.currentPlayerIndex].mark
    let moveValid = false;
    this.board.display();
    rl.question('Enter coordinates ', (answer) => {
        let [x, y] = answer.split(',').map(num => parseInt(num));
        if (!this.board.mark(currentMark, x,y)) {
          this.repeatTurn();
        } else {
          this.newTurn();
          if (this.moveCount >= 5) {
            this.winner = this.board.checkForWinner(currentMark);
          }
        };
    });
  }

  checkForWinner() {
    if (this.board.checkForWinner()) {
      // the winner is the current player
    };
  }

}


const game = new Game()
game.newGame()

// user should be able restart or clear board
// user should be able to win 

// Users should be able to place a piece on the board.

// Users should be able to see the board update after making a move.

// Start a New Game.
// Display the Empty Board.
// Announce current player is X.
// Prompt user to place a piece.
// Display the board after piece is placed.
// Announce current player is O.