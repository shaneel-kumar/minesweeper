import { Coords } from './modules/globalTypes.js';
import Gameboard from './modules/gameboard.js'

const uiBoard = document.querySelector('.gameGrid') as Element

const gameboard = Gameboard({
  width: 10, 
  height: 5,
  uiBoard
})

let board = gameboard.state

const click: Coords = {row: 0, col: 0}

function updateEmptySquare({row, col}: Coords) {

  if (board[row][col] === 'M') {
    board[row][col] = 'X'
    console.log('Game over!')
  } else {
    // Calculate the number of adjacent mines
    let adjacentMines = 0
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if ((row + x) < 0 || (row + x) > board.length - 1) continue
        if (col + y < 0 || col + y > board[0].length - 1) continue
        if (board[row + x][col + y] === 'M') adjacentMines += 1
      }
    }
    
    // If no adjacent mines, make tile blank
    if (adjacentMines == 0) {
      board[row][col] = 'B'
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (x === 0 && y === 0) continue
          if ((row + x) < 0 || (row + x) > board.length - 1) continue
          if ((col + y) < 0 || (col + y) > board[0].length - 1) continue
          if (board[row + x][col + y] !== 'E') continue
          updateEmptySquare({row: row + x, col: col + y})
        }
      }
    } else {
      board[row][col] = adjacentMines.toString()
    }
  }
}

updateEmptySquare(click)
console.table(board)