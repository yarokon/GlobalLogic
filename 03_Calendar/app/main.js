import Calendar from './Calendar';

const section = document.querySelector('section');

const calendar = new Calendar();
calendar.render(section);
calendar.addEvents();

document.body.onclick = (e) => {
  // console.log(e.target);
}