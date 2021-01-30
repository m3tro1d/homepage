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
      displayResult(`Render error ${xhr.status}: ${xhr.statusText}`);
    } else {
      displayResult(JSON.parse(xhr.responseText).output);
    }
  }

  // Send a request
  xhr.send(JSON.stringify(body));
}

// Display the rendering result
function displayResult(msg) {
  const messageBox = document.getElementById('render-result');
  messageBox.innerHTML = msg;
}
