export default class Day {
  constructor(options) {
    Object.assign(this, options);
  }

  render() {
    const day = document.createElement('td');

    day.textContent = this.dayNumber;

    if (this.currentMonth) {
      day.classList.add('current-month');
    }

    return day;
  }
}