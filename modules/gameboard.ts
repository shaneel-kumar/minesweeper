interface GameboardInputs {
  width: number;
  height: number;
  difficulty?: string;
}


function Gameboard({width, height, difficulty = 'easy'}: GameboardInputs) {
  const state: string[][] = []

  createBoard()

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

  return {
    state
  }
}

export default Gameboard