import Header from './Header';
import Month from './Month';

export default class Calendar {
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
    this.headerInst = new Header(this.isMondayFirst);
    this.monthInst = new Month();

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