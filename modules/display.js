function Display({ width, height }) {
    const uiBoard = document.querySelector('.gameGrid');
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
}
export default Display;
