'use strict';

const table = document.getElementById('board'),
      section = document.getElementById('store');

const state = new Array(9).fill(null),
      tableCells = Array.from( table.querySelectorAll('td') );

let dragging = false,
    step = 0;

tableCells.forEach( (el, i) => {
  el.dataset.index = i;
});

section.addEventListener('dragstart', e => {
  e.dataTransfer.setData('id', e.target.id);
  dragging = true;
});

table.addEventListener('dragenter', e => {
  const target = e.target;

  if (dragging && target.tagName === 'TD' && !target.hasChildNodes()) {
    target.classList.add('highlighted');
  }
});

table.addEventListener('dragover', e => {
  if (dragging && !e.target.hasChildNodes()) {
    e.preventDefault();
  }
});

table.addEventListener('dragleave', e => {
  const target = e.target;

  if (target.tagName === 'TD') {
    target.classList.remove('highlighted');
  }
});

table.addEventListener('drop', e => {
  const target = e.target,
        data = e.dataTransfer.getData('id'),
        content = data && document.getElementById(data);

  target.classList.remove('highlighted');
  dragging = false;

  if (content) {
    const value = content.textContent;

    target.append(value);
    state[target.dataset.index] = value;

    step++;
    checkWinner(markWinningLines);
    switchPlayer();
  }
});

function checkWinner(callback) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningNumbers = new Set();
  let isWon = false;

  for (const line of lines) {
    const [ a, b, c ] = line;

    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      isWon = true;

      winningNumbers.add(a)
                    .add(b)
                    .add(c);
    }
  }

  if (isWon && typeof callback === 'function') {
    callback(winningNumbers);
    displayReloadButton();
  } else if (step === 9) {
    displayReloadButton();
  }
}

function displayReloadButton() {
  section.remove();
  document.getElementById('reload').style.display = 'block';
}

function switchPlayer() {
  Array.from(section.children).forEach(el => {
    el.classList.toggle('active');
  });
}

function markWinningLines(winningNumbers) {
  const winningCells = tableCells.filter( (el, i) => {
    return winningNumbers.has(i);
  });

  winningCells.forEach(el => {
    el.classList.add('winner');
  });
}