const CELL_SIZE = 30;
const NUMBER_COLUMNS = Math.ceil(window.innerWidth / CELL_SIZE) * CELL_SIZE;
const NUMBER_ROWS = Math.ceil(window.innerHeight / CELL_SIZE) * CELL_SIZE;

const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
canvas.width = NUMBER_COLUMNS;
canvas.height = NUMBER_ROWS;

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
            ctx.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
            this.alive = true;
        } else {
            ctx.fillStyle = '#fff';
            ctx.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
            this.alive = false;
        }
    }

    countLivingCells() {
        let count = 0;

        // top
        if (cells[`${this.x - CELL_SIZE}-${this.y - CELL_SIZE}`] && cells[`${this.x - CELL_SIZE}-${this.y - CELL_SIZE}`].alive) {
            count++;
        }
        if (cells[`${this.x}-${this.y - CELL_SIZE}`] && cells[`${this.x}-${this.y - CELL_SIZE}`].alive) {
            count++;
        }
        if (cells[`${this.x + CELL_SIZE}-${this.y - CELL_SIZE}`] && cells[`${this.x + CELL_SIZE}-${this.y - CELL_SIZE}`].alive) {
            count++;
        }
        // center
        if (cells[`${this.x - CELL_SIZE}-${this.y}`] && cells[`${this.x - CELL_SIZE}-${this.y}`].alive) {
            count++;
        }
        if (cells[`${this.x + CELL_SIZE}-${this.y}`] && cells[`${this.x + CELL_SIZE}-${this.y}`].alive) {
            count++;
        }
        // bottom
        if (cells[`${this.x - CELL_SIZE}-${this.y + CELL_SIZE}`] && cells[`${this.x - CELL_SIZE}-${this.y + CELL_SIZE}`].alive) {
            count++;
        }
        if (cells[`${this.x}-${this.y + CELL_SIZE}`] && cells[`${this.x}-${this.y + CELL_SIZE}`].alive) {
            count++;
        }
        if (cells[`${this.x + CELL_SIZE}-${this.y + CELL_SIZE}`] && cells[`${this.x + CELL_SIZE}-${this.y + CELL_SIZE}`].alive) {
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
        const cell = new Cell((indexX * CELL_SIZE), (indexY * CELL_SIZE));
        cell.draw();
        cells[`${cell.x}-${cell.y}`] = cell;
    }
}



//! ------< Schema de Début >------

const middleNumberColumns = Math.ceil(NUMBER_COLUMNS / (CELL_SIZE * 2)) * CELL_SIZE;
const middleNumberRows = Math.ceil(NUMBER_ROWS / (CELL_SIZE * 2)) * CELL_SIZE;

cells[`${middleNumberColumns + CELL_SIZE}-${middleNumberRows - CELL_SIZE}`].draw(true);
cells[`${middleNumberColumns}-${middleNumberRows - CELL_SIZE}`].draw(true);
cells[`${middleNumberColumns}-${middleNumberRows}`].draw(true);
cells[`${middleNumberColumns - CELL_SIZE}-${middleNumberRows}`].draw(true);
cells[`${middleNumberColumns}-${middleNumberRows + CELL_SIZE}`].draw(true);



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

setInterval(judgments, 10);