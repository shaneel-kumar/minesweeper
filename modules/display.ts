function Display() {
  const uiBoard = document.querySelector('.gameGrid') as Element
  
  function createGrid({width, height}: BoardDimensions) {
    clearGrid()
    for (let i = 0; i < height; i++) {
      const row = document.createElement('div')
      row.classList.add('gridRow')
      for (let j = 0; j < width; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute('data-x', i.toString())
        cell.setAttribute('data-y', j.toString())
        row.appendChild(cell)
      }
      uiBoard.appendChild(row)
    }
  }

  function clearGrid() {
    while (uiBoard.firstChild) {
      uiBoard.removeChild(uiBoard.firstChild)
    }
  }

  function updateGrid(state: State) {
    state.forEach((row, xIndex) => {
      row.forEach((cell, yIndex) => {
        const uiCell = document.querySelector(`[data-x='${xIndex}'][data-y='${yIndex}']`) as HTMLDivElement
        if (cell === 'E' || cell === 'M') return
        if (cell === 'B') return uiCell?.classList.add('blank')
        if (cell === 'X') return uiCell?.classList.add('mine')
        return uiCell.innerText = cell
      })
    })
  }

  return {
    uiBoard,
    createGrid,
    updateGrid
  }
}

export default Display