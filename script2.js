const CELL_SIZE = 5;
const NUMBER_COLUMNS = Math.ceil(window.innerWidth / CELL_SIZE) + 10;
const NUMBER_ROWS = Math.ceil(window.innerHeight / CELL_SIZE) + 10;

const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
canvas.width = NUMBER_COLUMNS * CELL_SIZE;
canvas.height = NUMBER_ROWS * CELL_SIZE;

let cells = [];



//! ------< Class Cell >------
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = false;
        this.willBeAlive = false;
    }

    draw(bool = false, color = '#000') {
        if (this.willBeAlive || bool) {
            ctx.fillStyle = color ? color : '#000';
            ctx.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            this.alive = true;
        } else {
            ctx.fillStyle = '#fff';
            ctx.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            this.alive = false;
        }
    }

    countLivingCells() {
        let count = 0;

        // top
        if (cells[`${this.x - 1}-${this.y - 1}`] && cells[`${this.x - 1}-${this.y - 1}`].alive) {
            count++;
        }
        if (cells[`${this.x}-${this.y - 1}`] && cells[`${this.x}-${this.y - 1}`].alive) {
            count++;
        }
        if (cells[`${this.x + 1}-${this.y - 1}`] && cells[`${this.x + 1}-${this.y - 1}`].alive) {
            count++;
        }
        // center
        if (cells[`${this.x - 1}-${this.y}`] && cells[`${this.x - 1}-${this.y}`].alive) {
            count++;
        }
        if (cells[`${this.x + 1}-${this.y}`] && cells[`${this.x + 1}-${this.y}`].alive) {
            count++;
        }
        // bottom
        if (cells[`${this.x - 1}-${this.y + 1}`] && cells[`${this.x - 1}-${this.y + 1}`].alive) {
            count++;
        }
        if (cells[`${this.x}-${this.y + 1}`] && cells[`${this.x}-${this.y + 1}`].alive) {
            count++;
        }
        if (cells[`${this.x + 1}-${this.y + 1}`] && cells[`${this.x + 1}-${this.y + 1}`].alive) {
            count++;
        }

        return count;
    }

    judgment() {
        let count = this.countLivingCells();

        if (this.alive) {
            if (2 <= count && count <= 3) {
                this.willBeAlive = true;
            } else {
                this.willBeAlive = false;
            }
        } else {
            if (count === 3) {
                this.willBeAlive = true;
            } else {
                this.willBeAlive = false;
            }
        }

    }
}



//! ------< Create Cells >------
for (let indexY = 0; indexY < NUMBER_COLUMNS; indexY++) {
    for (let indexX = 0; indexX < NUMBER_ROWS; indexX++) {
        const cell = new Cell((indexX), (indexY));
        cell.draw();
        cells[`${cell.x}-${cell.y}`] = cell;
    }
}



//! ------< Schema de Début >------

const middleNumberColumns = Math.ceil(NUMBER_COLUMNS / 2);
const middleNumberRows = Math.ceil(NUMBER_ROWS / 2);

cells[`${middleNumberColumns + 1}-${middleNumberRows - 1}`].draw(true);
cells[`${middleNumberColumns}-${middleNumberRows - 1}`].draw(true);
cells[`${middleNumberColumns}-${middleNumberRows}`].draw(true);
cells[`${middleNumberColumns - 1}-${middleNumberRows}`].draw(true);
cells[`${middleNumberColumns}-${middleNumberRows + 1}`].draw(true);



//! ------< Init >------

function judgments() {

    for (const key in cells) {
        if (cells.hasOwnProperty(key)) {
            const cell = cells[key];
            cell.judgment();
        }        
    }

    for (const key in cells) {
        if (cells.hasOwnProperty(key)) {
            const cell = cells[key];
            cell.draw();
        }        
    }

}

setInterval(judgments, 100);