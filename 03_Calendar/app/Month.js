import Week from './Week';

export default class Month {
  constructor(monthsOptions) {
    this.weeksArrOptions = this.createWeeksArrOptions(monthsOptions);
  }

  createWeeksArrOptions(monthsOptions) {
    const weeksArrOptions = [];
    const allDaysOptions = [].concat( ...Object.values(monthsOptions) );

    for (let i = 0; i < 6; i++) {
      weeksArrOptions.push( allDaysOptions.splice(0, 7) );
    }

    return weeksArrOptions;
  }

  render() {
    const tbody = document.createElement('tbody');

    this.weeksArr = this.weeksArrOptions.map(weekArrOptions => {
      return new Week(weekArrOptions);
    });

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