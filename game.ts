import Gameboard from './modules/gameboard.js'
import Display from './modules/display.js'

const width = 10
const height = 5

const gameboard = Gameboard({ width, height })
const display = Display( {width, height} )

let board = gameboard.state