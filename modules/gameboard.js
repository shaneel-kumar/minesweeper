function Gameboard({ width, height, difficulty = 'medium', mines = 20 }) {
    const state = [];
    let gameOver = false;
    createBoard();
    function populateRandomMines() {
        let numberOfMines = (() => {
            if (difficulty === 'medium')
                return 55;
            if (difficulty === 'hard')
                return 80;
            return mines;
        })();
        for (let i = 0; i < numberOfMines; i++) {
            const availableTiles = [];
            state.forEach((row, rowIndex) => {
                row.forEach((item, colIndex) => {
                    if (item !== 'E')
                        return;
                    availableTiles.push({ row: rowIndex, col: colIndex });
                });
            });
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            const { row, col } = availableTiles[randomIndex];
            state[row][col] = 'M';
        }
    }
    function createBoard() {
        for (let i = 0; i < height; i++) {
            const stateRow = [];
            for (let j = 0; j < width; j++) {
                stateRow.push('E');
            }
            state.push(stateRow);
        }
        populateRandomMines();
    }
    function updateEmptySquare({ row, col }) {
        if (state[row][col] === 'M') {
            state[row][col] = 'X';
            console.log('Game over!');
            gameOver = true;
        }
        else {
            // Calculate the number of adjacent mines
            let adjacentMines = 0;
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if ((row + x) < 0 || (row + x) > state.length - 1)
                        continue;
                    if (col + y < 0 || col + y > state[0].length - 1)
                        continue;
                    if (state[row + x][col + y] === 'M')
                        adjacentMines += 1;
                }
            }
            // If no adjacent mines, make tile blank
            if (adjacentMines == 0) {
                state[row][col] = 'B';
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        if (x === 0 && y === 0)
                            continue;
                        if ((row + x) < 0 || (row + x) > state.length - 1)
                            continue;
                        if ((col + y) < 0 || (col + y) > state[0].length - 1)
                            continue;
                        if (state[row + x][col + y] !== 'E')
                            continue;
                        updateEmptySquare({ row: row + x, col: col + y });
                    }
                }
            }
            else {
                state[row][col] = adjacentMines.toString();
            }
        }
    }
    function isGameWon() {
        console.table(state);
        return state.every(row => (row.every(cell => (cell !== 'E'))));
    }
    function isGameOver() {
        return gameOver;
    }
    return {
        state,
        difficulty,
        updateEmptySquare,
        isGameWon,
        isGameOver
    };
}
export default Gameboard;
