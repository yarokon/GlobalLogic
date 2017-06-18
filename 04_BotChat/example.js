'use strict';

// Reference the output dom element
var outputDiv = document.getElementById('output-div');
// Reference the buttons
var saveButton = document.getElementById('save-user');
var displayButton = document.getElementById('display-user');
// Declare a variable for user info
var user = "";


// This function creates the XHR request and sends it
function requestUser () {
  // Create new request object, open and send it
  var request = new XMLHttpRequest();
  request.open('GET', 'https://randomuser.me/api');
  request.send();
  // Add event listener to the XHR load
  request.addEventListener('load', saveUser);
};


// This function is fired when the XHR request resonds
function saveUser (e) {
  // Parse JSON string and store in variable
  user = JSON.parse(e.target.responseText).results[0];
  outputDiv.innerHTML = '<br>Your user is loaded! Click display random user button!'
};


function displayUser () {
  // Built HTML string to output to DOM
  var html = "";
  html += `<h1>`;
  html += `${user.name.title}. ${user.name.first} ${user.name.last} `;
  html += `<br><img src="${user.picture.large}">`;
  html += `</h1>`;
  html += `<p>Click save random user button to display another user!</p>`;

  // Output html to DOM
  outputDiv.innerHTML = html;
};


// Add event listener to save user button
saveButton.addEventListener('click', requestUser);
// Add event listener to display user button
displayButton.addEventListener('click', displayUser);


/*********************************/


'use strict';

const xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://randomuser.me/api', true);
xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/25-45', true);

xhr.send();


xhr.onload = function(e) {
  console.log(this.responseText);
  // const data = JSON.parse(this.responseText).results[0];

  // const {
  //         name: { first: firstName, last: lastName },
  //         location: { city },
  //         login: { username },
  //         dob,
  //         phone,
  //         picture: { large: picture }
  //       } = data;



  // const user = {
  //   firstName,
  //   lastName,
  //   username,
  //   city,
  //   dob,
  //   phone,
  //   picture
  // };

  // render(user);
}

xhr.onerror = function() {
  console.log(this.status );
}

function render(user) {
  console.log(user);

  const img = new Image();
  img.src = user.picture;

  const h2 = document.createElement('h2');
  h2.textContent = `${user.firstName} ${user.lastName}`;

  const city = document.createElement('p');
  city.textContent = `city: ${user.city}`;

  const phone = document.createElement('p');
  phone.textContent = `phone: ${user.phone}`;

  const div = document.createElement('div');
  div.append(img, h2, city, phone);

  document.body.append(div);
}
