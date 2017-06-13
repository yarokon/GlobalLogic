export default class Day {
  constructor(dayOptions) {
    Object.assign(this, dayOptions);
  }

  render() {
    const td = document.createElement('td');
    td.textContent = this.dayNumber;

    if (this.currentMonth) {
      td.classList.add('current-month');
      td.dataset.day = this.data;
    }

    this.td = td;
    return td;
  }

  update(dayOptions) {
    Object.assign(this, dayOptions);
    this.td.textContent = this.dayNumber;

    if (this.currentMonth) {
      this.td.classList.add('current-month');
      this.td.dataset.day = this.data;
    } else {
      this.td.removeAttribute('data-day');
      this.td.removeAttribute('class');
    }
  }
}