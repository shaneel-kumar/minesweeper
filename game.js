import gameboard from './modules/gameboard.js';
gameboard();
let board = [
    ['E', 'E', 'E'],
    ['E', 'E', 'E'],
    ['E', 'E', 'M'],
];
console.table(board);
const click = { board: board, row: 2, col: 2 };
function updateEmptySquare({ board, row, col }) {
    if (board[row][col] === 'M') {
        board[row][col] = 'X';
        console.log('Game over!');
    }
    else {
        // Calculate the number of adjacent mines
        let adjacentMines = 0;
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if ((row + x) < 0 || (row + x) > board.length - 1)
                    continue;
                if (col + y < 0 || col + y > board[0].length - 1)
                    continue;
                if (board[row + x][col + y] === 'M')
                    adjacentMines += 1;
            }
        }
        // If no adjacent mines, make tile blank
        if (adjacentMines == 0) {
            board[row][col] = 'B';
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (x === 0 && y === 0)
                        continue;
                    if ((row + x) < 0 || (row + x) > board.length - 1)
                        continue;
                    if ((col + y) < 0 || (col + y) > board[0].length - 1)
                        continue;
                    if (board[row + x][col + y] !== 'E')
                        continue;
                    updateEmptySquare({ board: board, row: row + x, col: col + y });
                }
            }
        }
        else {
            board[row][col] = adjacentMines.toString();
        }
    }
}
updateEmptySquare(click);
console.table(board);
