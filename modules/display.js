function Display({ width, height }) {
    let difficultySetting = 'easy';
    const uiBoard = document.querySelector('.gameGrid');
    const difficultyButtons = document.querySelectorAll('.diff-btn');
    Array.from(difficultyButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target;
            difficultySetting = target.id.toLowerCase();
        });
    });
    createGrid();
    function createGrid() {
        for (let i = 0; i < height; i++) {
            const row = document.createElement('div');
            row.classList.add('gridRow');
            for (let j = 0; j < width; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            uiBoard.appendChild(row);
        }
    }
    return {
        difficultySetting
    };
}
export default Display;
