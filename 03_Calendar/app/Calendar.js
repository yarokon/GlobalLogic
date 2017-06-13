import Header from './Header';
import Month from './Month';

export default class Calendar {
  constructor() {
    this.setCurrentDate();
    this.updateState();
    this.createTable();
  }

  setCurrentDate() {
    const time = new Date();

    this.year = time.getFullYear();
    this.month = time.getMonth();

    this.selectedDate = null;
    this.currentDay = this.markDay(time.getDate());
  }

  createTable() {
    this.calendar = document.createElement('table');
    this.calendar.id = 'calendar';
  }

  updateState() {
    const mainDays = this.calculateMainDays(this.year , this.month);
    this.monthsOptions = this.createMonthDays(mainDays);
  }

  calculateMainDays(year, month, isMondayFirst=true) {
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
    }
  }

  render(target) {
    this.headerInst = new Header(this.year, this.month);
    this.monthInst = new Month(this.monthsOptions);

    this.calendar.append(this.headerInst.render(), this.monthInst.render());

    if (target instanceof Element) {
      target.append(this.calendar);
    }

    this.checkCurrentDay();

    return this.calendar;
  }

  update() {
    this.headerInst.update(this.year, this.month);
    this.monthInst.update(this.monthsOptions);
  }

  addEvents() {
    this.calendar.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('current-month')) {
        if (target.dataset.day === this.selectedDate) {
          return;
        }

        const searchedElement = this.calendar.querySelector(`[data-day='${this.selectedDate}']`);
        searchedElement && searchedElement.classList.remove('highlighted');

        target.classList.add('highlighted');
        this.selectedDate = this.markDay(target.textContent);
      }

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

  markDay(date) {
    return `${this.year}-${this.month}-${date}`;
  }

  checkCurrentDay() {
    const currentDay = this.calendar.querySelector(`[data-day='${this.currentDay}']`);

    if (currentDay) {
      currentDay.classList.add('today');
      this.currentDayElement = currentDay;
    } else {
      this.currentDayElement.classList.remove('today');
    }
  }

  getPreviousMonth() {
    let searchedElement;
    this.month--;

    if (this.month === -1) {
      this.month = 11;
      this.year--;
    }

    searchedElement = this.calendar.querySelector(`[data-day='${this.selectedDate}']`);
    searchedElement && searchedElement.classList.remove('highlighted');

    this.updateState();
    this.update();

    searchedElement = this.calendar.querySelector(`[data-day='${this.selectedDate}']`);
    searchedElement && searchedElement.classList.add('highlighted');

    this.checkCurrentDay();
  }

  getNextMonth() {
    let searchedElement;
    this.month++;

    if (this.month === 12) {
      this.month = 0;
      this.year++;
    }

    searchedElement = this.calendar.querySelector(`[data-day='${this.selectedDate}']`);
    searchedElement && searchedElement.classList.remove('highlighted');

    this.updateState();
    this.update();

    searchedElement = this.calendar.querySelector(`[data-day='${this.selectedDate}']`);
    searchedElement && searchedElement.classList.add('highlighted');

    this.checkCurrentDay();
  }
}