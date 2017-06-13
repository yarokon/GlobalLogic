import Day from './Day';

export default class Week {
  constructor(weekArrOptions) {
    this.weekArrOptions = weekArrOptions;
  }

  render() {
    const tr = document.createElement('tr');

    this.daysArr = this.weekArrOptions.map(dayOptions => {
      return new Day(dayOptions);
    });

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