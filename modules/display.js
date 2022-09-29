function Display() {
    const uiBoard = document.querySelector('.gameGrid');
    function createGrid({ width, height }) {
        clearGrid();
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
    function clearGrid() {
        while (uiBoard.firstChild) {
            uiBoard.removeChild(uiBoard.firstChild);
        }
    }
    return {
        createGrid
    };
}
export default Display;
