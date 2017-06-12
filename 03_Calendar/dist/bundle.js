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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Month__ = __webpack_require__(2);
// import Header from './Header';


class Calendar {
  constructor() {
    const mainDays = this.calculateMainDays(2017 , 6);
    this.monthDays = this.createMonthDays(mainDays);
  }

  calculateMainDays(year, month, isMondayFirst=true) {
    const time = new Date(year, month-1);
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

    time.setMonth(month, 0);
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
        dayNumber: i
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
    }
  }

  render() {
    new __WEBPACK_IMPORTED_MODULE_0__Month__["a" /* default */](this.monthDays).render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Calendar;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Day {
  constructor(options) {
    Object.assign(this, options);
  }

  render() {
    const day = document.createElement('td');

    day.textContent = this.dayNumber;

    if (this.currentMonth) {
      day.classList.add('current-month');
    }

    return day;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Day;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Week__ = __webpack_require__(3);
// import Weekdays from './Weekdays';


class Month {
  constructor(monthArrays) {
    this.weekArrays = this.createWeekArrays(monthArrays);
  }

  createWeekArrays(monthArrays) {
    const weekArrays = [];
    const allDays = [].concat( ...Object.values(monthArrays) );

    for (let i = 0; i < 6; i++) {
      weekArrays.push( allDays.splice(0, 7) );
    }

    return weekArrays;
  }

  render() {
    const month = new DocumentFragment();

    const monthArr = this.weekArrays.map(weekDays => {
      return new __WEBPACK_IMPORTED_MODULE_0__Week__["a" /* default */]({weekDays}).render();
    });

    month.append(...monthArr);

    document.querySelector('tbody').append(month);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Month;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Day__ = __webpack_require__(1);


class Week {
  constructor(options) {
    Object.assign(this, options);
  }

  render() {
    const week = document.createElement('tr');
    const weekArr =  this.weekDays.map(dayOptions => {
      const day = new __WEBPACK_IMPORTED_MODULE_0__Day__["a" /* default */](dayOptions);

      return day.render();
    });

    week.append(...weekArr);

    return week;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Week;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Calendar__ = __webpack_require__(0);


const calendar = new __WEBPACK_IMPORTED_MODULE_0__Calendar__["a" /* default */]();
calendar.render();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map