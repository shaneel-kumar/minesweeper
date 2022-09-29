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

  return {
    uiBoard,
    createGrid
  }
}

export default Display