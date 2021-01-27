const form = document.getElementById('posting-form');

// API server options
const apiOptions = {
  server: window.location.href.split('/')[0]
}

// Handle form submit
form.onsubmit = function (event) {
  event.preventDefault();

  // Get form values
  let heading = this.heading.value;
  let text = this.text.value;
  let password = this.password.value;
  let body = {
    heading: heading,
    text: text,
    api_pass: password
  }

  // Form an API request
  let xhr = new XMLHttpRequest();
  xhr.open('POST', apiOptions.server + '/api/blog', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status != 201) {
      printMessage(`Posting error ${xhr.status}: ${xhr.statusText}`, 'tomato');
      // Clear the message with a slight delay
      setTimeout(function() {
        printMessage('', '');
      }, 2000);
    } else {
      printMessage('Posted successfully. You will be redirected to the post page.', 'lightgreen');
      // Redirect with a slight delay
      setTimeout(function() {
        let responseObj = JSON.parse(xhr.responseText);
        location.replace(`${apiOptions.server}/blog/post/${responseObj.url}`);
      }, 2000);
    }
  }

  // Send a request
  xhr.send(JSON.stringify(body));
}

// Prints a message in the specified color with
function printMessage(msg, color) {
  const messageBox = document.getElementById('posting-message');
  messageBox.style.color = color;
  messageBox.textContent = msg;
}
