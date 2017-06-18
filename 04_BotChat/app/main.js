import User from './User';

const button = document.getElementById('addUser');
button.addEventListener('click', () => {
  if (User.count < 5) {
    new User();
  }
});

const aside = document.querySelector('aside');

const centerButton = () => {
  button.style.left = (aside.offsetWidth - button.offsetWidth) / 2 + 'px';
};

centerButton();

window.onresize = () => {
  centerButton();
};