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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Header__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Month__ = __webpack_require__(3);



class Calendar {
  constructor(isMondayFirst=true) {
    this.isMondayFirst = isMondayFirst;
    this.createTable();

    this.setCurrentDate();
    this.updateState();

    this.addEvents();
  }

  createTable() {
    this.table = document.createElement('table');
    this.table.id = 'calendar';
  }

  setCurrentDate() {
    const time = new Date();

    this.year = time.getFullYear();
    this.month = time.getMonth();

    this.selectedDate = null;
    this.currentDay = this.markDay(time.getDate());
  }

  updateState() {
    const mainDays = this.calculateMainDays(this.year , this.month, this.isMondayFirst);
    this.monthsOptions = this.createMonthDays(mainDays);
  }

  calculateMainDays(year, month, isMondayFirst) {
    const time = new Date(year, month);
    let firstDayCurrentMonth, lastDatePreviousMonth, lastDateCurrentMonth;

    firstDayCurrentMonth = time.getDay();

    if (isMondayFirst) {
      if (firstDayCurrentMonth === 0) {
        firstDayCurrentMonth = 6;
      } else {
        firstDayCurrentMonth--;
      }
    }

    time.setDate(0);
    lastDatePreviousMonth = time.getDate();

    time.setMonth(month + 1, 0);
    lastDateCurrentMonth = time.getDate();

    return {
      firstDayCurrentMonth,
      lastDatePreviousMonth,
      lastDateCurrentMonth
    };
  }

  createMonthDays(mainDays) {
    const { firstDayCurrentMonth, lastDatePreviousMonth, lastDateCurrentMonth } = mainDays;
    const previousMonth = [],
          currentMonth = [],
          nextMonth = [];
    const weekLength = 7,
          calendarLength = weekLength * 6,
          nextMonthLength = calendarLength - (firstDayCurrentMonth + lastDateCurrentMonth);

    if (firstDayCurrentMonth === 0) {
      for (let i = lastDatePreviousMonth - weekLength + 1; i <= lastDatePreviousMonth; i++) {
        previousMonth.push({
          currentMonth: false,
          dayNumber: i
        });
      }
    } else {
      for (let i = lastDatePreviousMonth - firstDayCurrentMonth + 1; i <= lastDatePreviousMonth; i++) {
        previousMonth.push({
          currentMonth: false,
          dayNumber: i
        });
      }
    }

    for (let i = 1; i <= lastDateCurrentMonth; i++) {
      currentMonth.push({
        currentMonth: true,
        dayNumber: i,
        data: this.markDay(i)
      });
    }

    for (let i = 1; i <= nextMonthLength; i++) {
        nextMonth.push({
          currentMonth: false,
          dayNumber: i
        });
    }

    return {
      previousMonth,
      currentMonth,
      nextMonth
    };
  }

  render(target) {
    this.headerInst = new __WEBPACK_IMPORTED_MODULE_0__Header__["a" /* default */](this.isMondayFirst);
    this.monthInst = new __WEBPACK_IMPORTED_MODULE_1__Month__["a" /* default */]();

    this.table.append(this.headerInst.render(), this.monthInst.render());

    this.updateElements();

    if (target instanceof Element) {
      target.append(this.table);
    }

    return this.table;
  }

  updateElements() {
    this.headerInst.update(this.year, this.month);
    this.monthInst.update(this.monthsOptions);
    this.checkCurrentDay();
  }

  update() {
    this.updateState();
    this.updateElements();
  }

  addEvents() {
    this.table.addEventListener('click', (e) => {
      const target = e.target;

      this.highlightDay(target);

      switch (target.id) {
        case 'previousMonth':
          this.getPreviousMonth();
          break;
        case 'nextMonth':
          this.getNextMonth();
          break;
      }
    });
  }

  highlightDay(target) {
    if (target.classList.contains('current-month')) {
      if (target.dataset.day === this.selectedDate) {
        return;
      }

      this.removeHighlightedDay();

      target.classList.add('highlighted');
      this.selectedDate = this.markDay(target.textContent);
    }
  }

  markDay(date) {
    return `${this.year}-${this.month}-${date}`;
  }

  checkCurrentDay() {
    const currentDay = this.table.querySelector(`[data-day='${this.currentDay}']`);

    if (currentDay) {
      currentDay.classList.add('today');
      this.currentDayElement = currentDay;
    } else {
      this.currentDayElement.classList.remove('today');
    }
  }

  getPreviousMonth() {
    this.month--;

    if (this.month === -1) {
      this.month = 11;
      this.year--;
    }

    this.removeHighlightedDay();
    this.update();
    this.addHighlightedDay();
  }

  getNextMonth() {
    this.month++;

    if (this.month === 12) {
      this.month = 0;
      this.year++;
    }

    this.removeHighlightedDay();
    this.update();
    this.addHighlightedDay();
  }

  removeHighlightedDay() {
    const previousHighlightedDay = this.table.querySelector(`[data-day="${this.selectedDate}"]`);
    previousHighlightedDay && previousHighlightedDay.classList.remove('highlighted');
  }

  addHighlightedDay() {
    const newHighlightedDay = this.table.querySelector(`[data-day="${this.selectedDate}"]`);
    newHighlightedDay && newHighlightedDay.classList.add('highlighted');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Calendar;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Day {
  render() {
    this.td = document.createElement('td');

    return this.td;
  }

  update(dayOptions) {
    Object.assign(this, dayOptions);

    this.td.textContent = this.dayNumber;

    if (this.currentMonth) {
      this.td.classList.add('current-month');
      this.td.dataset.day = this.data;
    } else {
      this.td.removeAttribute('data-day');
      this.td.removeAttribute('class');
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Day;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Weekdays__ = __webpack_require__(5);


class Header {
  constructor(isMondayFirst) {
    this.isMondayFirst = isMondayFirst;
  }

  createHeader() {
    const tr = document.createElement('tr');

    this.th = document.createElement('th');
    this.th.setAttribute('colspan', 5);

    const leftArrow = document.createElement('th');
    leftArrow.id = 'previousMonth';

    const rightArrow = document.createElement('th');
    rightArrow.id = 'nextMonth';

    tr.append(leftArrow, this.th, rightArrow);

    return tr;
  }

  formatDate(year, month) {
    const options = {
      year: 'numeric',
      month: 'long'
    };

    const date = new Date(year, month);
    return date.toLocaleString('en-US', options);
  }

  render() {
    const thead = document.createElement('thead');
    const weekdays = new __WEBPACK_IMPORTED_MODULE_0__Weekdays__["a" /* default */](this.isMondayFirst);

    thead.append(this.createHeader(), weekdays.render());

    return thead;
  }

  update(year, month) {
    this.th.textContent = this.formatDate(year, month);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Week__ = __webpack_require__(4);


class Month {
  createWeeksArrOptions(monthsOptions) {
    const weeksArrOptions = [];
    const allDaysOptions = [].concat( ...Object.values(monthsOptions) );

    for (let i = 1; i <= 6; i++) {
      weeksArrOptions.push( allDaysOptions.splice(0, 7) );
    }

    return weeksArrOptions;
  }

  render() {
    const tbody = document.createElement('tbody');

    this.weeksArr = [];

    for (let i = 1; i <= 6; i++) {
      this.weeksArr.push( new __WEBPACK_IMPORTED_MODULE_0__Week__["a" /* default */]() );
    }

    this.monthArrElements = this.weeksArr.map(week => {
      return week.render();
    });

    tbody.append(...this.monthArrElements);

    return tbody;
  }

  update(monthsOptions) {
    this.weeksArrOptions = this.createWeeksArrOptions(monthsOptions);
    
    this.weeksArr.forEach( (week, i) => {
      return week.update(this.weeksArrOptions[i]);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Month;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Day__ = __webpack_require__(1);


class Week {
  render() {
    const tr = document.createElement('tr');

    this.daysArr = [];

    for (let i = 1; i <= 7; i++) {
      this.daysArr.push( new __WEBPACK_IMPORTED_MODULE_0__Day__["a" /* default */]() );
    }

    const weekArrElements = this.daysArr.map(day => {
      return day.render();
    });

    tr.append(...weekArrElements);

    return tr;
  }

  update(weeksArrOptions) {
    this.daysArr.forEach( (day, i) => {
      day.update(weeksArrOptions[i]);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Week;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Weekdays {
  constructor(isMondayFirst) {
    this.weekdayArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (!isMondayFirst) {
      const sun = this.weekdayArr.pop();
      this.weekdayArr.unshift(sun);
    }
  }

  render() {
    const tr = document.createElement('tr');
    const weekdayArrElements = [];

    this.weekdayArr.forEach(weekdayName => {
      const th = document.createElement('th');
      th.textContent = weekdayName;

      weekdayArrElements.push(th);
    });

    tr.append(...weekdayArrElements);

    return tr;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Weekdays;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Calendar__ = __webpack_require__(0);


const section = document.querySelector('section');

const calendar = new __WEBPACK_IMPORTED_MODULE_0__Calendar__["a" /* default */]();
calendar.render(section);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map