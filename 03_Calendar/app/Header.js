import Weekdays from './Weekdays';

export default class Header {
  constructor(year, month) {
    this.stringDate = this.formatDate(year, month);
  }

  createHeader() {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.setAttribute('colspan', 5);
    th.textContent = this.stringDate;
    this.th = th;

    const leftArrow = document.createElement('th');
    leftArrow.id = 'previousMonth';

    const rightArrow = document.createElement('th');
    rightArrow.id = 'nextMonth';

    tr.append(leftArrow, th, rightArrow);

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
    const weekdays = new Weekdays();

    thead.append(this.createHeader(), weekdays.render());

    return thead;
  }

  update(year, month) {
    this.th.textContent = this.formatDate(year, month);
  }
}