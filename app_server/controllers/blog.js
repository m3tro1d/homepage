const axios = require('axios');

const apiOptions = {
  server: `http://localhost:${process.env.PORT}`
}

module.exports.index = (req, res, next) => {
  let path = '/api/blog';
  axios.get(apiOptions.server + path)
    .then(response => {
      res.render('blog_index', {
        title: 'Blog index',
        page_name: 'Blog index.',
        posts: response.data
      });
    })
    .catch(error => {
      next(error);
    });
}

module.exports.post = (req, res, next) => {
  res.end('Post page.');
}