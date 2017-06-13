export default class Day {
  render() {
    this.td = document.createElement('td');

    return this.td;
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