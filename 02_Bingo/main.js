'use strict';

const gameSettings = Object.assign( Object.create(null), {
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
});

class _Array {
  static create2DArray(max) {
    const arr = [];

    for (let i = 0; i < max; i++) {
      arr.push([]);
    }

    return arr;
  }

  static createNumbersArray(min, max) {
    const arr = [];

    for(let i = min; i <= max; i++) {
      arr.push(i);
    }

    return arr;
  }

  static shuffleArray(arr, times=10) {
    while(times-- > 0) {
      arr.sort(() => Math.random() - 0.5);
    }
  }
}

/**********************************************************************/

class Cell {
  constructor(number, parent) {
    this.number = number;
    this.parent = parent;
    this.flipped = false;
  }

  createDOMCell() {
    const container = this.createFlipContainer();

    this.cell = document.createElement('div');
    this.cell.classList.add('cell');
    this.cell.append(container);

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

    return container;
  }

  addEvents() {
    const container = this.cell.querySelector('.container');

    container.addEventListener('click', () => {
      const match = this.parent.numbersQueue.find(value => {
        return value === this.number;
      });

      if (match && !this.flipped) {
        container.classList.add('flipped');
        this.flipped = true;
      }

      // unlock the cell's turning over
      // container.classList.toggle('flipped');
      // this.flipped = container.classList.contains('flipped');
    });
  }
}

/**********************************************************************/

class Card {
  constructor() {
    Object.setPrototypeOf(Card.prototype, gameSettings);
    
    this.verticalCellsList = _Array.create2DArray(this.N);
  }

  createDOMCard() {
    this.card = document.createElement('div');
    this.card.id = Card.id;
    Card.incrementId();

    this.applyCard();

    return this.card;
  }

  removeDOMCard() {
    this.card.remove();
    this.isDeleted = true;
  }

  applyCard() {
    this.initializeState();
    this.insertColumns();

    this.horizontalCellsList = this.reverseCellsList(this.verticalCellsList);

    this.createTrashCover();
    this.addEvents();
  }

  initializeState() {
    this.state = [];

    for (let i = 0; i < this.N; i++) {
      const min = i * this.columnLength + 1,
            max = (i + 1) * this.columnLength;

      const columnState = this.initializeColumnState(min, max);

      this.state.push(columnState);
    }
  }

  initializeColumnState(min, max) {
    const columnState = _Array.createNumbersArray(min, max);

    _Array.shuffleArray(columnState);
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

    this.state[columnNumber].forEach( number => {
      const cell = new Cell(number, this);
      this.verticalCellsList[columnNumber].push(cell);
      column.append( cell.createDOMCell() );
    });

    return column;
  }

  reverseCellsList(cellsList) {
    const reverseCellsList = _Array.create2DArray(this.N);

    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        reverseCellsList[i].push(cellsList[j][i]);
      }
    }

    return reverseCellsList;
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
    img.addEventListener('click', this.removeDOMCard.bind(this));
  }

  static incrementId() {
    return Card._id++;
  }
  
  static get id() {
    return `card_${Card._id}`;
  }
}

Card._id = 0;

/**********************************************************************/

class Basket {
  constructor(callback) {
    Object.setPrototypeOf(Basket.prototype, gameSettings);

    this.callback = callback;
    this.DOMqueue = [];
    this.numbersQueue = [];
  }

  createDOMBasket() {
    this.basketDOM = document.createElement('div');
    this.basketDOM.id = 'basket';

    return this.basketDOM;
  }

  removeDOMBasket() {
    clearInterval(this.timerId);
    this.basketDOM.remove();
  }

  startRolling() {
    this.generateLuckyNumbers();

    this.tick();
    this.timerId = setInterval(this.tick.bind(this), 3500);
  }

  generateLuckyNumbers() {
    const maxNumber = this.totalNumbers * 2 / 3 ^ 0;

    this.luckyNumbers = _Array.createNumbersArray(1, this.totalNumbers);
    _Array.shuffleArray(this.luckyNumbers);
    this.luckyNumbers.splice(maxNumber);
  }

  tick() {
    this.removeOldBall();
    this.addBall( this.createDOMBall() );
    this.animateBalls();

    this.callback(this.numbersQueue);

    this.stopTick();
  }

  removeOldBall() {
    if (this.DOMqueue.length === 2) {
      const oldBall = this.DOMqueue.pop();
      oldBall.remove();

      this.numbersQueue.pop();
    }
  }

  createDOMBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = this.nextNumber();

    return ball;
  }

  nextNumber() {
    let luckyNumber;
    _Array.shuffleArray(this.luckyNumbers, 3);

    luckyNumber = this.luckyNumbers.pop();
    this.numbersQueue.unshift(luckyNumber);

    return luckyNumber;
  }

  addBall(ball) {
    this.basketDOM.prepend(ball);
    this.DOMqueue.unshift(ball);
  }

  animateBalls() {
    const [newBall, oldBall] = this.DOMqueue;

    if (oldBall) {
      oldBall.classList.remove('show');
      oldBall.classList.add('hide');
    }

    setTimeout(() => {
      newBall.classList.add('show');
    }, 50);
  }

  stopTick() {
    if (this.luckyNumbers.length === 0) {
      clearInterval(this.timerId);

      setTimeout(() => {
        this.DOMqueue[0].classList.add('hide');
        this.callback([this.numbersQueue[0]]);
        this.DOMqueue.pop().remove();

        setTimeout(() => {
          this.DOMqueue.pop().remove();
          this.callback([], true);
          this.removeDOMBasket();
        }, 5000);
      }, 3500);
    }
  }
}

/**********************************************************************/

class Game {
  constructor() {
    Object.setPrototypeOf(Game.prototype, gameSettings);
    this.board = document.getElementById('board');
    this.cardsList = new Set();

    this.addDOMCard();
    this.addEvents();
  }

  addDOMCard() {
    this.checkCard();

    if (this.cardsList.size < 3) {
      const card = new Card(),
            DOMCard = card.createDOMCard();

      this.board.append(DOMCard);
      this.cardsList.add(card);
    }
  }

  addEvents() {
    const addCardButton = document.getElementById('addCard');
    const startGame = document.getElementById('startGame');
    addCardButton.addEventListener('click', this.addDOMCard.bind(this));
    startGame.addEventListener('click', this.startGame.bind(this));
  }

  startGame() {
    this.checkCard();

    if (this.cardsList.size === 0) {
      return;
    }

    this.removeTrashCovers();
    this.removeButtons();

    this.basket = new Basket(this.callback.bind(this));

    const basketDOM = this.basket.createDOMBasket();
    this.board.after(basketDOM);

    this.basket.startRolling();
  }

  checkCard() {
    for(const card of this.cardsList) {
      if (card.isDeleted) {
        this.cardsList.delete(card);
      }
    }
  }

  callback(arr, gameOver) {
    for (const card of this.cardsList) {
      card.numbersQueue = arr;
    }

    if (this.checkWin()) {
      this.basket.removeDOMBasket();
      setTimeout(alert, 0, 'Congratulations!');
    } else if (gameOver) {
      setTimeout(alert, 0, 'You lose, try again!');
    }
  }

  removeTrashCovers() {
    for(const card of this.cardsList) {
      card.cover.remove();
      delete card.cover;
    }
  }

  removeButtons() {
    const nav = document.querySelector('nav');
    nav.remove();
  }

  checkWin() {
    let win = false;

    for(const card of this.cardsList) {
      const verticalLines = this.checkWinningLines(card.verticalCellsList),
            horizontalLines = this.checkWinningLines(card.horizontalCellsList),
            diagonalLines = this.checkDiagonalLines(card.horizontalCellsList),
            corners = this.ckeckCorners(card.horizontalCellsList);

      win = win || verticalLines || horizontalLines || diagonalLines || corners;
    }

    return win;
  }

  checkWinningLines(cellsList) {
    return cellsList.some(line => {
      return line.every(cell => {
        return cell.flipped;
      });
    });
  }

  checkDiagonalLines(cellsList) {
    let result1 = true,
        result2 = true;

    for (let i = 0, j = this.N - 1; i < this.N; i++, j--) {
      result1 = result1 && cellsList[i][i].flipped;
      result2 = result2 && cellsList[i][j].flipped;
    }

    return result1 || result2;
  }

  ckeckCorners(cellsList) {
    let result = true;

    for (let i = 0; i < this.N; i += this.N - 1) {
      for (let j = 0; j < this.N; j += this.N - 1) {
        result = result && cellsList[i][j].flipped;
      }
    }

    return result;
  }
}

const game = new Game();