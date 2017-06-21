import Message from './Message';

export default class User {
  constructor() {
    this.requestUser();
    User.incUser();
  }

  requestUser() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://randomuser.me/api', true);
    xhr.send();

    xhr.addEventListener('load', this.saveUser.bind(this));
    xhr.addEventListener('error', this.processError.bind(this));
  }

  saveUser(e) {
    const target = e.target,
          data = JSON.parse(target.responseText).results[0];

    const {
            name: { first: firstName, last: lastName },
            location: { city },
            login: { username },
            dob,
            phone,
            picture: { large: avatar }
          } = data;

    const user = {
      firstName,
      lastName,
      username,
      city,
      dob,
      phone,
      avatar,
      get fullName() {
        return `${this.lastName} ${this.firstName}`;
      },
      get age() {
        const ageDifMs = Date.now() - new Date(this.dob.substr(0, 10));
        const ageDate = new Date(ageDifMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    };

    this.id = user.username;
    this.insertUser(user);
  }

  processError(e) {
    console.log(e);
  }

  insertUser(user) {
    const options = {
      avatar: user.avatar,
      username: user.username,
      age: user.age
    };

    const template = this.render(user),
          users = document.getElementById('users');

    users.insertAdjacentHTML('beforeEnd', template);

    this.user = document.getElementById(this.id);
    this.addDeleteEvent();

    this.generateMessages(options);
  }

  deleteUser() {
    this.user.remove();

    User.decUser();

    clearTimeout(this.timerId);
  }

  generateMessages(options) {
    const tick = () => {
      const time = randomTime(15, 60);
      this.timerId = setTimeout(tick, time);

      this.showMessage(options);
    };

    this.timerId = setTimeout(tick, randomTime(5, 30));
  }

  addDeleteEvent() {
    const deleteButton = this.user.querySelector('.delete');

    deleteButton.addEventListener('click', () => {
      this.deleteUser();
    });
  }

  render(user) {
    const template = `
      <article id="${user.username}" class="user">
        <img src="${user.avatar}" alt="avatar">
        <address>
          <h2>${user.fullName}</h2>
          <p>city: ${user.city}</p>
          <p>phone: ${user.phone}</p>
        </address>
        <div class="delete">&#10008;</div>
      </article>`;

    return template;
  }

  showMessage({avatar, username, age}) {
    new Message(avatar, username, age);
  }

  static incUser() {
    User.count++;
  }

  static decUser() {
    User.count--;
  }
}

User.count = 0;

function randomTime(min = 0, max = 60) {
  min *= 1e3;
  max *= 1e3;

  return min + Math.random() * (max - min + 1) ^ 0;
}