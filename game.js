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
function gridDimensionsByDifficulty(setting) {
    if (setting === 'medium')
        return { width: 10, height: 10 };
    if (setting === 'hard')
        return { width: 20, height: 20 };
    return { width: 5, height: 5 };
}
