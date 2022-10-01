import Gameboard from './modules/gameboard.js';
import Display from './modules/display.js';
const difficultyButtons = document.querySelectorAll('.diff-btn');
const customForm = document.getElementById('custom-form');
const difficultyHeading = document.querySelector('.diff-heading');
const endGameScreen = document.querySelector('.endgame');
endGameScreen.classList.toggle('hidden');
customForm === null || customForm === void 0 ? void 0 : customForm.addEventListener('submit', getCustomGridDimensions);
const display = Display();
let { width, height } = gridDimensionsByDifficulty('medium');
let gameboard = Gameboard({ width, height });
display.createGrid({ width, height });
display.uiBoard.addEventListener('click', gameloop);
difficultyHeading.innerText = 'Medium';
Array.from(difficultyButtons).forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.target;
        const difficulty = target.id.toLowerCase();
        endGameScreen.classList.add('hidden');
        let { width, height } = gridDimensionsByDifficulty(difficulty);
        gameboard = Gameboard({ width, height, difficulty });
        display.createGrid({ width, height });
        display.uiBoard.addEventListener('click', gameloop);
        difficultyHeading.innerText = difficulty[0].toUpperCase().concat(Array.from(difficulty).slice(1).join(''));
    });
});
window.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (!target.classList.contains('cell'))
        return;
    e.preventDefault();
    target.classList.toggle('flag');
});
function gameloop(e) {
    const target = e.target;
    if (!target.classList.contains('cell'))
        return;
    if (target.classList.contains('flag'))
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
        if (gameboard.isGameOver()) {
            endGameScreen.classList.toggle('hidden');
        }
    }
}
function gridDimensionsByDifficulty(setting) {
    if (setting === 'medium')
        return { width: 20, height: 20 };
    if (setting === 'hard')
        return { width: 30, height: 30 };
    return { width: 10, height: 10 };
}
function getCustomGridDimensions(e) {
    e.preventDefault();
    endGameScreen.classList.add('hidden');
    const minMines = 3;
    const minWidth = 10;
    const minHeight = 10;
    const maxMines = 30;
    const maxWidth = 30;
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
    const difficulty = 'custom';
    gameboard = Gameboard({ width, height, mines, difficulty });
    display.createGrid({ width, height });
    display.uiBoard.addEventListener('click', gameloop);
    difficultyHeading.innerText = 'Custom';
}
