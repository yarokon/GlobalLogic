import Week from './Week';
import { WEEK_LENGTH, WEEKS_NUMBER } from './constants';

export default class Month {
  createWeeksArrOptions(monthsOptions) {
    const weeksArrOptions = [];
    const allDaysOptions = [].concat( ...Object.values(monthsOptions) );

    for (let i = 1; i <= WEEKS_NUMBER; i++) {
      weeksArrOptions.push( allDaysOptions.splice(0, WEEK_LENGTH) );
    }

    return weeksArrOptions;
  }

  render() {
    const tbody = document.createElement('tbody');

    this.weeksArr = [];

    for (let i = 1; i <= WEEKS_NUMBER; i++) {
      this.weeksArr.push( new Week() );
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