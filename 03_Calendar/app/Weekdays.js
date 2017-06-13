export default class Weekdays {
  constructor(isMondayFirst=true) {
    this.weekdayArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (!isMondayFirst) {
      const sun = this.weekdayArr.pop();
      this.weekdayArr.unshift(sun);
    }
  }

  render() {
    const tr = document.createElement('tr');
    const weekdayArrElements = [];

    this.weekdayArr.forEach(weekdayName => {
      const th = document.createElement('th');
      th.textContent = weekdayName;

      weekdayArrElements.push(th);
    });

    tr.append(...weekdayArrElements);

    return tr;
  }
}