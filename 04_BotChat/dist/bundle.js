/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Message__ = __webpack_require__(1);


class User {
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
      const time = randomTime(10, 60);
      this.timerId = setTimeout(tick, time);

      this.showMessage(options);
    };

    this.timerId = setTimeout(tick, randomTime(15, 30));
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
    new __WEBPACK_IMPORTED_MODULE_0__Message__["a" /* default */](avatar, username, age);
  }

  static incUser() {
    User.count++;
  }

  static decUser() {
    User.count--;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = User;


User.count = 0;

function randomTime(min = 0, max = 60) {
  min *= 1e3;
  max *= 1e3;

  return min + Math.random() * (max - min + 1) ^ 0;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Message {
  constructor(avatar, username, age) {
    this.avatar = avatar;
    this.username = username;
    this.age = age;

    this.requestText();
  }

  requestText() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/10-40', true);
    xhr.send();

    xhr.addEventListener('load', this.saveText.bind(this));
    xhr.addEventListener('error', this.processError.bind(this));
  }

  saveText(e) {
    const target = e.target,
          text = JSON.parse(target.responseText).text_out;

    this.insertMessage(text);
  }

  processError(e) {
    console.log(e);
  }

  insertMessage(text) {
    const template = this.render(text),
         section = document.querySelector('section');

    section.insertAdjacentHTML('beforeEnd', template);

    const audio = new Audio('sounds/notification.mp3');
    audio.play();

    const article = section.querySelector('article:last-child');
    article.scrollIntoView(false);
  }

  render(text) {
    const template = `
      <article class="message">
        <img src="${this.avatar}" alt="avatar">
        <address>
          <h2>${this.username} (${this.age})</h2>
          ${text}
        </address>
      </article>`;

    return template;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Message;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User__ = __webpack_require__(0);


const button = document.getElementById('addUser');
button.addEventListener('click', () => {
  if (__WEBPACK_IMPORTED_MODULE_0__User__["a" /* default */].count < 5) {
    new __WEBPACK_IMPORTED_MODULE_0__User__["a" /* default */]();
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map