import User from './User';

const button = document.getElementById('addUser');

button.addEventListener('click', () => {
  if (User.count < 5) {
    new User();
  }
});