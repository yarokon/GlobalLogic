import Day from './Day';
import { WEEK_LENGTH } from './constants';

export default class Week {
  render() {
    const tr = document.createElement('tr');

    this.daysArr = [];

    for (let i = 1; i <= WEEK_LENGTH; i++) {
      this.daysArr.push( new Day() );
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