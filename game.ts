import Gameboard from './modules/gameboard.js'

const uiBoard = document.querySelector('.gameGrid') as Element

const gameboard = Gameboard({
  width: 10, 
  height: 5
})

let board = gameboard.state