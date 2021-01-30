const form = document.getElementById('render-form');

// API server options
const apiOptions = {
  server: window.location.href.split('/')[0]
}

// Handle form submit
form.onsubmit = function (event) {
  event.preventDefault();

  // Get form values
  let input = this.input.value;
  let body = {
    input: input,
  }

  // Form an API request
  let xhr = new XMLHttpRequest();
  xhr.open('POST', apiOptions.server + '/api/renderer/render', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status != 201) {
      printMessage(`Render error ${xhr.status}: ${xhr.statusText}`);
      // Clear the message with a slight delay
      setTimeout(function() {
        printMessage('', '');
      }, 2000);
    } else {
      printMessage(JSON.parse(xhr.responseText).output);
    }
  }

  // Send a request
  xhr.send(JSON.stringify(body));
}

// Prints a message in the specified color with
function printMessage(msg) {
  const messageBox = document.getElementById('render-result');
  messageBox.innerHTML = msg;
}
