import Day from './Day';

export default class Week {
  constructor(options) {
    Object.assign(this, options);
  }

  render() {
    const week = document.createElement('tr');
    const weekArr =  this.weekDays.map(dayOptions => {
      const day = new Day(dayOptions);

      return day.render();
    });

    week.append(...weekArr);

    return week;
  }
}