import Gameboard from './modules/gameboard.js';
import Display from './modules/display.js';
const difficultyButtons = document.querySelectorAll('.diff-btn');
const customForm = document.getElementById('custom-form');
customForm === null || customForm === void 0 ? void 0 : customForm.addEventListener('submit', getCustomGridDimensions);
const display = Display();
let { width, height } = gridDimensionsByDifficulty('easy');
let gameboard = Gameboard({ width, height });
display.createGrid({ width, height });
display.uiBoard.addEventListener('click', gameloop);
Array.from(difficultyButtons).forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.target;
        const difficulty = target.id.toLowerCase();
        let { width, height } = gridDimensionsByDifficulty(difficulty);
        gameboard = Gameboard({ width, height, difficulty });
        display.createGrid({ width, height });
        display.uiBoard.addEventListener('click', gameloop);
    });
});
function gameloop(e) {
    const target = e.target;
    if (!target.classList.contains('cell'))
        return;
    if (gameboard.isGameOver()) {
        display.uiBoard.removeEventListener('click', gameloop);
        return;
    }
    const rowData = target.getAttribute('data-x');
    const colData = target.getAttribute('data-y');
    if (rowData && colData) {
        const row = parseInt(rowData);
        const col = parseInt(colData);
        gameboard.updateEmptySquare({ row, col });
        display.updateGrid(gameboard.state);
    }
    target.blur();
}
function gridDimensionsByDifficulty(setting) {
    if (setting === 'medium')
        return { width: 10, height: 10 };
    if (setting === 'hard')
        return { width: 20, height: 20 };
    return { width: 5, height: 5 };
}
function getCustomGridDimensions(e) {
    e.preventDefault();
    const minMines = 3;
    const minWidth = 5;
    const minHeight = 5;
    const maxMines = 30;
    const maxWidth = 50;
    const maxHeight = 30;
    const target = e.target;
    const mines = parseInt(target.querySelector('#customMines').value);
    const width = parseInt(target.querySelector('#customWidth').value);
    const height = parseInt(target.querySelector('#customHeight').value);
    if (mines < minMines || width < minWidth || height < minHeight) {
        alert('Increase the custom numbers!');
        return;
    }
    else if (mines > maxMines || width > maxWidth || height > maxHeight) {
        alert('Decrease the custom numbers!');
        return;
    }
    gameboard = Gameboard({ width, height, mines });
    display.createGrid({ width, height });
    display.uiBoard.addEventListener('click', gameloop);
}
