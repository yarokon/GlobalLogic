import Weekdays from './Weekdays';

export default class Header {
  constructor(isMondayFirst) {
    this.isMondayFirst = isMondayFirst;
  }

  createHeader() {
    const tr = document.createElement('tr');

    this.th = document.createElement('th');
    this.th.setAttribute('colspan', 5);
    this.th.classList.add('title');

    const leftArrow = document.createElement('th');
    leftArrow.id = 'previousMonth';

    const rightArrow = document.createElement('th');
    rightArrow.id = 'nextMonth';

    tr.append(leftArrow, this.th, rightArrow);

    return tr;
  }

  formatDate(year, month) {
    const options = {
      year: 'numeric',
      month: 'long'
    };

    const date = new Date(year, month);
    return date.toLocaleString('en-US', options);
  }

  render() {
    const thead = document.createElement('thead');
    const weekdays = new Weekdays(this.isMondayFirst);

    thead.append(this.createHeader(), weekdays.render());

    return thead;
  }

  update(year, month) {
    this.th.textContent = this.formatDate(year, month);
  }
}