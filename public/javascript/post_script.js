const form = document.getElementById('posting-form');

// Handle form submit
form.onsubmit = function (event) {
  event.preventDefault();

  let heading = this.heading.value;
  let text = this.text.value;
  let password = this.password.value;

  console.log(`${heading} : ${text} : ${password}`);
}