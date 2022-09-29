function Gameboard({width, height, difficulty = 'easy'}: BoardDimensions) {
  const state: string[][] = []

  createBoard()
  const click: Coords = {row: 0, col: 0}
  updateEmptySquare(click)
  console.table(state)

  function populateRandomMines() {
    let numberOfMines = (() => {
      if (difficulty === 'medium') return 6
      if (difficulty === 'hard') return 12
      return 3
    })()

    for (let i=0; i<numberOfMines; i++) {
      const availableTiles: Coords[] = []
      state.forEach((row, rowIndex) => {
        row.forEach((item, colIndex) => {
          if (item !== 'E') return
          availableTiles.push({row: rowIndex, col: colIndex})
        })
      })

      const randomIndex = Math.floor(Math.random() * availableTiles.length)
      const {row, col} = availableTiles[randomIndex]
      state[row][col] = 'M'
    }
  }

  function createBoard() {
    for (let i=0; i<height; i++) {
      const stateRow = []

      for (let j=0; j<width; j++) {
        stateRow.push('E')
      }

      state.push(stateRow)
    }
    populateRandomMines()
  }

  function updateEmptySquare({row, col}: Coords) {

    if (state[row][col] === 'M') {
      state[row][col] = 'X'
      console.log('Game over!')
    } else {
      // Calculate the number of adjacent mines
      let adjacentMines = 0
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if ((row + x) < 0 || (row + x) > state.length - 1) continue
          if (col + y < 0 || col + y > state[0].length - 1) continue
          if (state[row + x][col + y] === 'M') adjacentMines += 1
        }
      }
      
      // If no adjacent mines, make tile blank
      if (adjacentMines == 0) {
        state[row][col] = 'B'
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            if (x === 0 && y === 0) continue
            if ((row + x) < 0 || (row + x) > state.length - 1) continue
            if ((col + y) < 0 || (col + y) > state[0].length - 1) continue
            if (state[row + x][col + y] !== 'E') continue
            updateEmptySquare({row: row + x, col: col + y})
          }
        }
      } else {
        state[row][col] = adjacentMines.toString()
      }
    }
  }

  return {
    state
  }
}

export default Gameboard