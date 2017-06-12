// import Weekdays from './Weekdays';
import Week from './Week';

export default class Month {
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
      return new Week({weekDays}).render();
    });

    month.append(...monthArr);

    document.querySelector('tbody').append(month);
  }
}