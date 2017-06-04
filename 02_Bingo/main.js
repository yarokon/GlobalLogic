'use strict';

const gameSettings = {
  N: 5,
  dispCoeff: 4,
  board: document.getElementById('board'),
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

    this.createFlipContainer();
    this.addEvents();

    return this.cell;
  }

  createFlipContainer() {
    const container = document.createElement('div'),
          front = document.createElement('figure'),
          back = document.createElement('figure');

    front.classList.add('front');
    front.textContent = this.number;

    back.classList.add('back');
    back.textContent = this.number;

    container.classList.add('container');
    container.append(front, back);
    this.container = container;

    this.cell.append(container);
  }

  addEvents() {
    this.container.addEventListener('click', () => {
      this.container.classList.toggle('flipped');

      this.flipped = this.container.classList.contains('flipped');
    });
  }
}

class Card {
  constructor(options) {
    Object.setPrototypeOf(Card.prototype, options);

    this.cellsList = [];
    this.applyCard();
  }

  applyCard() {
    this.createCard();
    this.initializeState();
    this.insertColumns();
    this.createTrashCover();
    this.addEvents();
  }

  createCard() {
    this.card = document.createElement('div');
    this.card.id = Card.id;
    Card.incrementId();
    this.board.append(this.card);
  }

  removeCard() {
    this.card.remove();
    this.isDeleted = true;
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

  insertColumns() {
    for (let i = 0; i < this.N; i++) {
      const column = this.createColumn(i);
      this.card.append(column);
    }
  }

  createColumn(columnNumber) {
    const column = document.createElement('div');
    column.classList.add('column');

    this.state[columnNumber].forEach(number => {
      const cell = new Cell(number);
      this.cellsList.push(cell);
      column.append( cell.createCell() );
    });

    return column;
  }

  createTrashCover() {
    this.cover = document.createElement('div');
    this.cover.classList.add('cardCover');

    const img = new Image();
    img.src = 'images/trash.png';
    img.alt = 'remove';

    this.cover.append(img);
    this.card.append(this.cover);
  }

  addEvents() {
    const img = this.cover.querySelector('img');
    img.addEventListener('click', this.removeCard.bind(this));
  }

  static incrementId() {
    return Card._id++;
  }
  
  static get id() {
    return `card_${Card._id}`;
  }
}

Card._id = 0;

class Game {
  constructor(options) {
    Object.setPrototypeOf(Game.prototype, options);

    this.cardsList = new Set();
    this.addEvents();
  }

  addCard() {
    this.cardsList.add( new Card(settings) );
  }

  showCard() {
    this.addCard();
  }

  startGame() {
    this.checkCard();
    this.removeTrashCovers();
    this.removeButtons();
    this.addTray();

    this.generateLuckyNumbers();
  }

  removeTrashCovers() {
    for(const card of this.cardsList) {
      card.cover.remove();
      delete card.cover;
    }
  }

  removeButtons() {
    const nav = document.querySelector('nav');

    while (nav.hasChildNodes()) {
      nav.removeChild(nav.lastChild);
    }
  }

  addTray() {
    const tray = document.createElement('div');
    tray.id = 'tray';

    this.board.after(tray);
  }

  checkCard() {
    for(const card of this.cardsList) {
      if (card.isDeleted) {
        this.cardsList.delete(card);
      }
    }
  }

  generateLuckyNumbers() {
    this.luckyNumbers = createNumbersArray(1, this.totalNumbers);
    shuffleArray(this.luckyNumbers);
  }

  addEvents() {
    const addCardButton = document.getElementById('addCard');
    const startGame = document.getElementById('startGame');
    addCardButton.addEventListener('click', this.addCard.bind(this));
    startGame.addEventListener('click', this.startGame.bind(this));
  }
}

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

const game = new Game(settings);
game.showCard();