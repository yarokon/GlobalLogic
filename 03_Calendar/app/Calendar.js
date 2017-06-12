// import Header from './Header';
import Month from './Month';

export default class Calendar {
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
    new Month(this.monthDays).render();
  }
}