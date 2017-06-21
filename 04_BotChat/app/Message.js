export default class Message {
  constructor(avatar, username, age) {
    this.avatar = avatar;
    this.username = username;
    this.age = age;

    this.audio = new Audio('sounds/notification.mp3');
    this.requestText();
  }

  requestText() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.randomtext.me/api/gibberish/p-1/10-40', true);
    xhr.send();

    xhr.addEventListener('load', this.saveText.bind(this));
    xhr.addEventListener('error', this.processError.bind(this));
  }

  saveText(e) {
    const target = e.target,
          text = JSON.parse(target.responseText).text_out;

    this.insertMessage(text);
  }

  processError(e) {
    console.log(e);
  }

  insertMessage(text) {
    const template = this.render(text),
         section = document.querySelector('section');

    section.insertAdjacentHTML('beforeEnd', template);

    this.audio.play();

    const article = section.querySelector('article:last-child');
    article.scrollIntoView(false);
  }

  render(text) {
    const template = `
      <article class="message">
        <img src="${this.avatar}" alt="avatar">
        <div class="content">
          <h2>${this.username} (${this.age})</h2>
          ${text}
        </div>
      </article>`;

    return template;
  }
}