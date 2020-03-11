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
      alert(`Posting error ${xhr.status}: ${xhr.statusText}`);
    } else {
      alert(`Posted successfully. You now will be redirected to the post page.`);
      let responseObj = JSON.parse(xhr.responseText);
      document.location.href = `${apiOptions.server}/blog/post/${responseObj.url}`;
    }
  }

  // Send a request
  xhr.send(JSON.stringify(body));
}