interface Gameboard {
  width: number;
  height: number;
}

const UIBoard = document.querySelector('.gameGrid')

function gameboard({width, height}: Gameboard) {
  const state: string[][] = []

  createBoard()

  function createBoard() {
    for (let i=0; i<height; i++) {
      const row = document.createElement('div')
      row.classList.add('gridRow')
      for (let j=0; j<width; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        row.appendChild(cell)
      }
      UIBoard?.appendChild(row)
    }
  }

  return {
    state
  }
}

export default gameboard