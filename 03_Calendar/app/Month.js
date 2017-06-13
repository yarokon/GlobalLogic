import Week from './Week';

export default class Month {
  createWeeksArrOptions(monthsOptions) {
    const weeksArrOptions = [];
    const allDaysOptions = [].concat( ...Object.values(monthsOptions) );

    for (let i = 1; i <= 6; i++) {
      weeksArrOptions.push( allDaysOptions.splice(0, 7) );
    }

    return weeksArrOptions;
  }

  render() {
    const tbody = document.createElement('tbody');

    this.weeksArr = [];

    for (let i = 1; i <= 6; i++) {
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