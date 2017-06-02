'use strict';

const gameSettings = {
  board: document.getElementById('board'),
  numberOfCards: 1,
  N: 5,
  dispCoeff: 4,
  get totalCells() {
    return this.N ** 2;
  },
  get totalNumbers() {
    return this.totalCells * this.dispCoeff;
  },
  get columnLength() {
    return this.N * this.dispCoeff;
  }
}

const settings = Object.assign( Object.create(null), gameSettings );

class Cell {
  constructor(number) {
    this.number = number;
  }

  createCell() {
    this.cell = document.createElement('div');
    this.cell.classList.add('cell');
    this.cell.textContent = this.number;

    return this.cell;
  }
}

class Card {
  constructor(options) {
    Object.assign(this, options);
    this.id = Card.incId();
    this.cellsArr = [];

    this.applyCard();
  }

  applyCard() {
    this.createCard();
    this.initializeState();
    this.insertColumns();
  }

  createCard() {
    this.card = document.createElement('div');
    this.card.id = Card.id
    this.board.append(this.card);
  }

  removeCard() {
    this.card.remove();
    Card.decId();
  }

  initializeState() {
    this.state = [];
    let columnNumber = 0;

    for (let i = 0; i < this.N; i++) {
      const min = i * this.columnLength + 1,
            max = (i + 1) * this.columnLength;

      const columnState = this.initializeColumnState(min, max);

      this.state.push(columnState);
    }
  }

  initializeColumnState(min, max) {
    const columnState = createNumbersArray(min, max);

    shuffleArray(columnState);
    columnState.splice(this.N);

    return columnState;
  }

  createColumn(columnNumber) {
    this.column = document.createElement('div');
    this.column.classList.add('column');

    this.state[columnNumber].forEach(number => {
      const cell = new Cell(number);
      this.cellsArr.push(cell);
      this.column.append( cell.createCell() );
    });

    return this.column;
  }

  insertColumns() {
    for (let i = 0; i < this.N; i++) {
      const column = this.createColumn(i);
      this.card.append(column);
    }
  }

  static incId() {
    return ++Card._id;
  }

  static decId() {
    return --Card._id;
  }
  
  static get id() {
   return `card_${Card._id}`;
  }
}

Card._id = 0;

function shuffleArray(arr, times=10) {
  while(times-- > 0) {
    arr.sort(() => Math.random() - 0.5);
  }
}

function createNumbersArray(min, max) {
  const arr = [];

  for(let i = min; i <= max; i++) {
    arr.push(i);
  }

  return arr;
}

new Card(settings);
new Card(settings);
new Card(settings);