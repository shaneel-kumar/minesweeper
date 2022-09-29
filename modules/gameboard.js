const UIBoard = document.querySelector('.gameGrid');
function Gameboard({ width, height, uiBoard, difficulty = 'easy' }) {
    const state = [];
    createBoard();
    function populateRandomMines() {
        let numberOfMines = (() => {
            if (difficulty === 'medium')
                return 6;
            if (difficulty === 'hard')
                return 12;
            return 3;
        })();
        for (let i = 0; i < numberOfMines; i++) {
            const availableTiles = [];
            state.forEach((row, rowIndex) => {
                row.forEach((item, colIndex) => {
                    if (item !== 'E')
                        return;
                    availableTiles.push({ x: rowIndex, y: colIndex });
                });
            });
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            const { x, y } = availableTiles[randomIndex];
            state[x][y] = 'M';
        }
    }
    function createBoard() {
        for (let i = 0; i < height; i++) {
            const stateRow = [];
            const row = document.createElement('div');
            row.classList.add('gridRow');
            for (let j = 0; j < width; j++) {
                stateRow.push('E');
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            state.push(stateRow);
            UIBoard === null || UIBoard === void 0 ? void 0 : UIBoard.appendChild(row);
        }
        populateRandomMines();
    }
    return {
        state
    };
}
export default Gameboard;
