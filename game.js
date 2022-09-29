import Gameboard from './modules/gameboard.js';
import Display from './modules/display.js';
const difficultyButtons = document.querySelectorAll('.diff-btn');
const display = Display();
let { width, height } = gridDimensionsByDifficulty('easy');
const gameboard = Gameboard({ width, height });
display.createGrid({ width, height });
Array.from(difficultyButtons).forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.target;
        const setting = target.id.toLowerCase();
        let { width, height } = gridDimensionsByDifficulty(setting);
        const gameboard = Gameboard({ width, height });
        display.createGrid({ width, height });
    });
});
display.uiBoard.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('cell'))
        return;
    const rowData = target.getAttribute('data-x');
    const colData = target.getAttribute('data-y');
    if (rowData && colData) {
        const row = parseInt(rowData);
        const col = parseInt(colData);
        gameboard.updateEmptySquare({ row, col });
        display.updateGrid(gameboard.state);
        console.table(gameboard.state);
    }
});
function gridDimensionsByDifficulty(setting) {
    if (setting === 'medium')
        return { width: 10, height: 10 };
    if (setting === 'hard')
        return { width: 20, height: 20 };
    return { width: 5, height: 5 };
}
