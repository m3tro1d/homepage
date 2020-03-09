const axios = require('axios');

const apiOptions = {
  server: `http://localhost:${process.env.PORT}`
}

module.exports.index = (req, res, next) => {
  let path = '/api/blog';
  axios.get(apiOptions.server + path)
    .then(response => {
      res.end(JSON.stringify(response.data));
    })
    .catch(error => {
      res.end('An error occured: ' + error.message);
    });
}

module.exports.post = (req, res, next) => {
  res.end('Post page.');
}