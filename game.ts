import Gameboard from './modules/gameboard.js'
import Display from './modules/display.js'

const difficultyButtons = document.querySelectorAll('.diff-btn')

const display = Display()
let {width, height} = gridDimensionsByDifficulty('easy')
let gameboard = Gameboard({ width, height })
display.createGrid({ width, height })
display.uiBoard.addEventListener('click', gameloop)


  Array.from(difficultyButtons).forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement
      const difficulty = target.id.toLowerCase()


      let {width, height} = gridDimensionsByDifficulty(difficulty)
      gameboard = Gameboard({ width, height, difficulty })
      display.createGrid({ width, height })
      display.uiBoard.addEventListener('click', gameloop)
    })
  })

  function gameloop(e: Event) {
    const target = e.target as HTMLElement
    if (!target.classList.contains('cell')) return

    if (gameboard.isGameOver()) {
      display.uiBoard.removeEventListener('click', gameloop)
      return
    }

    const rowData = target.getAttribute('data-x')
    const colData = target.getAttribute('data-y')
    if (rowData && colData) {
      const row = parseInt(rowData)
      const col = parseInt(colData)
      gameboard.updateEmptySquare({row, col})
      display.updateGrid(gameboard.state)
    }
  }

function gridDimensionsByDifficulty(setting: string): 
  {width: number, height: number} {
  if (setting === 'medium') return {width: 10, height: 10}
  if (setting === 'hard') return {width: 20, height: 20}
  return {width: 5, height: 5}
}